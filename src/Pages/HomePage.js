import React, { Component } from 'react'
import PlaylistDrawer from '../components/PlaylistDrawer'

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

  music = [
    { track: 'This Was a Home Once', artist: 'Bad Suns' },
    { track: 'Oceans Away', artist: 'A R I Z O N A' },
    { track: 'Fool for Love', artist: 'Lord Huron' },
    { track: 'Feel It Boy', artist: 'VHS Collection' },
    { track: 'Track 5', artist: 'Artist 5' },
    { track: 'Track 6', artist: 'Artist 6' },
    { track: 'Track 7', artist: 'Artist 7' },
    { track: 'Track 8', artist: 'Artist 8' },
    { track: 'Track 9', artist: 'Artist 9' },
    { track: 'Track 10', artist: 'Artist 10' }
  ]

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
      <PlaylistDrawer
        toggleAudio={this.toggleAudio}
        changeSong={this.changeSong}
        audioState={this.state.play}
        music={this.music}
        currentTrack={this.state.currentTrack}
        // Pass it down
        currentIndex={this.state.currentIndex}
      />
    )
  }
}

export default HomePage
