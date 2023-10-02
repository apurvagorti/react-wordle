import { solution } from '../../lib/words'
import { Cell } from './Cell'

export const EmptyRow = () => {
  const dashesToAdd = Math.floor(solution.length / 2) - 1
  const totalLength = solution.length + dashesToAdd
  const elements = Array.from(Array(totalLength))

  return (
    <div className="mb-1 flex justify-center">
      {elements.map((_, i) => {
        // Insert a dash after every 3rd position (0-based index)
        if ((i + 1) % 3 === 0 && i !== totalLength - 1) {
          return (
            <div key={i} className="dash flex items-center p-3 dark:text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 018-2.828A4.5 4.5 0 0118 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 01-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 01-.69.001l-.002-.001z" />
              </svg>
            </div>
          ) // Use a suitable styling for the dash
        }
        return <Cell key={i} />
      })}
    </div>
  )
}
