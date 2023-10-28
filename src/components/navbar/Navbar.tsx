import { CogIcon, InformationCircleIcon } from '@heroicons/react/outline'

type Props = {
  setIsInfoModalOpen: (value: boolean) => void
  setIsStatsModalOpen: (value: boolean) => void
  setIsDatePickerModalOpen: (value: boolean) => void
  setIsSettingsModalOpen: (value: boolean) => void
}

export const Navbar = ({
  setIsInfoModalOpen,
  setIsSettingsModalOpen,
}: Props) => {
  return (
    <div className="navbar">
      <div className="navbar-content px-5 short:h-auto">
        <div className="flex">
          <InformationCircleIcon
            className="h-8 w-8 cursor-pointer rounded-xl bg-[#bdc797] dark:bg-black dark:stroke-white"
            onClick={() => setIsInfoModalOpen(true)}
          />
        </div>
        <div className="right-icons">
          <CogIcon
            className="h-8 w-8 cursor-pointer rounded-xl bg-[#bdc797] dark:bg-black dark:stroke-white"
            onClick={() => setIsSettingsModalOpen(true)}
          />
        </div>
      </div>
      <hr className="border-none"></hr>
    </div>
  )
}
