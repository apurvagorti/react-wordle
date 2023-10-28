import {
  HARD_MODE_DESCRIPTION,
  HIGH_CONTRAST_MODE_DESCRIPTION,
} from '../../constants/strings'
import { BaseModal } from './BaseModal'
import { SettingsToggle } from './SettingsToggle'

type Props = {
  isOpen: boolean
  handleClose: () => void
  isHardMode: boolean
  handleHardMode: Function
  isDarkMode: boolean
  handleDarkMode: Function
  isHighContrastMode: boolean
  handleHighContrastMode: Function
}
const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
  localStorage.clear()
  window.location.reload()
}

export const SettingsModal = ({
  isOpen,
  handleClose,
  isHardMode,
  handleHardMode,
  isDarkMode,
  handleDarkMode,
  isHighContrastMode,
  handleHighContrastMode,
}: Props) => {
  return (
    <BaseModal title="Settings" isOpen={isOpen} handleClose={handleClose}>
      <div className="mt-2 flex flex-col divide-y">
        <SettingsToggle
          settingName="Hard Mode"
          flag={isHardMode}
          handleFlag={handleHardMode}
          description={HARD_MODE_DESCRIPTION}
        />
        <SettingsToggle
          settingName="Dark Mode"
          flag={isDarkMode}
          handleFlag={handleDarkMode}
        />
        <SettingsToggle
          settingName="High Contrast Mode"
          flag={isHighContrastMode}
          handleFlag={handleHighContrastMode}
          description={HIGH_CONTRAST_MODE_DESCRIPTION}
        />
        <button
          onClick={handleClick}
          className="xxshort:text-xxs flex h-14 cursor-pointer select-none items-center justify-center rounded bg-slate-200 font-bold hover:bg-slate-300 active:bg-slate-400 dark:bg-slate-600 dark:text-white short:h-12 xshort:h-10 xshort:w-10 xxshort:h-8 xxshort:w-8"
        >
          Refresh Game and Play Again!
        </button>
      </div>
    </BaseModal>
  )
}
