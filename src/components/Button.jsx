import React from 'react'

const Button = ({status, message}) => {
  return (
        <button
            id="continue-button"
            disabled={status === 'disabled'}
            className="w-full py-3 px-4 bg-primary text-white font-bold rounded-lg 
             hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-primary 
             focus:ring-opacity-50 disabled:bg-primary/50 disabled:cursor-not-allowed 
             transition-colors duration-300"
        >
            {message ? message : 'Button'}
        </button>
  )
}

export default Button