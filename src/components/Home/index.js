import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiOutlineSearch} from 'react-icons/ai'
import {
  HomeContainer,
  VideoDashContainer,
  Banner,
  VideoContainer,
} from './styledComponent'
import VideoItem from '../VideoItem'
import DashBoard from '../DashBoard'
import Header from '../Header'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {allVideo: [], apiStatus: apiStatusConstants.initial, searchInput: ''}

  componentDidMount() {
    this.allVideoList()
  }

  onSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onRetry = () => {
    this.allVideoList()
  }

  allVideoList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/all?search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedData = data.videos.map(eachItem => ({
        channel: {
          name: eachItem.channel.name,
          profileImageUrl: eachItem.channel.profile_image_url,
        },
        id: eachItem.id,
        publishedAt: eachItem.published_at,
        thumbnailUrl: eachItem.thumbnail_url,
        title: eachItem.title,
        viewCount: eachItem.view_count,
      }))
      console.log(updatedData)
      this.setState({
        allVideo: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
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

  renderVideoDetails = () => {
    const {allVideo, searchInput} = this.state
    console.log(searchInput)
    return (
      <HomeContainer data-testid="home">
        <Header />
        <VideoDashContainer>
          <DashBoard />
          <div>
            <Banner>
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                alt="nxt watch"
              />
              <p>Buy Nxt Watch Premium Prepaid plan with UPI</p>
              <button type="button">Get It Now</button>
            </Banner>
            <VideoContainer>
              <div>
                <input
                  type="text"
                  onChange={this.onSearchInput}
                  placeholder="Search"
                />
                <AiOutlineSearch />
              </div>
              <ul>
                {allVideo.map(eachItem => (
                  <VideoItem videoDetail={eachItem} key={eachItem.id} />
                ))}
              </ul>
            </VideoContainer>
          </div>
        </VideoDashContainer>
      </HomeContainer>
    )
  }

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

export default Home
