import Dexie, { type Table } from 'dexie'
import type {
  SrsState,
  ReviewLogEntry,
  MockAttempt,
  ItemMeta,
  Settings,
  Question,
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
}

export async function exportAll(): Promise<ExportBundle> {
  const [srs, reviews, mocks, meta, settings, customQuestions] = await Promise.all([
    db.srs.toArray(),
    db.reviews.toArray(),
    db.mocks.toArray(),
    db.meta.toArray(),
    db.settings.toArray(),
    db.customQuestions.toArray(),
  ])
  return {
    app: 'cippe',
    version: 1,
    exportedAt: new Date().toISOString(),
    srs,
    reviews,
    mocks,
    meta,
    settings,
    customQuestions,
  }
}

export async function importAll(bundle: ExportBundle): Promise<void> {
  if (bundle?.app !== 'cippe') throw new Error('Not a CIPP/E Prep backup file.')
  await db.transaction(
    'rw',
    [db.srs, db.reviews, db.mocks, db.meta, db.settings, db.customQuestions],
    async () => {
      await Promise.all([
        db.srs.clear(),
        db.reviews.clear(),
        db.mocks.clear(),
        db.meta.clear(),
        db.settings.clear(),
        db.customQuestions.clear(),
      ])
      await db.srs.bulkAdd(bundle.srs ?? [])
      await db.reviews.bulkAdd(bundle.reviews ?? [])
      await db.mocks.bulkAdd(bundle.mocks ?? [])
      await db.meta.bulkAdd(bundle.meta ?? [])
      await db.settings.bulkAdd(bundle.settings ?? [])
      await db.customQuestions.bulkAdd(bundle.customQuestions ?? [])
    },
  )
}

/** Clears study progress but keeps settings. */
export async function resetProgress(): Promise<void> {
  await Promise.all([db.srs.clear(), db.reviews.clear(), db.mocks.clear(), db.meta.clear()])
}
