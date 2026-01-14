const TreeIcon = ({
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
        <path fill={fill} d="M15 21v-3h-4V8H9v3H2V3h7v3h6V3h7v8h-7V8h-2v8h2v-3h7v8z"></path>
    </svg>
  )
}

export default TreeIcon