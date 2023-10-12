import { unicodeSplit } from './words'

export type CharStatus = 'absent' | 'present' | 'correct'

export const getStatuses = (
  solution: string,
  guesses: string[]
): { [key: string]: CharStatus } => {
  const charObj: { [key: string]: CharStatus } = {}
  guesses.forEach((guess) => {
    unicodeSplit(guess).forEach((number, i) => {
      if (!solution.includes(number)) {
        // make status absent
        return (charObj[number] = 'absent')
      }

      if (number === unicodeSplit(solution)[i]) {
        //make status correct
        return (charObj[number] = 'correct')
      }

      if (charObj[number] !== 'correct') {
        //make status present
        return (charObj[number] = 'present')
      }
    })
  })

  return charObj
}

export const getGuessStatuses = (
  solution: string,
  guess: string
): CharStatus[] => {
  const solutionCharsTaken = unicodeSplit(solution).map((_) => false)

  const statuses: CharStatus[] = Array.from(Array(guess.length))

  // handle all correct cases first
  unicodeSplit(guess).forEach((number, i) => {
    if (number === unicodeSplit(solution)[i]) {
      statuses[i] = 'correct'
      solutionCharsTaken[i] = true
      return
    }
  })

  unicodeSplit(guess).forEach((number, i) => {
    if (statuses[i]) return

    if (!unicodeSplit(solution).includes(number)) {
      // handles the absent case
      statuses[i] = 'absent'
      return
    }

    // now we are left with "present"s
    const indexOfPresentChar = unicodeSplit(solution).findIndex(
      (x, index) => x === number && !solutionCharsTaken[index]
    )

    if (indexOfPresentChar > -1) {
      statuses[i] = 'present'
      solutionCharsTaken[indexOfPresentChar] = true
      return
    } else {
      statuses[i] = 'absent'
      return
    }
  })

  return statuses
}
