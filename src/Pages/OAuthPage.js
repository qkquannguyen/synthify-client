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
          style={{ marginTop: '150px' }}
        >
          <div>
            {token && (
              <Button
                style={{
                  width: '150px',
                  height: '150px',
                  borderRadius: '100px',
                  margin: '50px',
                  background: '#cccccc'
                }}
              >
                <a
                  style={{
                    textDecoration: 'none',
                    color: 'white',
                    fontSize: '36px'
                  }}
                  href={`http://localhost:9292/login/google?t=${token}`}
                >
                  <img
                    width="100px"
                    height="100px"
                    alt="GoOgLe"
                    src={require('../images/googleIcon.png')}
                  />
                </a>
              </Button>
            )}
            {token && (
              <Button
                style={{
                  width: '150px',
                  height: '150px',
                  borderRadius: '100px',
                  margin: '50px',
                  background: '#1DB954'
                }}
              >
                <a href={`http://localhost:9292/login/spotify?t=${token}`}>
                  <img
                    width="100px"
                    height="100px"
                    alt="NoT GoOgLe"
                    src={require('../images/spotifyIcon.png')}
                  />
                </a>
              </Button>
            )}
            <Button
              style={{
                background: 'linear-gradient(45deg, #FE6B8B 20%, #FF8E53 90%)',
                border: 1,
                color: 'white',
                padding: '0 30px',
                borderRadius: '75px',
                width: '150px',
                height: '150px',
                margin: '50px'
              }}
            >
              <Link
                to="/home"
                style={{ textDecoration: 'none', color: 'white' }}
              >
                <img
                  width="100px"
                  height="100px"
                  alt="NoT GoOgLe"
                  src={require('../images/next.svg')}
                />
              </Link>
            </Button>
          </div>
          {/* Directs user to home */}
        </Grid>
      </MuiThemeProvider>
    )
  }
}

export default OAuthPage
