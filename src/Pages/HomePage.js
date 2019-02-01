import React, { Component } from 'react';
import AppBar from '../components/AppBar';
import PlaylistDrawer from '../components/PlaylistDrawer';

class HomePage extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      play: false,
      currentTrack: {track: "", artist: ""}
    };
  }

  music = [
    {track: "This Was a Home Once", artist:"Bad Suns"},
    {track: "Oceans Away", artist: "A R I Z O N A"},
    {track: "Fool for Love", artist:"Lord Huron"},
    {track: "Feel It Boy", artist: "VHS Collection"},
    {track: "Track 5", artist: "Artist 5"},
    {track: "Track 6", artist: "Artist 6"},
    {track: "Track 7", artist: "Artist 7"},
    {track: "Track 8", artist: "Artist 8"},
    {track: "Track 9", artist: "Artist 9"},
    {track: "Track 10", artist: "Artist 10"},
  ]

  toggleAudio = () => { this.setState({ play: !this.state.play }); };

  changeSong = (index) => {
    if(index >= this.music.length) {
      index = 0;
    }
    else if (index < 0) {
      index = this.music.length - 1;
    }
    this.setState({ currentTrack: this.music[index] }); 
  };

  render() {
    return (
      <div>
        <AppBar />
        <PlaylistDrawer
        toggleAudio={this.toggleAudio}
        changeSong={this.changeSong}
        audioState={this.state.play}
        music={this.music}
        currentTrack={this.state.currentTrack} />
      </div>
    );
  }
}

export default HomePage;