import React, { Component } from 'react'
import PlaylistDrawer from '../components/PlaylistDrawer'

import { connect } from 'react-redux'

import { getPlaylists, getPlaylistTracks } from '../redux/actions/services'

class HomePage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      play: false,
      currentTrack: { track: '', artist: '' },
      // Set our current index to null, the user could click any where in the songs array
      currentIndex: null
    }
  }

  componentWillMount() {
    this.props.getPlaylists()
  }

  toggleAudio = () => {
    this.setState({ play: !this.state.play })
  }

  getPlaylistTracks = (platform, id) => {
    this.props.getPlaylistTracks(platform, id)
  }

  changeSong = index => {
    if (index >= this.music.length) {
      index = 0
    } else if (index < 0) {
      index = this.music.length - 1
    }

    // Set our current index state
    this.setState({ currentTrack: this.music[index], currentIndex: index })
  }

  render() {
    const { services } = this.props
    const { playlists, names } = services
    return playlists && names ? (
      <PlaylistDrawer
        playlists={playlists}
        names={names}
        getTracks={this.getPlaylistTracks}
        toggleAudio={this.toggleAudio}
        changeSong={this.changeSong}
        audioState={this.state.play}
        currentTrack={this.state.currentTrack}
        // Pass it down
        currentIndex={this.state.currentIndex}
      />
    ) : (
      <h1>Loading</h1>
    )
  }
}

export default connect(
  state => state,
  { getPlaylists, getPlaylistTracks }
)(HomePage)
