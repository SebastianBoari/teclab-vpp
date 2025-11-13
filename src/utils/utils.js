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