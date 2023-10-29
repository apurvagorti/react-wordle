import { atcb_action } from 'add-to-calendar-button'

import { MAX_CHALLENGES } from '../constants/settings'
import {
  GameStats,
  loadStatsFromLocalStorage,
  saveStatsToLocalStorage,
} from './localStorage'

// In stats array elements 0-5 are successes in 1-6 trys

export const addToCalendar = () => {
  const config: {
    proKey?: string
    name?: string
    dates?: {
      name?: string
      description?: string
      startDate?: string
      startTime?: string
      endDate?: string
      endTime?: string
      timeZone?: string
      location?: string
      status?: 'TENTATIVE' | 'CONFIRMED' | 'CANCELLED'
      sequence?: number
      uid?: string
      organizer?: string
      attendee?: string
    }[]
    description?: string
    startDate?: string
    startTime?: string
    endDate?: string
    endTime?: string
    timeZone?: string
    location?: string
    status?: 'TENTATIVE' | 'CONFIRMED' | 'CANCELLED'
    sequence?: number
    uid?: string
    organizer?: string
    attendee?: string
    icsFile?: string
    images?: string[] | string
    recurrence?: string
    recurrence_interval?: number
    recurrence_until?: string
    recurrence_count?: number
    recurrence_byDay?: string
    recurrence_byMonth?: string
    recurrence_byMonthDay?: string
    recurrence_weekstart?: string
    availability?: 'busy' | 'free'
    created?: string
    updated?: string
    identifier?: string
    subscribe?: boolean
    options?: (
      | 'Apple'
      | 'Google'
      | 'iCal'
      | 'Microsoft365'
      | 'MicrosoftTeams'
      | 'Outlook.com'
      | 'Yahoo'
    )[]
    iCalFileName?: string
    listStyle?:
      | 'dropdown'
      | 'dropdown-static'
      | 'dropup-static'
      | 'overlay'
      | 'modal'
    buttonStyle?:
      | 'default'
      | '3d'
      | 'flat'
      | 'round'
      | 'neumorphism'
      | 'text'
      | 'date'
      | 'custom'
      | 'none'
    trigger?: 'hover' | 'click'
    inline?: boolean
    buttonsList?: boolean
    hideIconButton?: boolean
    hideIconList?: boolean
    hideIconModal?: boolean
    hideTextLabelButton?: boolean
    hideTextLabelList?: boolean
    hideBackground?: boolean
    hideCheckmark?: boolean
    hideBranding?: boolean
    hideButton?: boolean
    size?: string
    label?: string
    inlineRsvp?: string
    customLabels?: object
    customCss?: string
    lightMode?: 'system' | 'dark' | 'light' | 'bodyScheme'
    language?:
      | 'en'
      | 'de'
      | 'nl'
      | 'fa'
      | 'fr'
      | 'es'
      | 'et'
      | 'pt'
      | 'tr'
      | 'zh'
      | 'ar'
      | 'hi'
      | 'pl'
      | 'ro'
      | 'id'
      | 'no'
      | 'fi'
      | 'sv'
      | 'cs'
      | 'ja'
      | 'it'
      | 'ko'
      | 'vi'
    hideRichData?: boolean
    ty?: object
    rsvp?: object
    bypassWebViewCheck?: boolean
    debug?: boolean
    cspnonce?: string
    blockInteraction?: boolean
    styleLight?: string
    styleDark?: string
    disabled?: boolean
    hidden?: boolean
    pastDateHandling?: string
    proxy?: boolean
    fakeMobile?: boolean
    fakeIOS?: boolean
    fakeAndroid?: boolean
    forceOverlay?: boolean
  } = {
    name: "Apurva and Akhil's Wedding",
    description: 'We are so excited to celebrate with you!',
    startDate: '2024-10-26',
    options: ['Google', 'iCal'],
    timeZone: 'America/Los_Angeles',
    location: 'Napa, California',
    hideCheckmark: true,
    hideTextLabelButton: true,
  }
  debugger
  atcb_action(config)
}

export const addStatsForCompletedGame = (
  gameStats: GameStats,
  count: number
) => {
  // Count is number of incorrect guesses before end.
  const stats = { ...gameStats }

  stats.totalGames += 1

  if (count >= MAX_CHALLENGES) {
    // A fail situation
    stats.currentStreak = 0
    stats.gamesFailed += 1
  } else {
    stats.winDistribution[count] += 1
    stats.currentStreak += 1

    if (stats.bestStreak < stats.currentStreak) {
      stats.bestStreak = stats.currentStreak
    }
  }

  stats.successRate = getSuccessRate(stats)

  saveStatsToLocalStorage(stats)
  return stats
}

const defaultStats: GameStats = {
  winDistribution: Array.from(new Array(MAX_CHALLENGES), () => 0),
  gamesFailed: 0,
  currentStreak: 0,
  bestStreak: 0,
  totalGames: 0,
  successRate: 0,
}

export const loadStats = () => {
  return loadStatsFromLocalStorage() || defaultStats
}

const getSuccessRate = (gameStats: GameStats) => {
  const { totalGames, gamesFailed } = gameStats

  return Math.round(
    (100 * (totalGames - gamesFailed)) / Math.max(totalGames, 1)
  )
}
