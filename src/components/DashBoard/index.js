import {Link} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {BiListPlus} from 'react-icons/bi'
import {DashBoardContainer, Card, Para} from './styledComponent'

const DashBoard = () => (
  <DashBoardContainer>
    <Link className="link" to="/">
      <Card>
        <AiFillHome />
        <Para>Home</Para>
      </Card>
    </Link>
    <Link className="link" to="/trending">
      <Card>
        <HiFire />
        <Para>Trending</Para>
      </Card>
    </Link>
    <Link className="link" to="/gaming">
      <Card>
        <SiYoutubegaming />
        <Para>Gaming</Para>
      </Card>
    </Link>
    <Link className="link" to="/saved-videos">
      <Card>
        <BiListPlus />
        <Para>Saved Videos</Para>
      </Card>
    </Link>
    <p>CONTACT US</p>
    <img
      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
      alt="facebook logo"
    />
    <img
      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
      alt="twitter logo"
    />
    <img
      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
      alt="linked in logo"
    />
    <p>Enjoy! Now to see your channels and recommendations!</p>
  </DashBoardContainer>
)

export default DashBoard
