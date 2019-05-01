import React, { Component } from 'react'
import { Grid } from '@material-ui/core'
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
        borderRadius: 3,
        border: 1,
        color: 'white',
        padding: '0 30px'
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
        <Grid>
          <div>
            {token && (
              <a
                style={{ textDecoration: 'none', color: '#b3b3b3' }}
                href={`http://localhost:9292/login/google?t=${token}`}
              >
                google
              </a>
            )}
            {token && (
              <a
                style={{ textDecoration: 'none', color: '#b3b3b3' }}
                href={`http://localhost:9292/login/spotify?t=${token}`}
              >
                spotify
              </a>
            )}
          </div>
          <Link to="/home" style={{ textDecoration: 'none', color: '#b3b3b3' }}>
            <p> Continue to Home </p>
          </Link>
        </Grid>
      </MuiThemeProvider>
    )
  }
}

export default OAuthPage
