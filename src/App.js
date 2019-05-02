import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AppBar from './components/AppBar'
import LoginPage from './Pages/LoginPage'
import SignUpPage from './Pages/SignupPage'
import SettingsPage from './Pages/SettingsPage'
import OAuth from './Pages/OAuthPage'
import { ThemeProvider } from '@material-ui/styles'
import { connect } from 'react-redux'
import ProtectedRoute from './components/ProtectedRoute'
import { NoMatch } from './components/NoMatch'

import HomePage from './Pages/HomePage'
import { toggleModal } from './redux/actions/settings'
import { createMuiTheme } from '@material-ui/core/styles'

import grey from '@material-ui/core/colors/grey'
import deepOrange from '@material-ui/core/colors/deepOrange'

const theme = createMuiTheme({
  typography: { useNextVariants: true },
  palette: {
    primary: { main: grey[900] },
    secondary: { main: deepOrange[200] },
    type: 'dark'
  },
  overrides: {
    MuiButton: {
      text: {
        // Some CSS
        background: 'linear-gradient(45deg, #FE6B8B 20%, #FF8E53 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)'
      }
    }
  }
})

class App extends Component {
  render() {
    const { auth } = this.props
    const { authenicated } = auth

    return (
      <ThemeProvider theme={theme}>
        <AppBar
          auth={authenicated}
          theme={theme}
          toggle={this.props.toggleModal}
        />
        <Router>
          <Switch>
            {/* Routes for app using react router v4 
                `path` is the url parameters
                component points to a react component
                Example https://reacttraining.com/react-router/web/example/basic
              */}
            <Route
              exact
              path="/"
              component={() => <LoginPage theme={theme} />}
            />
            <Route
              path="/signup"
              component={() => <SignUpPage theme={theme} />}
            />
            <ProtectedRoute
              auth={authenicated}
              path="/home"
              component={HomePage}
            />
            <ProtectedRoute
              auth={authenicated}
              path="/settings"
              component={() => <SettingsPage theme={theme} />}
            />
            <ProtectedRoute
              auth={authenicated}
              path="/oauth"
              component={() => <OAuth theme={theme} />}
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
