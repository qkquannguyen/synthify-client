import React, { Component } from 'react'
import { Grid, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
// TODO: Make this less ugly
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'

import grey from '@material-ui/core/colors/grey'
import deepOrange from '@material-ui/core/colors/deepOrange'

const theme = createMuiTheme({
  typography: { useNextVariants: true },
  palette: {
    primary: { main: grey[900] },
    secondary: { main: deepOrange[200] }
  },
  overrides: {
    MuiButton: {
      text: {
        // Some CSS
        background: 'linear-gradient(45deg, #FE6B8B 20%, #FF8E53 90%)',
        borderRadius: 15,
        color: 'white'
        // padding: '0 30px',
      }
    }
  }
})

class OAuthPage extends Component {
  render() {
    // eslint-disable-next-line no-useless-escape
    let token = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
      '$1'
    )
    console.log(token)
    return (
      <MuiThemeProvider theme={theme}>
        <Grid
          container
          direction="column"
          justify="flex-end"
          alignItems="center"
          style={{ marginTop: '100px' }}
        >
          <div>
            {token && (
              <Button
                style={{
                  width: '250px',
                  height: '110px',
                  background: '#cccccc',
                  margin: '100px'
                }}
              >
                <img
                  width="30px"
                  height="30px"
                  alt="GoOgLe"
                  src={require('../images/googleIcon.png')}
                />
                <a
                  style={{
                    textDecoration: 'none',
                    color: 'white',
                    fontSize: '36px',
                    paddingLeft: '10px'
                  }}
                  href={`http://localhost:9292/login/google?t=${token}`}
                >
                  google
                </a>
              </Button>
            )}
            {token && (
              <Button
                style={{
                  width: '250px',
                  height: '110px',
                  background: '#1DB954',
                  margin: '100px'
                }}
              >
                <img
                  width="30px"
                  height="30px"
                  alt="NoT GoOgLe"
                  src={require('../images/spotifyIcon.png')}
                />
                <a
                  style={{
                    textDecoration: 'none',
                    color: 'white',
                    fontSize: '36px',
                    paddingLeft: '10px'
                  }}
                  href={`http://localhost:9292/login/spotify?t=${token}`}
                >
                  spotify
                </a>
              </Button>
            )}
          </div>
          {/* Directs user to home */}
          <Button
            style={{
              background: 'linear-gradient(45deg, #FE6B8B 20%, #FF8E53 90%)',
              border: 1,
              color: 'white',
              padding: '0 30px',
              borderRadius: 26,
              width: '300px'
              // margin:'100px'
            }}
          >
            <Link to="/home" style={{ textDecoration: 'none', color: 'white' }}>
              <p> Continue </p>
            </Link>
          </Button>
        </Grid>
      </MuiThemeProvider>
    )
  }
}

export default OAuthPage
