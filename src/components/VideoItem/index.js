import {Link} from 'react-router-dom'

const VideoItem = props => {
  const {videoDetail} = props
  const {channel, id, publishedAt, thumbnailUrl, title, viewCount} = videoDetail
  const {name, profileImageUrl} = channel
  return (
    <Link to={`/videos/${id}`}>
      <li>
        <img src={thumbnailUrl} alt="video thumbnail" />
        <div>
          <img src={profileImageUrl} alt={name} />
          <div>
            <p>{title}</p>
            <p>{name}</p>
            <div>
              <p>{viewCount}</p> . <p>{publishedAt}</p>
            </div>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default VideoItem
