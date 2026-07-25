import Dexie, { type Table } from 'dexie'
import type {
  SrsState,
  ReviewLogEntry,
  MockAttempt,
  ItemMeta,
  Settings,
  Question,
  PairStat,
  ModuleStat,
} from './types'

// Local-first store. Authored content ships in the bundle (src/data); this DB
// holds all USER state — SRS scheduling, the append-only review log, mock
// attempts, per-item flags/notes, settings, and any AI-generated questions.
export class CippeDB extends Dexie {
  srs!: Table<SrsState, string>
  reviews!: Table<ReviewLogEntry, number>
  mocks!: Table<MockAttempt, number>
  meta!: Table<ItemMeta, string>
  settings!: Table<Settings, string>
  customQuestions!: Table<Question, string>
  pairs!: Table<PairStat, string>
  moduleStats!: Table<ModuleStat, string>

  constructor() {
    super('cippe')
    // v1 — bump the version and add an upgrade() here when the schema changes,
    // so a user's progress and notes survive content/schema updates.
    this.version(1).stores({
      srs: 'itemId, due, competency, domain',
      reviews: '++id, itemId, ts, competency, domain, bloomLevel, mode',
      mocks: '++id, startedAt',
      meta: 'itemId, flagged',
      settings: 'key',
      customQuestions: 'id, competency, domain',
    })
    // v2 — confusion-pair accuracy stats.
    this.version(2).stores({
      pairs: 'pairId',
    })
    // v3 — AI & Governance module section stats.
    this.version(3).stores({
      moduleStats: 'sectionId',
    })
  }
}

export const db = new CippeDB()

export const DEFAULT_SETTINGS: Settings = {
  key: 'app',
  targetRetention: 0.9,
}

export async function getSettings(): Promise<Settings> {
  return (await db.settings.get('app')) ?? DEFAULT_SETTINGS
}

export async function saveSettings(patch: Partial<Settings>): Promise<Settings> {
  const next: Settings = { ...(await getSettings()), ...patch, key: 'app' }
  await db.settings.put(next)
  return next
}

export interface ExportBundle {
  app: 'cippe'
  version: number
  exportedAt: string
  srs: SrsState[]
  reviews: ReviewLogEntry[]
  mocks: MockAttempt[]
  meta: ItemMeta[]
  settings: Settings[]
  customQuestions: Question[]
  /** Added in bundle v2 — absent from older backups. */
  pairs?: PairStat[]
  /** Added in bundle v3 — absent from older backups. */
  moduleStats?: ModuleStat[]
}

export async function exportAll(): Promise<ExportBundle> {
  const [srs, reviews, mocks, meta, settings, customQuestions, pairs, moduleStats] =
    await Promise.all([
      db.srs.toArray(),
      db.reviews.toArray(),
      db.mocks.toArray(),
      db.meta.toArray(),
      db.settings.toArray(),
      db.customQuestions.toArray(),
      db.pairs.toArray(),
      db.moduleStats.toArray(),
    ])
  return {
    app: 'cippe',
    version: 3,
    exportedAt: new Date().toISOString(),
    srs,
    reviews,
    mocks,
    meta,
    settings,
    customQuestions,
    pairs,
    moduleStats,
  }
}

export async function importAll(bundle: ExportBundle): Promise<void> {
  if (bundle?.app !== 'cippe') throw new Error('Not a CIPP/E Prep backup file.')
  await db.transaction(
    'rw',
    [db.srs, db.reviews, db.mocks, db.meta, db.settings, db.customQuestions, db.pairs, db.moduleStats],
    async () => {
      await Promise.all([
        db.srs.clear(),
        db.reviews.clear(),
        db.mocks.clear(),
        db.meta.clear(),
        db.settings.clear(),
        db.customQuestions.clear(),
        db.pairs.clear(),
        db.moduleStats.clear(),
      ])
      await db.srs.bulkAdd(bundle.srs ?? [])
      await db.reviews.bulkAdd(bundle.reviews ?? [])
      await db.mocks.bulkAdd(bundle.mocks ?? [])
      await db.meta.bulkAdd(bundle.meta ?? [])
      await db.settings.bulkAdd(bundle.settings ?? [])
      await db.customQuestions.bulkAdd(bundle.customQuestions ?? [])
      await db.pairs.bulkAdd(bundle.pairs ?? [])
      await db.moduleStats.bulkAdd(bundle.moduleStats ?? [])
    },
  )
}

/** Clears study progress but keeps settings. */
export async function resetProgress(): Promise<void> {
  await Promise.all([
    db.srs.clear(),
    db.reviews.clear(),
    db.mocks.clear(),
    db.meta.clear(),
    db.pairs.clear(),
    db.moduleStats.clear(),
  ])
}
