import React, { Component } from 'react'
import { Grid } from '@material-ui/core'
import { Link } from 'react-router-dom'
// TODO: Make this less ugly
class OAuthPage extends Component {
  render() {
    // eslint-disable-next-line no-useless-escape
    let token = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
      '$1'
    )
    console.log(token)
    return (
      <Grid>
        <div>
          {token && (
            <a href={`http://localhost:9292/login/google?t=${token}`}>google</a>
          )}
          {token && (
            <a href={`http://localhost:9292/login/spotify?t=${token}`}>
              spotify
            </a>
          )}
        </div>
        <Link to="/home">
          <p> Continue to Home </p>
        </Link>
      </Grid>
    )
  }
}

export default OAuthPage
