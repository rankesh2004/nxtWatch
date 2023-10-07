import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import ReactPlayer from 'react-player'
import {formatDistanceToNow} from 'date-fns'
import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'
import {BiListPlus} from 'react-icons/bi'
import ReactContext from '../../context/ReactContext'
import {Button, ButtonContainer} from './styledComponent'
import DashBoard from '../DashBoard'
import Header from '../Header'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class VideoItemDetails extends Component {
  state = {
    videoDetails: [],
    apiStatus: apiStatusConstants.initial,
    isLike: false,
    isDisLike: false,
  }

  componentDidMount() {
    this.getVideoDetails()
  }

  getVideoDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        channel: {
          name: data.video_details.channel.name,
          profileImageUrl: data.video_details.channel.profile_image_url,
          subscriberCount: data.video_details.subscriber_count,
        },
        description: data.video_details.description,
        id: data.video_details.id,
        publishedAt: data.video_details.published_at,
        thumbnailUrl: data.video_details.thumbnail_url,
        videoUrl: data.video_details.video_url,
        title: data.video_details.title,
        viewCount: data.video_details.view_count,
      }
      console.log(updatedData)
      this.setState({
        videoDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  onRetry = () => {
    this.getVideoDetails()
  }

  onLike = () => {
    this.setState(prevState => ({isLike: !prevState.isLike, isDisLike: false}))
  }

  onDislike = () => {
    this.setState(prevState => ({
      isDisLike: !prevState.isDisLike,
      isLike: false,
    }))
  }

  renderVideoDetails = () => (
    <ReactContext.Consumer>
      {value => {
        const {saveVideoToList} = value

        const {videoDetails, isLike, isDisLike} = this.state
        const onSaved = () => {
          saveVideoToList(videoDetails)
        }
        const {
          channel,

          publishedAt,

          title,
          videoUrl,
          viewCount,
        } = videoDetails
        const {name, subscriberCount, profileImageUrl} = channel
        return (
          <div>
            <div>
              <Header />
              <div>
                <DashBoard />
                <div>
                  <ReactPlayer url={videoUrl} />
                  <p>{title}</p>
                  <div>
                    <p>
                      {viewCount} . {formatDistanceToNow(new Date(publishedAt))}
                    </p>
                    <ButtonContainer>
                      <Button
                        type="button"
                        isActive={isLike}
                        onClick={this.onLike}
                      >
                        <AiOutlineLike /> Like
                      </Button>
                      <Button
                        type="button"
                        isActive={isDisLike}
                        onClick={this.onDislike}
                      >
                        <AiOutlineDislike /> Dislike
                      </Button>
                      <button type="button" onClick={onSaved}>
                        <BiListPlus /> Save
                      </button>
                    </ButtonContainer>
                  </div>
                </div>
                <hr />
                <div>
                  <img src={profileImageUrl} alt="channel logo" />
                  <div>
                    <p>{name}</p>
                    <p>{subscriberCount}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }}
    </ReactContext.Consumer>
  )

  renderVideoDetailsFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We are having some trouble to complete your request.</p>
      <p>Please try again</p>
      <button type="button" onClick={this.onRetry}>
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderVideoDetails()
      case apiStatusConstants.failure:
        return this.renderVideoDetailsFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}

export default VideoItemDetails
