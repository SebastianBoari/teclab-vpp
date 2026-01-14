const HomeIcon = ({
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
        <path fill={fill} d="M4 21V9l8-6l8 6v12h-6v-7h-4v7z"></path>
        </svg>
  )
}

export default HomeIcon