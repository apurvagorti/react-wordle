import { ClockIcon, ShareIcon } from '@heroicons/react/outline'
import { AddToCalendarButton } from 'add-to-calendar-button-react'
import { format } from 'date-fns'
import Countdown from 'react-countdown'

import {
  DATE_LOCALE,
  ENABLE_ARCHIVED_GAMES,
  ENABLE_MIGRATE_STATS,
} from '../../constants/settings'
import {
  ARCHIVE_GAMEDATE_TEXT,
  GUESS_DISTRIBUTION_TEXT,
  NEW_WORD_TEXT,
  SHARE_TEXT,
  STATISTICS_TITLE,
} from '../../constants/strings'
import image from '../../images/couple.jpeg'
import { GameStats } from '../../lib/localStorage'
import { shareStatus } from '../../lib/share'
import { solutionGameDate, tomorrow } from '../../lib/words'
import { Histogram } from '../stats/Histogram'
import { MigrationIntro } from '../stats/MigrationIntro'
import { StatBar } from '../stats/StatBar'
import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
  solution: string
  guesses: string[]
  gameStats: GameStats
  isLatestGame: boolean
  isGameLost: boolean
  isGameWon: boolean
  handleShareToClipboard: () => void
  handleShareFailure: () => void
  handleMigrateStatsButton: () => void
  isHardMode: boolean
  isDarkMode: boolean
  isHighContrastMode: boolean
  numberOfGuessesMade: number
}

export const StatsModal = ({
  isOpen,
  handleClose,
  solution,
  guesses,
  gameStats,
  isLatestGame,
  isGameLost,
  isGameWon,
  handleShareToClipboard,
  handleShareFailure,
  handleMigrateStatsButton,
  isHardMode,
  isDarkMode,
  isHighContrastMode,
  numberOfGuessesMade,
}: Props) => {
  if (gameStats.totalGames <= 0) {
    return (
      <BaseModal
        title={STATISTICS_TITLE}
        isOpen={isOpen}
        handleClose={handleClose}
      >
        <StatBar gameStats={gameStats} />
        {ENABLE_MIGRATE_STATS && (
          <MigrationIntro handleMigrateStatsButton={handleMigrateStatsButton} />
        )}
      </BaseModal>
    )
  }
  return (
    <BaseModal title={''} isOpen={isOpen} handleClose={handleClose}>
      <div className="mb-4">
        <img
          src={image}
          alt="Apurva and Akhil happily engaged"
          className="rounded pt-4"
        />
      </div>
      <h2 className="font-sail text-4xl dark:text-white">Apurva & Akhil</h2>
      <h2 className="font-sail text-2xl dark:text-white">October 26, 2024</h2>
      <h2 className="text-2x font-sail dark:text-white">Napa, California</h2>
      {(isGameLost || isGameWon) && (
        <div className="mt-5 flex columns-2 items-center items-stretch justify-center text-center dark:text-white sm:mt-6">
          <button
            type="button"
            className="mt-2 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-sky-500 px-4 py-2 text-center font-lato text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-base"
            onClick={() => {
              shareStatus(
                solution,
                guesses,
                isGameLost,
                isHardMode,
                isDarkMode,
                isHighContrastMode,
                handleShareToClipboard,
                handleShareFailure
              )
            }}
          >
            <ShareIcon className="mr-2 h-6 w-6 cursor-pointer dark:stroke-white" />
            {SHARE_TEXT}
          </button>
          <AddToCalendarButton
            name="Apurva and Akhil's Wedding"
            options={['Apple', 'Google']}
            location="Napa, California"
            startDate="2024-10-26"
            timeZone="America/Los_Angeles"
            hideCheckmark={true}
            hideTextLabelButton={true}
            hideTextLabelList={true}
            listStyle="dropup-static"
          ></AddToCalendarButton>
        </div>
      )}
    </BaseModal>
  )
}
