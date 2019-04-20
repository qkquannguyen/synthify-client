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
import CloseIcon from '@material-ui/icons/Close'
import {
  Button,
  Dialog,
  Checkbox,
  DialogActions,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  DialogTitle
} from '@material-ui/core'

const theme = createMuiTheme({ typography: { useNextVariants: true } })
class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false,
      checked: [1]
    }
  }

  handleToggle = value => () => {
    const { checked } = this.state
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    this.setState({
      checked: newChecked
    })
  }

  closeSettings = () => {
    this.setState({ isOpen: false })
  }

  openSettings = () => {
    this.setState({ isOpen: true })
  }

  renderSettings = () => {
    if (this.state.isOpen) {
      return (
        <Dialog
          open={this.state.isOpen}
          onClose={this.closeSettings}
          fullScreen
        >
          <DialogContent>
            <DialogTitle>Settings</DialogTitle>
            <List dense>
              {['Some Item', 'Dark Theme', 'Other Items'].map(value => (
                <ListItem key={value} button>
                  <ListItemText primary={`${value}`} />
                  <ListItemSecondaryAction>
                    <Checkbox
                      onChange={this.handleToggle(value)}
                      checked={this.state.checked.indexOf(value) !== -1}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeSettings} color="primary">
              <CloseIcon />
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
