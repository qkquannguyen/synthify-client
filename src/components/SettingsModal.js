import React, { Component } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { unstable_Box as Box } from '@material-ui/core/Box'

const styles = theme => ({
  root: {
    display: 'flex'
  },
  directionColumn: {
    flexDirection: 'column'
  }
})

class SettingsModal extends Component {
  render() {
    let token = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
      '$1'
    )
    const { classes, names } = this.props

    // Filtering out which services we are logged into
    // It's ugly
    const services = [
      { name: 'spotify', url: `http://localhost:9292/login/google?t=${token}` },
      { name: 'google', url: `http://localhost:9292/login/google?t=${token}` }
    ]
    let ServicesLogin = services
    ServicesLogin = ServicesLogin.filter(function(service) {
      return !names.includes(service.name)
    })

    console.log(ServicesLogin)
    return (
      <div style={{ width: '100%' }}>
        <Dialog
          open={this.props.isModalOpen}
          onClose={this.props.toggleModal}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            {ServicesLogin.length !== 0 && (
              <DialogContentText id="alert-dialog-description">
                Login
              </DialogContentText>
            )}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {ServicesLogin.map((service, index) => (
                <Button key={index}>
                  {token && (
                    <a href={service.url} style={{ textDecoration: 'none' }}>
                      {service.name}
                    </a>
                  )}
                </Button>
              ))}
            </div>
            {/* <Button>
                  {token && (
                    <a 
                      href={`http://localhost:9292/login/google?t=${token}`}
                      style={{ textDecoration: 'none'}}
                      >
                      google
                    </a>
                  )}
                </Button>
                <Button>
                  {token && (
                    <a 
                      href={`http://localhost:9292/login/spotify?t=${token}`}
                      style={{ textDecoration: 'none'}}
                      > 
                      spotify 
                    </a>
                  )}
                </Button> */}
            <DialogContentText id="alert-dialog-description">
              Logout
            </DialogContentText>
            {names.map((name, index) => (
              <div key={index}>
                <Button>{name}</Button>
              </div>
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.toggleModal} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default withStyles(styles)(SettingsModal)
