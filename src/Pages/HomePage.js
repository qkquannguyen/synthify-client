import React, { Component } from 'react';
import AppBar from '../components/AppBar';
import PlaylistDrawer from '../components/PlaylistDrawer';

class HomePage extends Component {
  render() {
    return (
      <div>
        <AppBar />
        <PlaylistDrawer/>
      </div>
    );
  }
}

export default HomePage;