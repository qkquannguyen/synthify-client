import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import {
  CssBaseline,
  Drawer,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core'

import NestedList from './NestedList'
import MusicPlayer from './MusicPlayer'
import SettingsModal from './SettingsModal'
const drawerWidth = 240

const styles = theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    overflow: window.scroll
    // padding: theme.spacing.unit * 3,
  }
})

class PermanentDrawerLeft extends Component {
  state = {
    alertOpen: false
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <CssBaseline />
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}
          anchor="left"
        >
          <div className={classes.toolbar} />
          <Divider />
          <List>
            {this.props.names.map((name, index) =>
              this.props.playlists[name] ? (
                <div key={index}>
                  <NestedList
                    getTracks={this.props.getTracks}
                    name={name}
                    playlists={this.props.playlists[name]}
                  />
                </div>
              ) : null
            )}
          </List>
        </Drawer>
        <main className={classes.content}>
          {/* <div className={classes.toolbar} /> */}
          <Grid
            container
            direction="column"
            alignItems="stretch"
            className={classes.root}
          >
            <List className={classes.list}>
              {/* We are previously passing down an array of objects,
                  the first argument of map is a callback to the object in an array,
                  we need to access the property of that object, in this case its the "track"
                  property.
                  */}
              {this.props.music.map((song, index) => (
                <ListItem
                  button
                  key={index}
                  onClick={() => this.props.changeSong(index)}
                >
                  <ListItemText primary={song.title} />
                </ListItem>
              ))}
            </List>
          </Grid>

          <MusicPlayer
            toggleAudio={this.props.toggleAudio}
            changeSong={this.props.changeSong}
            audioState={this.props.audioState}
            currentTrack={this.props.currentTrack}
            currentIndex={this.props.currentIndex}
            music={this.props.music}
            setProgress={this.props.setProgress}
            progress={this.props.progress}
            duration={this.props.duration}
          />
          <SettingsModal
            isModalOpen={this.props.isModalOpen}
            toggleModal={this.props.toggleModal}
            names={this.props.names}
          />
        </main>
      </div>
    )
  }
}

PermanentDrawerLeft.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(PermanentDrawerLeft)
