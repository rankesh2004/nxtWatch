import {Link} from 'react-router-dom'

const GameItem = props => {
  const {videoDetail} = props
  const {id, thumbnailUrl, title, viewCount} = videoDetail
  return (
    <Link to={`/videos/${id}`}>
      <li>
        <img src={thumbnailUrl} alt={title} />
        <div>
          <div>
            <p>{title}</p>
            <p>
              <span>{viewCount}</span> Watching Worldwide
            </p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default GameItem
