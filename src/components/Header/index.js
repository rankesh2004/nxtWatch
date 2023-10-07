import {withRouter, Link} from 'react-router-dom'
import Cookie from 'js-cookie'
import {
  HeaderContainer,
  Logo,
  LogoutContainer,
  HeaderImage,
  ThemeButton,
  LogoutButton,
} from './styledComponent'

const Header = props => {
  const onLogout = () => {
    Cookie.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <HeaderContainer>
      <Link to="/">
        <Logo
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="website logo"
        />
      </Link>

      <LogoutContainer>
        <ThemeButton type="button" data-testid="theme">
          <HeaderImage
            src="https://assets.ccbp.in/frontend/react-js/dark-theme-img.png"
            alt="dark"
          />
        </ThemeButton>

        <HeaderImage
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
          alt="profile"
        />

        <LogoutButton type="button" onClick={onLogout}>
          Logout
        </LogoutButton>
      </LogoutContainer>
    </HeaderContainer>
  )
}

export default withRouter(Header)
