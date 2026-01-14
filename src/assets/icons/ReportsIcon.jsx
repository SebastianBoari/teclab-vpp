const ReportsIcon = ({
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
    className={className ? className : ''}>
        <path fill={fill} d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2M9 17H7v-7h2zm4 0h-2V7h2zm4 0h-2v-4h2z"></path>
    </svg>
  )
}

export default ReportsIcon