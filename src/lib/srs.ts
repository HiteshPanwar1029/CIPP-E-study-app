import {
  fsrs,
  createEmptyCard,
  generatorParameters,
  Rating,
  type Card,
  type Grade as FsrsGrade,
} from 'ts-fsrs'
import type { Grade, SrsState } from './types'

const RATING: Record<Grade, FsrsGrade> = {
  again: Rating.Again,
  hard: Rating.Hard,
  good: Rating.Good,
  easy: Rating.Easy,
}

export function scheduler(targetRetention = 0.9) {
  return fsrs(generatorParameters({ request_retention: targetRetention, enable_fuzz: true }))
}

export function cardToState(itemId: string, card: Card, grade?: Grade): SrsState {
  return {
    itemId,
    due: card.due.toISOString(),
    stability: card.stability,
    difficulty: card.difficulty,
    elapsed_days: card.elapsed_days,
    scheduled_days: card.scheduled_days,
    reps: card.reps,
    lapses: card.lapses,
    learning_steps: card.learning_steps ?? 0,
    state: card.state,
    last_review: card.last_review ? card.last_review.toISOString() : undefined,
    lastGrade: grade,
  }
}

export function stateToCard(s: SrsState): Card {
  return {
    due: new Date(s.due),
    stability: s.stability,
    difficulty: s.difficulty,
    elapsed_days: s.elapsed_days,
    scheduled_days: s.scheduled_days,
    reps: s.reps,
    lapses: s.lapses,
    learning_steps: s.learning_steps ?? 0,
    state: s.state,
    last_review: s.last_review ? new Date(s.last_review) : undefined,
  } as Card
}

export function newState(itemId: string, now = new Date()): SrsState {
  return cardToState(itemId, createEmptyCard(now))
}

export function review(
  state: SrsState | undefined,
  itemId: string,
  grade: Grade,
  targetRetention = 0.9,
  now = new Date(),
): SrsState {
  const card = state ? stateToCard(state) : createEmptyCard(now)
  const { card: next } = scheduler(targetRetention).next(card, now, RATING[grade])
  return cardToState(itemId, next, grade)
}

export const isDue = (s: SrsState, now = new Date()): boolean =>
  new Date(s.due).getTime() <= now.getTime()
