import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import AppBar from '../components/AppBar'
import PlaylistDrawer from '../components/PlaylistDrawer'

class HomePage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      play: false,
      currentTrack: { track: '', artist: '' },
      // Set our current index to null, the user could click any where in the songs array
      currentIndex: null,
      redirect: false
    }
  }

  setRedirect = () => {
    this.setState({ redirect: true })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/settings" />
    }
  }

  toggleAudio = () => {
    this.setState({ play: !this.state.play })
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
    return (
      <div>
        <AppBar
          setRedirect={this.setRedirect}
          renderRedirect={this.renderRedirect}
        />
        <PlaylistDrawer
          toggleAudio={this.toggleAudio}
          changeSong={this.changeSong}
          audioState={this.state.play}
          music={this.music}
          currentTrack={this.state.currentTrack}
          // Pass it down
          currentIndex={this.state.currentIndex}
        />
      </div>
    )
  }
}

export default HomePage
