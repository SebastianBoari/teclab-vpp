import React from 'react'

/**
 * Reusable primary button component.
 *
 * @param {Object} props
 * @param {boolean} props.status - Enables or disables the button.
 * @param {string} props.message - Text displayed inside the button.
 * @param {function} props.onClick - Function triggered on click.
 */
const Button = ({status, message, onClick}) => {
  return (
        <button
            disabled={!status}
            onClick={onClick}
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