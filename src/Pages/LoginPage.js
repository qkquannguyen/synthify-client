import React, { Component } from 'react'
import { Button, Card, Form, Image, Container, Row, Col } from 'react-bootstrap'
import yellow from '@material-ui/core/colors/purple'
import Img from '../image/loginPage.jpg'

import { Link, Redirect } from 'react-router-dom'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Grid,
  TextField
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { blue } from '@material-ui/core/colors'
// import src from '*.jpg';

const styles = theme => ({
  root: {
    // flexGrow: 1,

    textAlign: 'center'
    // height: "100%"
  },
  multilineColor: {
    color: 'rgb(249,188,136)',
    textAlign: 'center',
    borderColor: 'rgb(249,188,136)'
  },
  cssLabel: {
    '&$cssFocused': {
      color: yellow[500]
    }
  },
  cssFocused: {},
  canvas: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
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
    if ((email !== '') & (password !== '')) {
      this.setState({ redirectToReferrer: true })
    } else {
      this.setState({ alertOpen: true })
    }
  }

  render() {
    const { classes } = this.props

    let { redirectToReferrer, alertOpen } = this.state
    if (redirectToReferrer) return <Redirect to={'/Home'} />
    document.body.style.overflow = 'hidden'

    return (
      <div>
        <Image
          src={Img}
          style={{ height: '100%', width: '100%', position: 'absolute' }}
        />

        <Card
          bg="dark"
          text="white"
          style={{
            width: '20rem',
            position: 'absolute',
            left: '50%',
            top: '40%',
            transform: 'translate(-50%, -50%)',
            opacity: '.9'
          }}
        >
          <Card.Header>
            <div className={classes.root}>Login</div>
          </Card.Header>

          {/* <h2>Sign in</h2> */}

          <form
            onSubmit={event => {
              event.preventDefault()
              event.target.reset()
              this.login()
            }}
          >
            {/* <Grid item xs={12} style={{textAlign:'center'}}> */}

            <div className={classes.root}>
              <TextField
                id="standard-username"
                label="email"
                value={this.state.email}
                onChange={this.handleChange('email')}
                margin="normal"
                InputProps={{
                  classes: {
                    input: classes.multilineColor
                  }
                }}
              />
              {/* </Grid> */}
              <Grid item xs={12}>
                <TextField
                  id="standard-name"
                  label="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.handleChange('password')}
                  margin="normal"
                  InputProps={{
                    classes: {
                      input: classes.multilineColor
                    }
                  }}
                />
              </Grid>
              <div style={{ paddingTop: '10%' }} />
              <Button
                onClick={this.login}
                style={{
                  borderRadius: '30px',
                  backgroundColor: '#EF6167',
                  width: '60%'
                }}
                variant="contained"
                color="primary"
              >
                Login
              </Button>
            </div>
          </form>
          <div style={{ paddingTop: '10%' }} className={classes.root}>
            <p>
              New User?
              <Link to="/signup" style={{ color: '#EF6167' }}>
                Sign Up
              </Link>
            </p>
          </div>

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
              <Button onClick={this.handleClose} color="primary">
                Okay
              </Button>
            </DialogActions>
          </Dialog>
        </Card>
      </div>
    )
  }
}

export default withStyles(styles)(Login)
