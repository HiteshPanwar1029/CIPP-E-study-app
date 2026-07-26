import { create } from 'zustand'
import { db, getSettings } from './db'
import type {
  Settings,
  SrsState,
  ReviewLogEntry,
  ItemMeta,
  MockAttempt,
  Grade,
  StudyMode,
  Question,
  StudyItem,
  PairStat,
  ModuleStat,
} from './types'
import { review as srsReview, newState } from './srs'
import { getTrack, trackOfItem, DEFAULT_TRACK, type TrackDef } from './tracks'
import type { TrackId } from './types'

interface GradeArgs {
  itemId: string
  grade: Grade
  correct: boolean
  confidence: Grade
  mode: StudyMode
  elapsedMs: number
}

interface StoreState {
  ready: boolean
  settings: Settings
  /** Active certification track — everything below is scoped to it. */
  track: TrackId
  trackDef: TrackDef
  /** SRS state for the whole database (all tracks). */
  allSrs: Record<string, SrsState>
  allReviews: ReviewLogEntry[]
  allMocks: MockAttempt[]
  /** Views filtered to the active track — what every screen consumes. */
  srs: Record<string, SrsState>
  meta: Record<string, ItemMeta>
  reviews: ReviewLogEntry[]
  mocks: MockAttempt[]
  pairStats: Record<string, PairStat>
  moduleStats: Record<string, ModuleStat>
  items: StudyItem[]
  byId: Record<string, StudyItem>
  setTrack: (t: TrackId) => Promise<void>
  init: () => Promise<void>
  gradeItem: (a: GradeArgs) => Promise<void>
  recordPairAnswer: (pairId: string, correct: boolean) => Promise<void>
  recordModuleAnswer: (sectionId: string, correct: boolean) => Promise<void>
  setFlag: (itemId: string, flagged: boolean) => Promise<void>
  requeue: (itemId: string) => Promise<void>
  updateSettings: (patch: Partial<Settings>) => Promise<void>
  saveMock: (m: MockAttempt) => Promise<number>
  addCustomQuestions: (qs: Question[]) => Promise<void>
  resetAll: () => Promise<void>
}

function indexItems(items: StudyItem[]): Record<string, StudyItem> {
  const o: Record<string, StudyItem> = {}
  for (const i of items) o[i.id] = i
  return o
}

/** A review/mock row belongs to the track it was tagged with; legacy rows fall
 *  back to the item's own track, then to CIPP/E. */
const rowTrack = (row: { track?: TrackId; itemId?: string }): TrackId =>
  row.track ?? (row.itemId ? (trackOfItem(row.itemId) ?? DEFAULT_TRACK) : DEFAULT_TRACK)

/** Recompute every track-scoped view from the full dataset. */
function scopeToTrack(
  track: TrackId,
  allSrs: Record<string, SrsState>,
  allReviews: ReviewLogEntry[],
  allMocks: MockAttempt[],
  custom: StudyItem[] = [],
) {
  const def = getTrack(track)
  const items: StudyItem[] = [
    ...def.items,
    // Custom (imported) items have no built-in track mapping; keep unmapped
    // ones visible in whichever track is active rather than losing them.
    ...custom.filter((c) => (trackOfItem(c.id) ?? track) === track),
  ]
  const byId = indexItems(items)
  const srs: Record<string, SrsState> = {}
  for (const [id, st] of Object.entries(allSrs)) if (byId[id]) srs[id] = st
  return {
    track,
    trackDef: def,
    items,
    byId,
    srs,
    reviews: allReviews.filter((r) => rowTrack(r) === track),
    mocks: allMocks.filter((m) => (m.track ?? DEFAULT_TRACK) === track),
  }
}

export const useStore = create<StoreState>((set, get) => ({
  ready: false,
  settings: { key: 'app', targetRetention: 0.9 },
  track: DEFAULT_TRACK,
  trackDef: getTrack(DEFAULT_TRACK),
  allSrs: {},
  allReviews: [],
  allMocks: [],
  srs: {},
  meta: {},
  reviews: [],
  mocks: [],
  pairStats: {},
  moduleStats: {},
  items: getTrack(DEFAULT_TRACK).items,
  byId: indexItems(getTrack(DEFAULT_TRACK).items),

  init: async () => {
    const [settings, srsArr, metaArr, reviews, mocks, custom, pairArr, moduleArr] =
      await Promise.all([
        getSettings(),
        db.srs.toArray(),
        db.meta.toArray(),
        db.reviews.toArray(),
        db.mocks.toArray(),
        db.customQuestions.toArray(),
        db.pairs.toArray(),
        db.moduleStats.toArray(),
      ])
    const allSrs: Record<string, SrsState> = {}
    for (const s of srsArr) allSrs[s.itemId] = s
    const meta: Record<string, ItemMeta> = {}
    for (const m of metaArr) meta[m.itemId] = m
    const pairStats: Record<string, PairStat> = {}
    for (const p of pairArr) pairStats[p.pairId] = p
    const moduleStats: Record<string, ModuleStat> = {}
    for (const m of moduleArr) moduleStats[m.sectionId] = m
    const customItems: StudyItem[] = custom.map((q) => ({ kind: 'question' as const, ...q }))
    const track = settings.activeTrack ?? DEFAULT_TRACK
    set({
      ready: true,
      settings,
      meta,
      pairStats,
      moduleStats,
      allSrs,
      allReviews: reviews,
      allMocks: mocks,
      ...scopeToTrack(track, allSrs, reviews, mocks, customItems),
    })
  },

  setTrack: async (next) => {
    const { allSrs, allReviews, allMocks, settings, items, trackDef } = get()
    const custom = items.filter((i) => !trackDef.items.some((t) => t.id === i.id))
    const nextSettings: Settings = { ...settings, activeTrack: next, key: 'app' }
    await db.settings.put(nextSettings)
    set({
      settings: nextSettings,
      ...scopeToTrack(next, allSrs, allReviews, allMocks, custom),
    })
  },

  recordPairAnswer: async (pairId, correct) => {
    const cur = get().pairStats[pairId] ?? { pairId, attempts: 0, correct: 0 }
    const next: PairStat = {
      ...cur,
      attempts: cur.attempts + 1,
      correct: cur.correct + (correct ? 1 : 0),
      lastTs: new Date().toISOString(),
    }
    await db.pairs.put(next)
    set((st) => ({ pairStats: { ...st.pairStats, [pairId]: next } }))
  },

  recordModuleAnswer: async (sectionId, correct) => {
    const cur = get().moduleStats[sectionId] ?? { sectionId, attempts: 0, correct: 0 }
    const next: ModuleStat = {
      ...cur,
      attempts: cur.attempts + 1,
      correct: cur.correct + (correct ? 1 : 0),
      lastTs: new Date().toISOString(),
    }
    await db.moduleStats.put(next)
    set((st) => ({ moduleStats: { ...st.moduleStats, [sectionId]: next } }))
  },

  gradeItem: async ({ itemId, grade, correct, confidence, mode, elapsedMs }) => {
    const { srs, settings, byId, meta } = get()
    const item = byId[itemId]
    if (!item) return
    const next = srsReview(srs[itemId], itemId, grade, settings.targetRetention)
    await db.srs.put(next)
    const entry: ReviewLogEntry = {
      itemId,
      ts: new Date().toISOString(),
      grade,
      correct,
      confidence,
      elapsedMs,
      mode,
      domain: item.domain,
      competency: item.competency,
      bloomLevel: item.bloomLevel,
      track: trackOfItem(itemId) ?? get().track,
    }
    const id = (await db.reviews.add(entry)) as number
    const m: ItemMeta = { ...(meta[itemId] ?? { itemId }), itemId, seen: true }
    await db.meta.put(m)
    set((st) => ({
      allSrs: { ...st.allSrs, [itemId]: next },
      srs: { ...st.srs, [itemId]: next },
      allReviews: [...st.allReviews, { ...entry, id }],
      reviews:
        (entry.track ?? DEFAULT_TRACK) === st.track ? [...st.reviews, { ...entry, id }] : st.reviews,
      meta: { ...st.meta, [itemId]: m },
    }))
  },

  setFlag: async (itemId, flagged) => {
    const m: ItemMeta = { ...(get().meta[itemId] ?? { itemId }), itemId, flagged }
    await db.meta.put(m)
    set((st) => ({ meta: { ...st.meta, [itemId]: m } }))
  },

  requeue: async (itemId) => {
    const cur = get().srs[itemId]
    const nowIso = new Date().toISOString()
    const next: SrsState = cur ? { ...cur, due: nowIso } : { ...newState(itemId), due: nowIso }
    await db.srs.put(next)
    set((st) => ({
      allSrs: { ...st.allSrs, [itemId]: next },
      srs: { ...st.srs, [itemId]: next },
    }))
  },

  updateSettings: async (patch) => {
    const next: Settings = { ...get().settings, ...patch, key: 'app' }
    await db.settings.put(next)
    set({ settings: next })
  },

  saveMock: async (mock) => {
    const tagged: MockAttempt = { ...mock, track: mock.track ?? get().track }
    const id = (await db.mocks.add(tagged)) as number
    set((st) => ({
      allMocks: [...st.allMocks, { ...tagged, id }],
      mocks:
        (tagged.track ?? DEFAULT_TRACK) === st.track ? [...st.mocks, { ...tagged, id }] : st.mocks,
    }))
    return id
  },

  addCustomQuestions: async (qs) => {
    await db.customQuestions.bulkPut(qs)
    const items = [...get().items, ...qs.map((q) => ({ kind: 'question' as const, ...q }))]
    set({ items, byId: indexItems(items) })
  },

  resetAll: async () => {
    await Promise.all([
      db.srs.clear(),
      db.reviews.clear(),
      db.mocks.clear(),
      db.meta.clear(),
      db.pairs.clear(),
      db.moduleStats.clear(),
    ])
    set({
      allSrs: {},
      allReviews: [],
      allMocks: [],
      srs: {},
      meta: {},
      reviews: [],
      mocks: [],
      pairStats: {},
      moduleStats: {},
    })
  },
}))
