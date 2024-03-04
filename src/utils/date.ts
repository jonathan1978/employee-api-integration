export const calculateTenure = (hireDate: Date, terminationDate: Date): number | undefined => {
  let newTerminationDate
  const newHireDate = new Date(hireDate)
  if (typeof terminationDate === 'string' && terminationDate === '0000-00-00') {
    newTerminationDate = new Date() // Use today's date
  } else {
    newTerminationDate = new Date(terminationDate)
  }

  const timeDiff = Math.abs(newTerminationDate.getTime() - newHireDate.getTime())
  const tenureInYears = Math.floor(timeDiff / (1000 * 3600 * 24 * 365.25)) // Approximate number of days in a year

  return tenureInYears
}
