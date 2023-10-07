import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {SiYoutubegaming} from 'react-icons/si'
import DashBoard from '../DashBoard'
import {
  GamingContainer,
  GamingDashContainer,
  GamingVideoContainer,
} from './styledComponent'
import Header from '../Header'
import GameItem from '../GameItem'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Trending extends Component {
  state = {gameVideo: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getGameList()
  }

  getGameList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/videos/gaming'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    console.log(response)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedData = data.videos.map(eachItem => ({
        id: eachItem.id,
        publishedAt: eachItem.published_at,
        thumbnailUrl: eachItem.thumbnail_url,
        title: eachItem.title,
        viewCount: eachItem.view_count,
      }))
      console.log(updatedData)
      this.setState({
        gameVideo: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  onRetry = () => {
    this.getGameList()
  }

  renderVideoDetails = () => {
    const {gameVideo} = this.state
    return (
      <GamingContainer>
        <Header />
        <GamingDashContainer>
          <DashBoard />
          <GamingVideoContainer>
            <div>
              <SiYoutubegaming />
              <h1>Gaming</h1>
            </div>
            <ul>
              {gameVideo.map(eachItem => (
                <GameItem videoDetail={eachItem} key={eachItem.id} />
              ))}
            </ul>
          </GamingVideoContainer>
        </GamingDashContainer>
      </GamingContainer>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
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

export default Trending
