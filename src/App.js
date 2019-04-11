import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AppBar from './components/AppBar'
import LoginPage from './Pages/LoginPage'
import SignUpPage from './Pages/SignupPage'
import OAuth from './Pages/OAuthPage'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import { connect } from 'react-redux'
import ProtectedRoute from './components/ProtectedRoute'
import { NoMatch } from './components/NoMatch'

import './App.css'
import HomePage from './Pages/HomePage'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText
} from '@material-ui/core'
const theme = createMuiTheme({ typography: { useNextVariants: true } })
class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false
    }
  }

  closeSettings = () => {
    console.log('Close Settings')
    this.setState({ isOpen: false })
  }

  openSettings = () => {
    console.log('Setting state to True')
    this.setState({ isOpen: true })
  }

  renderSettings = () => {
    if (this.state.isOpen) {
      console.log('Open!')
      return (
        <Dialog
          open={this.state.isOpen}
          onClose={this.closeSettings}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Settings
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeSettings} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )
    }
  }
  render() {
    const { auth } = this.props
    const { authenicated } = auth
    return (
      <ThemeProvider theme={theme}>
        <AppBar
          closeSettings={this.closeSettings}
          openSettings={this.openSettings}
          renderSettings={this.renderSettings}
          auth={authenicated}
        />
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
  null
)(App)
