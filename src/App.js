import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import VideoItemDetails from './components/VideoItemDetails'
import SaveVideo from './components/SaveVideo'
// eslint-disable-next-line import/extensions
import NotFound from './components/NotFound'
import ReactContext from './context/ReactContext'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

class App extends Component {
  state = {saveList: []}

  saveVideoToList = list => {
    this.setState({saveList: list})
  }

  render() {
    const {saveList} = this.state
    return (
      <Switch>
        <Route exact path="/login" component={LoginForm} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/trending" component={Trending} />
        <ProtectedRoute exact path="/gaming" component={Gaming} />
        <ProtectedRoute exact path="/videos/:id" component={VideoItemDetails} />
        <ProtectedRoute exact path="/saved-videos" component={SaveVideo} />
        <Route path="/not-found" component={NotFound} />
        <Redirect to="not-found" />
      </Switch>
    )
  }
}

export default App
