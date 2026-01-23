/**
 * Reusable primary button component.
 *
 * @param {Object} props
 * @param {boolean} [props.disabled=false] - Disables the button. Defaults to false.
 * @param {string} props.message - Text displayed inside the button.
 * @param {function} props.onClick - Function triggered on click.
 * @param {'button' | 'submit' | 'reset'} [props.type='button'] - The button's type. Defaults to 'button'.
 * @param {string} [props.form] - The 'form' attribute, associating the button with a form id.
 * @param {React.ReactNode} [props.icon] - Icon component to render on the left (e.g. <MyIcon />).
 * @param {string} [props.className] - Additional CSS classes to extend or override the button's style.
 */
const Button = ({ disabled = false, message, onClick, type = 'button', form, icon, className = '' }) => {
  const baseClasses = 'w-full py-3 px-4 bg-primary text-white font-bold rounded-lg hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 disabled:bg-primary/50 disabled:cursor-not-allowed transition-colors duration-300 hover:cursor-pointer flex items-center justify-center gap-2'

  return (
        <button
            disabled={disabled}
            onClick={onClick}
            type={type}
            form={form}
            className={`${baseClasses} ${className}`}
        > 
            {icon && <span className="flex items-center justify-center">{icon}</span>}
            {message ? message : 'Button'}
        </button>
  )
}

export default Button