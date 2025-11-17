import toast from 'react-hot-toast'

/**
 * A utility wrapper for `react-hot-toast` to display notifications.
 *
 * This function dynamically calls the appropriate method on the `toast` object
 * (e.g., `toast.success()`, `toast.error()`) based on the provided status.
 *
 * @param {string} status - The type of notification. This must be a valid method
 * name on the `react-hot-toast` object (e.g., 'success', 'error', 'loading').
 * @param {string} message - The content to be displayed within the toast notification.
 * @returns {void}
 *
 * @example
 * // To show a success message:
 * notify('success', 'Profile updated successfully!')
 *
 * // To show an error message:
 * notify('error', 'Failed to update. Please try again.')
 */
export const notify = (status, message) => {
    toast[status](message)
}

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