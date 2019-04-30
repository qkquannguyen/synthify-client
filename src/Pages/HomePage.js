import React, { Component } from 'react'
import PlaylistDrawer from '../components/PlaylistDrawer'

import { connect } from 'react-redux'

import {
  getPlaylists,
  getPlaylistTracks,
  setSelected
} from '../redux/actions/services'

import { toggleModal } from '../redux/actions/settings'

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
      <PlaylistDrawer
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
    ) : (
      // Loading Icon
      <div
        style={{
          marginTop: '200px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <svg
          width="100px"
          height="100px"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid"
          class="lds-bar-chart"
        >
          <g transform="rotate(180 50 50)">
            <rect
              ng-attr-x="{{config.x1}}"
              y="15"
              ng-attr-width="{{config.width}}"
              height="31.1848"
              fill="#f7f7f7"
              x="15"
              width="10"
            >
              <animate
                attributeName="height"
                calcMode="spline"
                values="50;70;30;50"
                keyTimes="0;0.33;0.66;1"
                dur="1"
                keySplines="0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1"
                begin="-0.4s"
                repeatCount="indefinite"
              />
            </rect>
            <rect
              ng-attr-x="{{config.x2}}"
              y="15"
              ng-attr-width="{{config.width}}"
              height="42.7357"
              fill="#545454"
              x="35"
              width="10"
            >
              <animate
                attributeName="height"
                calcMode="spline"
                values="50;70;30;50"
                keyTimes="0;0.33;0.66;1"
                dur="1"
                keySplines="0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1"
                begin="-0.2s"
                repeatCount="indefinite"
              />
            </rect>
            <rect
              ng-attr-x="{{config.x3}}"
              y="15"
              ng-attr-width="{{config.width}}"
              height="48.4843"
              fill="#141414"
              x="55"
              width="10"
            >
              <animate
                attributeName="height"
                calcMode="spline"
                values="50;70;30;50"
                keyTimes="0;0.33;0.66;1"
                dur="1"
                keySplines="0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1"
                begin="-0.6s"
                repeatCount="indefinite"
              />
            </rect>
            <rect
              ng-attr-x="{{config.x4}}"
              y="15"
              ng-attr-width="{{config.width}}"
              height="69.9963"
              fill="#cdcdcd"
              x="75"
              width="10"
            >
              <animate
                attributeName="height"
                calcMode="spline"
                values="50;70;30;50"
                keyTimes="0;0.33;0.66;1"
                dur="1"
                keySplines="0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1"
                begin="0s"
                repeatCount="indefinite"
              />
            </rect>
          </g>
        </svg>
      </div>
    )
  }
}

export default connect(
  state => state,
  { getPlaylists, getPlaylistTracks, setSelected, toggleModal }
)(HomePage)
