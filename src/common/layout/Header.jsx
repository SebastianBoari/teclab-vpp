
/**
 * Page header component with optional back button and sticky behavior.
 *
 * @param {Object} props
 * @param {string} props.title - Header title text.
 * @param {function} [props.onBack] - Function triggered when the back button is clicked.
 * @param {boolean} [props.sticky=false] - Makes the header stick to the top when true.
 */
const Header = ({
  title,
  onBack,
  sticky = false,
}) => {
  return (
    <header
      className={`${
        sticky
          ? 'sticky top-0'
          : ''
      }
      bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-sm z-10`}
    >
      <div className="flex items-center justify-between p-4">
        {onBack && (
          <button
            onClick={onBack}
            className="text-gray-800 dark:text-gray-200 hover:cursor-pointer"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 19l-7-7 7-7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}

        {title && (
          <h1 className="flex-1 text-center text-lg font-bold text-gray-900 dark:text-gray-50">
            {title}
          </h1>
        )}
      </div>
    </header>
  )
}

export default Header
