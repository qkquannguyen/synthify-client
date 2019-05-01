import React, { Component } from 'react'
import PlaylistDrawer from '../components/PlaylistDrawer'

import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'

import {
  getPlaylists,
  getPlaylistTracks,
  setSelected
} from '../redux/actions/services'

import { toggleModal } from '../redux/actions/settings'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
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

// #ed626a
const styles = theme => ({
  root: {
    textAlign: 'center'
  },
  title: {
    background: '-webkit-linear-gradient(#eee, #333)'
  }
})

class HomePage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      play: false,
      currentTrack: { track: '', artist: '' },
      // Set our current index to null, the user could click any where in the songs array
      currentIndex: null,
      music: [],
      currPlaylist: null,
      progress: null,
      duration: null
    }
  }

  componentDidMount() {
    this.props.getPlaylists()
  }

  toggleAudio = () => {
    this.setState({ play: !this.state.play })
  }

  setProgress = (progress, duration) => this.setState({ progress, duration })

  getPlaylistTracks = (platform, id) => {
    const { services } = this.props
    const { playlistById } = services
    if (playlistById[id] === undefined) {
      this.props.getPlaylistTracks(platform, id)
    } else {
      this.props.setSelected(id)
    }
  }

  changeSong = index => {
    const { services } = this.props
    const { playlistById, selectedPlaylist } = services

    if (playlistById[selectedPlaylist.id] === undefined) {
      return
    }

    // good enough
    if (index >= playlistById[selectedPlaylist.id].length) {
      index = 0
    } else if (index < 0) {
      index = playlistById[selectedPlaylist.id].length - 1
    }

    // Set our current index state
    this.setState({
      currentTrack: playlistById[selectedPlaylist.id][index],
      currentIndex: index
    })
  }

  render() {
    const { services } = this.props
    const { allPlaylists, names, playlistById, selectedPlaylist } = services
    return allPlaylists ? (
      <MuiThemeProvider theme={theme}>
        <PlaylistDrawer
          theme={this.props.theme}
          playlists={allPlaylists}
          names={names}
          getTracks={this.getPlaylistTracks}
          toggleAudio={this.toggleAudio}
          changeSong={this.changeSong}
          audioState={this.state.play}
          currentTrack={this.state.currentTrack}
          currentIndex={this.state.currentIndex}
          music={
            playlistById[selectedPlaylist.id]
              ? playlistById[selectedPlaylist.id]
              : []
          }
          setProgress={this.setProgress}
          progress={this.state.progress}
          duration={this.state.duration}
          isModalOpen={this.props.settings.isModalOpen}
          toggleModal={this.props.toggleModal}
        />
      </MuiThemeProvider>
    ) : (
      // Loading Icon svg note: the linter hates this lol
      <MuiThemeProvider theme={theme}>
        <div
          styles={{
            marginTop: '200px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <img src={require('../images/loading.svg')} alt={'loading'} />
        </div>
      </MuiThemeProvider>
    )
  }
}

const Wrapped = connect(
  state => state,
  { getPlaylists, getPlaylistTracks, setSelected, toggleModal }
)(HomePage)
export default withStyles(styles)(Wrapped)
