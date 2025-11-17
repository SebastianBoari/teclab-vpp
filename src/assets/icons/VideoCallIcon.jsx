const VideoCallIcon = ({
  width = 24,
  height = 24,
  viewBox = '0 0 24 24',
  fill = 'currentColor',
}) => {
  return (
    <svg     
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox={viewBox}
    aria-hidden="true"
    >
        <path fill={fill} d="M13 6.188a6.812 6.812 0 1 0 0 13.625a6.812 6.812 0 1 0 0-13.625"></path>
    </svg>
  )
}

export default VideoCallIcon