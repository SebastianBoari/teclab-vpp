const AlertIcon = ({
    width = 24,
    height = 24,
    viewBox = '0 0 24 24',
    fill = 'currentColor',
    className = false
}) => {
  return (
    <svg 
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox={viewBox}
    aria-hidden="true"
    className={className ? className : ''}
    >
        <path fill="none" stroke={fill} strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit={10} strokeWidth={1.5} d="M12 16h.008M12 8v5m10-1c0-5.523-4.477-10-10-10S2 6.477 2 12s4.477 10 10 10s10-4.477 10-10"></path>
    </svg>
  )
}

export default AlertIcon