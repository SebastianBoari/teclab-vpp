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
    if(!limitDate) return null

    let daysRemaining = null

    const now = new Date()
    const closeDate = new Date(limitDate)
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const closeDateStart = new Date(closeDate.getFullYear(), closeDate.getMonth(), closeDate.getDate())
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
 * Formats an ISO date string to a day/month format.
 *
 * Takes a date string in ISO format (YYYY-MM-DD) and converts it to a
 * human-readable format showing only day and month (DD/MM).
 *
 * @param {string} isoDate - The date in ISO format (e.g., '2025-11-17')
 * @returns {string|undefined} The formatted date as 'DD/MM' or undefined if no date is provided.
 *
 * @example
 * formatDate('2025-11-17')
 * // Returns: '17/11'
 *
 * @example
 * formatDate('2025-01-05')
 * // Returns: '05/01'
 *
 * @example
 * formatDate(null)
 * // Returns: undefined
 */
export const formatDate = (isoDate) => {
    if (!isoDate) return

    const [year, month, day] = isoDate.split('-')
    
    return `${day}/${month}`
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