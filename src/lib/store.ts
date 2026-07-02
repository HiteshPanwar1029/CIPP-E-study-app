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
} from './types'
import { review as srsReview, newState } from './srs'
import { STUDY_ITEMS } from '../data'

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
  srs: Record<string, SrsState>
  meta: Record<string, ItemMeta>
  reviews: ReviewLogEntry[]
  mocks: MockAttempt[]
  items: StudyItem[]
  byId: Record<string, StudyItem>
  init: () => Promise<void>
  gradeItem: (a: GradeArgs) => Promise<void>
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

export const useStore = create<StoreState>((set, get) => ({
  ready: false,
  settings: { key: 'app', targetRetention: 0.9 },
  srs: {},
  meta: {},
  reviews: [],
  mocks: [],
  items: STUDY_ITEMS,
  byId: indexItems(STUDY_ITEMS),

  init: async () => {
    const [settings, srsArr, metaArr, reviews, mocks, custom] = await Promise.all([
      getSettings(),
      db.srs.toArray(),
      db.meta.toArray(),
      db.reviews.toArray(),
      db.mocks.toArray(),
      db.customQuestions.toArray(),
    ])
    const srs: Record<string, SrsState> = {}
    for (const s of srsArr) srs[s.itemId] = s
    const meta: Record<string, ItemMeta> = {}
    for (const m of metaArr) meta[m.itemId] = m
    const items: StudyItem[] = [
      ...STUDY_ITEMS,
      ...custom.map((q) => ({ kind: 'question' as const, ...q })),
    ]
    set({ ready: true, settings, srs, meta, reviews, mocks, items, byId: indexItems(items) })
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
    }
    const id = (await db.reviews.add(entry)) as number
    const m: ItemMeta = { ...(meta[itemId] ?? { itemId }), itemId, seen: true }
    await db.meta.put(m)
    set((st) => ({
      srs: { ...st.srs, [itemId]: next },
      reviews: [...st.reviews, { ...entry, id }],
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
    set((st) => ({ srs: { ...st.srs, [itemId]: next } }))
  },

  updateSettings: async (patch) => {
    const next: Settings = { ...get().settings, ...patch, key: 'app' }
    await db.settings.put(next)
    set({ settings: next })
  },

  saveMock: async (mock) => {
    const id = (await db.mocks.add(mock)) as number
    set((st) => ({ mocks: [...st.mocks, { ...mock, id }] }))
    return id
  },

  addCustomQuestions: async (qs) => {
    await db.customQuestions.bulkPut(qs)
    const items = [...get().items, ...qs.map((q) => ({ kind: 'question' as const, ...q }))]
    set({ items, byId: indexItems(items) })
  },

  resetAll: async () => {
    await Promise.all([db.srs.clear(), db.reviews.clear(), db.mocks.clear(), db.meta.clear()])
    set({ srs: {}, meta: {}, reviews: [], mocks: [] })
  },
}))
