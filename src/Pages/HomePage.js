import React, { Component } from 'react'
import PlaylistDrawer from '../components/PlaylistDrawer'

import { connect } from 'react-redux'

import {
  getPlaylists,
  getPlaylistTracks,
  setSelected
} from '../redux/actions/services'

class HomePage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      play: false,
      currentTrack: { track: '', artist: '' },
      // Set our current index to null, the user could click any where in the songs array
      currentIndex: null,
      music: [],
      currPlaylist: null
    }
  }

  componentWillMount() {
    this.props.getPlaylists()
  }

  toggleAudio = () => {
    this.setState({ play: !this.state.play })
  }

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
    return allPlaylists && names ? (
      <PlaylistDrawer
        playlists={allPlaylists}
        names={names}
        getTracks={this.getPlaylistTracks}
        toggleAudio={this.toggleAudio}
        changeSong={this.changeSong}
        audioState={this.state.play}
        currentTrack={this.state.currentTrack}
        // Pass it down
        currentIndex={this.state.currentIndex}
        music={
          playlistById[selectedPlaylist.id]
            ? playlistById[selectedPlaylist.id]
            : []
        }
      />
    ) : (
      <h1>Loading</h1>
    )
  }
}

export default connect(
  state => state,
  { getPlaylists, getPlaylistTracks, setSelected }
)(HomePage)
