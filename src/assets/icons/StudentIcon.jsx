const StudentIcon = ({
    width = 24,
    height = 24,
    viewBox = '0 0 24 24',
    fill = 'currentColor',
    className = false
}) => {
  return (
  <svg     xmlns="http://www.w3.org/2000/svg" 
    width={width} 
    height={height} 
    viewBox={viewBox}
    className={className ? className : ''}>
    <path fill={fill} d="M21 17v-6.9L12 15L1 9l11-6l11 6v8zm-9 4l-7-3.8v-5l7 3.8l7-3.8v5z"></path>
    </svg>
  )
}

export default StudentIcon