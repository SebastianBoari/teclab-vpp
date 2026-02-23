/**
 * Calculates the number of days remaining until a given limit date.
 *
 * This function compares the current date with a provided limit date and returns:
 * - A positive number if the limit date is in the future (days remaining)
 * - 0 if it's the last day and the time hasn't passed yet
 * - -1 if the limit date/time has already passed
 * - null if no valid date is provided
 *
 * The function resets time components to midnight for date-only comparison,
 * but on the same day (diffDays === 0), it performs an exact timestamp comparison
 * to determine if the deadline hour has passed.
 *
 * @param {string|Date} limitDate - The deadline date as an ISO string (e.g., '2025-11-17 12:00:00+00')
 * or a Date object. Must be parseable by the Date constructor.
 * @returns {number|null} The number of days remaining (positive, 0, or -1), or null if limitDate is falsy.
 *
 * @example
 * // If today is Nov 15, 2025 and limit is Nov 17, 2025 12:00 PM:
 * getDaysRemaining('2025-11-17 12:00:00+00')
 * // Returns: 2
 *
 * @example
 * // If today is Nov 17, 2025 at 10:00 AM and limit is Nov 17, 2025 12:00 PM:
 * getDaysRemaining('2025-11-17 12:00:00+00')
 * // Returns: 0 (last day, time hasn't passed)
 *
 * @example
 * // If today is Nov 17, 2025 at 2:00 PM and limit is Nov 17, 2025 12:00 PM:
 * getDaysRemaining('2025-11-17 12:00:00+00')
 * // Returns: -1 (deadline passed)
 *
 * @example
 * // If no date is provided:
 * getDaysRemaining(null)
 * // Returns: null
 */
export const getDaysRemaining = (limitDate) => {
  if (!limitDate) return null

  let daysRemaining = null

  const now = new Date()
  const closeDate = new Date(limitDate)
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const closeDateStart = new Date(
    closeDate.getFullYear(),
    closeDate.getMonth(),
    closeDate.getDate()
  )
  const diffTime = closeDateStart - todayStart
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 0) {
    daysRemaining = now < closeDate ? 0 : -1
  } else {
    daysRemaining = diffDays
  }

  return daysRemaining
}

/**
 * Formats a time range string into a more readable format.
 *
 * Takes a string representing a time range with hours separated by a hyphen
 * and converts it to a readable format using 'a' (to) as a connector.
 *
 * @param {string} hoursString - A time range string in format 'HH:MM-HH:MM' (e.g., '09:00-17:00')
 * @returns {string|undefined} The formatted time range as 'HH:MM a HH:MM' or undefined if no string is provided.
 *
 * @example
 * formatHours('09:00-17:00')
 * // Returns: '09:00 a 17:00'
 *
 * @example
 * formatHours('14:30-18:45')
 * // Returns: '14:30 a 18:45'
 *
 * @example
 * formatHours(null)
 * // Returns: undefined
 */
export const formatHours = (hoursString) => {
  if (!hoursString) return

  const [startHour, endHour] = hoursString.split('-')

  return `${startHour} a ${endHour}`
}

/**
 * Formats an ISO date string into a readable string.
 * Default behavior returns 'DD/MM'. Custom options allow any format.
 * * @param {string} isoDate - The date in ISO format.
 * @param {Intl.DateTimeFormatOptions} [options] - Optional. Overrides default formatting.
 * @returns {string|undefined} The formatted date or undefined.
 * * @example
 * // Default (Short)
 * formatDate('2025-01-15T00:00:00')
 * // Returns: '15/01'
 * * @example
 * // Long format ("15 de enero")
 * formatDate('2025-01-15T00:00:00', { day: 'numeric', month: 'long' })
 * // Returns: '15 de enero'
 * * @example
 * // Month and Year ("Enero 2025")
 * formatDate('2025-01-15T00:00:00', { month: 'long', year: 'numeric' })
 * // Returns: 'enero 2025'
 */
export const formatDate = (isoDate, options = null) => {
  if (!isoDate) return

  const date = new Date(isoDate)

  if (isNaN(date.getTime())) return

  const defaultOptions = {
    day: '2-digit',
    month: '2-digit',
  }

  return new Intl.DateTimeFormat('es-AR', options || defaultOptions).format(date)
}

/**
 * Formats an ISO date string into YYYY-MM-DD
 * for <input type="date" />
 */
export const formatDateForInput = (isoDate) => {
  if (!isoDate) return ''

  const date = new Date(isoDate)
  if (isNaN(date.getTime())) return ''

  return date.toISOString().split('T')[0]
}
