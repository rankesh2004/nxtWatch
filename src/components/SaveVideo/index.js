import {HiFire} from 'react-icons/hi'
import {formatDistanceToNow} from 'date-fns'
import ReactContext from '../../context/ReactContext'

import Header from '../Header'
import DashBoard from '../DashBoard'

const SaveVideo = () => (
  <ReactContext.Consumer>
    {value => {
      const {saveList} = value
      const {
        channel,
        publishedAt,
        thumbnailUrl,
        title,
        videoUrl,
        viewCount,
      } = saveList
      const {name, subscriberCount, profileImageUrl} = channel
      return (
        <div>
          {saveList.length > 0 ? (
            <>
              <Header />
              <div>
                <DashBoard />
                <div>
                  <HiFire />
                  <h1>Saved Videos</h1>
                </div>
                <div>
                  <img src={thumbnailUrl} alt={name} />
                  <div>
                    <h1>{title}</h1>
                    <p>{name}</p>
                    <p>
                      {viewCount} . {formatDistanceToNow(new Date(publishedAt))}
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                alt="no saved videos"
              />
              <h1>No saved videos found</h1>
            </div>
          )}
        </div>
      )
    }}
  </ReactContext.Consumer>
)

export default SaveVideo
