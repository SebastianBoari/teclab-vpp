const DeleteIcon = ({
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
        <path fill={fill} d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z"></path>
    </svg>
  )
}

export default DeleteIcon