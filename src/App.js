import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AppBar from './components/AppBar'
import LoginPage from './Pages/LoginPage'
import SignUpPage from './Pages/SignupPage'
import SettingsPage from './Pages/SettingsPage'
import OAuth from './Pages/OAuthPage'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import { connect } from 'react-redux'
import ProtectedRoute from './components/ProtectedRoute'
import { NoMatch } from './components/NoMatch'

import HomePage from './Pages/HomePage'
import { toggleModal } from './redux/actions/settings'

const theme = createMuiTheme({ typography: { useNextVariants: true } })

class App extends Component {
  render() {
    const { auth } = this.props
    const { authenicated } = auth
    return (
      <ThemeProvider theme={theme}>
        <AppBar auth={authenicated} toggle={this.props.toggleModal} />
        <Router>
          <Switch>
            {/* Routes for app using react router v4 
                `path` is the url parameters
                component points to a react component
                Example https://reacttraining.com/react-router/web/example/basic
              */}
            <Route exact path="/" component={LoginPage} />
            <Route path="/signup" component={SignUpPage} />
            <ProtectedRoute
              auth={authenicated}
              path="/home"
              component={HomePage}
            />
            <ProtectedRoute
              auth={authenicated}
              path="/settings"
              component={SettingsPage}
            />
            <ProtectedRoute
              auth={authenicated}
              path="/oauth"
              component={OAuth}
            />
            <Route component={NoMatch} to={'/home'} />
          </Switch>
        </Router>
      </ThemeProvider>
    )
  }
}

export default connect(
  state => state,
  { toggleModal }
)(App)
