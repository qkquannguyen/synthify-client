import React, { Component } from 'react';
import AppBar from '../components/AppBar';
import PlaylistDrawer from '../components/PlaylistDrawer';

class HomePage extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      play: false
    };
  }

  toggleAudio = () => { this.setState({ play: !this.state.play }); };

  render() {
    return (
      <div>
        <AppBar />
        <PlaylistDrawer
        toggleAudio={this.toggleAudio}
        audioState={this.state.play} />
      </div>
    );
  }
}

export default HomePage;