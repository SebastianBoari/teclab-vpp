/**
 * Reusable primary button component.
 *
 * @param {Object} props
 * @param {boolean} [props.disabled=false] - Disables the button. Defaults to false.
 * @param {string} props.message - Text displayed inside the button.
 * @param {function} props.onClick - Function triggered on click.
 * @param {'button' | 'submit' | 'reset'} [props.type='button'] - The button's type. Defaults to 'button'.
 * @param {string} [props.form] - The 'form' attribute, associating the button with a form id.
 */
const Button = ({ disabled = false, message, onClick, type = 'button', form }) => {
  return (
        <button
            disabled={disabled}
            onClick={onClick}
            type={type}
            form={form}
            className="w-full py-3 px-4 bg-primary text-white font-bold rounded-lg 
             hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-primary 
             focus:ring-opacity-50 disabled:bg-primary/50 disabled:cursor-not-allowed 
             transition-colors duration-300 hover:cursor-pointer"
        >
            {message ? message : 'Button'}
        </button>
  )
}

export default Button