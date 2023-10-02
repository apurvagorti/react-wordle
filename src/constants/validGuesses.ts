const generateValidDates = (startDate: Date, endDate: Date): string[] => {
  let currentDate = new Date(startDate)
  let validGuesses = []

  while (currentDate <= endDate) {
    let formattedDate = [
      String(currentDate.getMonth() + 1).padStart(2, '0'),
      String(currentDate.getDate()).padStart(2, '0'),
      String(currentDate.getFullYear()).slice(-2),
    ].join('')

    validGuesses.push(formattedDate)

    currentDate.setDate(currentDate.getDate() + 1)
  }

  return validGuesses
}

const startDate = new Date('2023-11-03')
const endDate = new Date('2026-12-31')
export const VALID_GUESSES = generateValidDates(startDate, endDate)
