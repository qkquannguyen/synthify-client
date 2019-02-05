import React, { Component } from 'react';
import AppBar from '../components/AppBar';
import PlaylistDrawer from '../components/PlaylistDrawer';

class HomePage extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      play: false,
      currentTrack: {track: "", artist: ""},
      // Set our current index to null, the user could click any where in the songs array
      currentIndex: null,
      shuffle: false,
      repeat: false,
      repeatOne: false,
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

  shuffledMusic = []

  toggleAudio = () => { this.setState({ play: !this.state.play }); };

  changeSong = (index, lastIndex) => {
    // Pressing next at end of song list
    if (index >= this.music.length && this.state.repeat) {
      index = 0;
    }
    // Pressing prev at beginning of song list
    else if (index < 0 && this.state.repeat) {
      index = this.music.length - 1;
    }
    // Same as both before but if repeat is not on
    else if ((index < 0 || index >= this.music.length) && !this.state.repeat) {
      index = 0;
    }

    // Last index isn't null when using next/prev buttons
    if (this.state.repeatOne && lastIndex != null) {
      index = lastIndex;
    }

    // Shuffle on and song selected
    if (this.state.shuffle && lastIndex == null) {
      // Reset shuffled array then shuffle
      this.shuffledMusic = Array.from(this.music);
      this.shuffledMusic = this.shuffleSongs(this.shuffledMusic, index);
      index = 0;
    }

    // If shuffle off, use original array, else use shuffled array
    if (!this.state.shuffle) {
      // Set our current index state
      this.setState({ currentTrack: this.music[index], currentIndex: index }); 
    }
    else {
      this.setState({ currentTrack: this.shuffledMusic[index], currentIndex: index });
    }
  };

  shuffleState = (index) => {
    this.setState({ shuffle: !this.state.shuffle });

    if (!this.state.shuffle) {
      // Reset shuffled music array then shuffle
      this.shuffledMusic = Array.from(this.music);
      this.shuffledMusic = this.shuffleSongs(this.shuffledMusic, index);
    }
    else {
      // If shuffle is turned off, get index of song in original list
      this.setState({ currentIndex: this.music.indexOf(this.shuffledMusic[index]) });
    }
  };

  shuffleSongs = (songs, index) => {
    var currentSong = null;

    // Remove current song to replace in beginning after shuffled
    if (index != null) {
      currentSong = this.music[index];
      this.shuffledMusic.splice(index, 1);
    }

    // Randomize array
    for (let i = songs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [songs[i], songs[j]] = [songs[j], songs[i]];
    }
    
    // Put current song in beginning and replace other song in its place
    if (index != null) {
      songs[songs.length] = songs[0];
      songs[0] = currentSong;
    }
    
    // Set index to start of new shuffled array
    if (this.state.currentIndex != null) {
      this.setState({ currentIndex: 0 });
    }

    return songs;
  };

  repeatSongs = () => {
    // Repeat is clicked, turn on
    if(!this.state.repeat) {
      this.setState({ repeat: true });
    }
    // Clicked again, turn on repeat one
    else if (this.state.repeat && !this.state.repeatOne) {
      this.setState({ repeatOne: true });
    }
    // Clicked again, turn both off
    else {
      this.setState({ repeat: false });
      this.setState({ repeatOne: false });
    }
  };

  render() {
    return (
      <div>
        <AppBar />
        <PlaylistDrawer
        toggleAudio={this.toggleAudio}
        changeSong={this.changeSong}
        shuffleState={this.shuffleState}
        repeatSongs={this.repeatSongs}
        audioState={this.state.play}
        music={this.music}
        currentTrack={this.state.currentTrack}
        // Pass it down
        currentIndex={this.state.currentIndex}
        shuffle={this.state.shuffle}
        repeat={this.state.repeat}
        repeatOne={this.state.repeatOne}
        />
      </div>
    );
  }
}

export default HomePage;