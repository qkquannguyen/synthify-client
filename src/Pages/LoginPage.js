import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Grid,
  TextField
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import { connect } from 'react-redux'
import { login } from '../redux/actions/auth'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  typography: { useNextVariants: true },

  overrides: {
    MuiButton: {
      text: {
        // Some CSS
        background: 'linear-gradient(45deg, #FE6B8B 20%, #FF8E53 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        padding: '0 30px'
      }
    }
  }
})

const styles = theme => ({
  root: {
    // flexGrow: 1,
    textAlign: 'center',
    marginTop: '100px'
  }
})

class Login extends Component {
  state = {
    email: '',
    password: '',
    DirectToHome: false,
    alertOpen: false
  }

  handleClose = () => {
    this.setState({ alertOpen: false })
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  login = () => {
    const { email, password } = this.state

    //send to redux later right now just accept everyone with a username
    if (email !== '' && password !== '') {
      // Calling our actions that we mapped in connect on line 133
      this.props.login(email, password)
      // this.setState({ redirectToReferrer: true });
    } else {
      this.setState({ alertOpen: true })
    }
  }

  render() {
    const { classes, auth } = this.props
    const { alertOpen } = this.state
    if (auth.authenicated) return <Redirect to={'/home'} />

    return (
      <MuiThemeProvider theme={theme}>
        <div>
          <Grid
            container
            direction="column"
            justify="flex-end"
            alignItems="center"
            className={classes.root}
          >
            <div>
              <h2>Sign in</h2>
              <form
                onSubmit={event => {
                  event.preventDefault()
                  event.target.reset()
                  this.login()
                }}
              >
                <Grid item xs={12}>
                  <TextField
                    id="standard-username"
                    label="email"
                    value={this.state.email}
                    onChange={this.handleChange('email')}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="standard-name"
                    label="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.handleChange('password')}
                    margin="normal"
                  />
                </Grid>
                <Button onClick={this.login}>Login</Button>

                <p> or </p>
              </form>
            </div>

            <Link to="/signup" style={{ color: '#b3b3b3' }}>
              <p> Sign Up </p>
            </Link>
            {/* Alert Box open when the user has incorrectly entered their email or password */}
            <Dialog
              open={alertOpen}
              onClose={this.handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  You have entered an Invalid Email and/or Password. Please try
                  again.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  className={classes.buttonTheme}
                  onClick={this.handleClose}
                  color="primary"
                >
                  Okay
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </div>
      </MuiThemeProvider>
    )
  }
}

// Connecting our component to the store
// mapping our current state and actions
const Wrapped = connect(
  state => state,
  { login }
)(Login)
export default withStyles(styles)(Wrapped)
