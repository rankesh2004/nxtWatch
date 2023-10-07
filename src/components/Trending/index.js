import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {HiFire} from 'react-icons/hi'
import DashBoard from '../DashBoard'
import {
  TrendingContainer,
  TrendingDashContainer,
  TrendingVideoContainer,
} from './styledComponent'
import Header from '../Header'
import VideoItem from '../VideoItem'

class Trending extends Component {
  state = {trendVideo: [], isActive: false}

  componentDidMount() {
    this.getTrendList()
  }

  getTrendList = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/videos/trending'
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
      this.setState({trendVideo: updatedData, isActive: true})
    }
  }

  render() {
    const {trendVideo, isActive} = this.state
    return (
      <TrendingContainer data-testid="trending">
        <Header />
        <TrendingDashContainer>
          <DashBoard />
          <TrendingVideoContainer>
            <div>
              <HiFire />
              <h1>Trending</h1>
            </div>
            {isActive ? (
              <ul>
                {trendVideo.map(eachItem => (
                  <VideoItem videoDetail={eachItem} key={eachItem.id} />
                ))}
              </ul>
            ) : (
              <div className="loader-container" data-testid="loader">
                <Loader
                  type="ThreeDots"
                  color="#ffffff"
                  height="50"
                  width="50"
                />
              </div>
            )}
          </TrendingVideoContainer>
        </TrendingDashContainer>
      </TrendingContainer>
    )
  }
}

export default Trending
