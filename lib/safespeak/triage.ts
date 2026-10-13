import { getCategory } from './categories'
import type { CategoryId, Urgency } from './types'

const HIGH_RISK_TERMS = [
  'hurt myself',
  'kill',
  'suicide',
  'want to die',
  'self harm',
  'cutting',
  'threat',
  'weapon',
  'gun',
  'knife',
  'nude',
  'naked',
  'blackmail',
  'my address',
  'unsafe',
  'scared to go',
]

const MEDIUM_RISK_TERMS = [
  'every day',
  'again',
  'mean',
  'fake',
  'photo',
  'picture',
  'embarrass',
  'spread',
  'group chat',
  'laugh',
  'sad',
  'lonely',
  'worried',
  'posted',
  'pretend',
]

const ELEVATED_CATEGORIES: CategoryId[] = ['fake-ai', 'worried-friend']

export interface TriageResult {
  urgency: Urgency
  summary: string
}

/**
 * Simulates the Gemini triage step locally so the demo works without an API key.
 */
export function simulateGeminiTriage(category: CategoryId, details: string): TriageResult {
  const text = details.toLowerCase()
  const label = `"${getCategory(category).label}"`
  const highHit = HIGH_RISK_TERMS.find((term) => text.includes(term))
  const mediumHit = MEDIUM_RISK_TERMS.find((term) => text.includes(term))

  if (highHit) {
    return {
      urgency: 'High',
      summary: `Student reports ${label} with risk-of-harm language ("${highHit}"); recommend a counselor check-in within the hour.`,
    }
  }

  if (mediumHit || ELEVATED_CATEGORIES.includes(category)) {
    return {
      urgency: 'Medium',
      summary: `Student describes ${label} showing signs of repeated or escalating behavior; recommend follow-up within 24 hours.`,
    }
  }

  return {
    urgency: 'Low',
    summary: `Student shares a ${label} concern with no immediate safety indicators; recommend routine review this week.`,
  }
}

const CODE_WORDS = [
  'FRIEND',
  'STAR',
  'RAINBOW',
  'TIGER',
  'COMET',
  'PANDA',
  'SUNNY',
  'ROCKET',
  'KOALA',
  'MAPLE',
  'OTTER',
  'BREEZE',
]

export function generateSecretCode(existing: Set<string>): string {
  for (;;) {
    const word = CODE_WORDS[Math.floor(Math.random() * CODE_WORDS.length)]
    const number = Math.floor(Math.random() * 90) + 10
    const code = `SAFE-${word}-${number}`
    if (!existing.has(code)) return code
  }
}
