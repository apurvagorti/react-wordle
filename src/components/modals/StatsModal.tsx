import { ShareIcon } from '@heroicons/react/outline'

import { ENABLE_MIGRATE_STATS } from '../../constants/settings'
import { SHARE_TEXT, STATISTICS_TITLE } from '../../constants/strings'
import image from '../../images/couple.jpeg'
import { GameStats } from '../../lib/localStorage'
import { shareStatus } from '../../lib/share'
import { addToCalendar } from '../../lib/stats'
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
  isGameLost,
  isGameWon,
  handleShareToClipboard,
  handleShareFailure,
  handleMigrateStatsButton,
  isHardMode,
  isDarkMode,
  isHighContrastMode,
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
      <h2 className="font-sail text-2xl dark:text-white">Napa, California</h2>
      {(isGameLost || isGameWon) && (
        <div className="mt-5 flex columns-2 items-center items-stretch justify-center text-center dark:text-white sm:mt-6">
          <button
            type="button"
            className="mx-2 mt-2 inline-flex w-full flex-1 items-center justify-center rounded-md border border-transparent bg-sky-500 px-4 py-2 text-center font-lato text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-base"
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
            <ShareIcon className="mr-2 h-5 w-5 cursor-pointer dark:stroke-white" />
            {SHARE_TEXT}
          </button>
          <button
            id="my-default-button"
            className="mx-2 mt-2 inline-flex w-full flex-1 items-center justify-center rounded-md border border-transparent bg-sky-500 px-4 py-2 text-center font-lato text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-base"
            onClick={() => addToCalendar()}
          >
            <svg
              className="mr-2 h-5 w-5	cursor-pointer fill-white stroke-white stroke-[8px]"
              xmlns="http://www.w3.org/2000/svg"
              width="200"
              height="200"
              viewBox="0 0 200 200.016"
            >
              <path d="M132.829 7.699c0-4.248 4.199-7.699 9.391-7.699s9.391 3.451 9.391 7.699v33.724c0 4.248-4.199 7.699-9.391 7.699s-9.391-3.451-9.391-7.699zm-5.941 123.747c2.979 0 5.404 2.425 5.404 5.404s-2.425 5.404-5.404 5.404l-21.077-.065-.065 21.045c0 2.979-2.425 5.404-5.404 5.404s-5.404-2.425-5.404-5.404l.065-21.061-21.045-.081c-2.979 0-5.404-2.425-5.404-5.404s2.425-5.404 5.404-5.404l21.061.065.065-21.045c0-2.979 2.425-5.404 5.404-5.404s5.404 2.425 5.404 5.404l-.065 21.077 21.061.065zM48.193 7.699C48.193 3.451 52.393 0 57.585 0s9.391 3.451 9.391 7.699v33.724c0 4.248-4.199 7.699-9.391 7.699s-9.391-3.451-9.391-7.699zM10.417 73.763h179.167V34.945c0-1.302-.537-2.49-1.4-3.369-.863-.863-2.051-1.4-3.369-1.4h-17.171c-2.881 0-5.208-2.327-5.208-5.208s2.327-5.208 5.208-5.208h17.171c4.183 0 7.975 1.709 10.726 4.46S200 30.762 200 34.945v44.043 105.843c0 4.183-1.709 7.975-4.46 10.726s-6.543 4.46-10.726 4.46H15.186c-4.183 0-7.975-1.709-10.726-4.46C1.709 192.79 0 188.997 0 184.814V78.988 34.945c0-4.183 1.709-7.975 4.46-10.726s6.543-4.46 10.726-4.46h18.343c2.881 0 5.208 2.327 5.208 5.208s-2.327 5.208-5.208 5.208H15.186c-1.302 0-2.49.537-3.369 1.4-.863.863-1.4 2.051-1.4 3.369zm179.167 10.433H10.417v100.618c0 1.302.537 2.49 1.4 3.369.863.863 2.051 1.4 3.369 1.4h169.629c1.302 0 2.49-.537 3.369-1.4.863-.863 1.4-2.051 1.4-3.369zM82.08 30.176c-2.881 0-5.208-2.327-5.208-5.208s2.327-5.208 5.208-5.208h34.977c2.881 0 5.208 2.327 5.208 5.208s-2.327 5.208-5.208 5.208z"></path>
            </svg>
            Add To Calendar
          </button>

          {/* <AddToCalendarButton
            name="Apurva and Akhil's Wedding"
            options={['Apple', 'Google']}
            location="Napa, California"
            startDate="2024-10-26"
            timeZone="America/Los_Angeles"
            hideCheckmark={true}
            hideTextLabelButton={true}
            hideTextLabelList={true}
            listStyle="dropup-static"
          ></AddToCalendarButton> */}
        </div>
      )}
    </BaseModal>
  )
}
