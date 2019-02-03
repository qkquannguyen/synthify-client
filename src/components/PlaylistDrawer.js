import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
	CssBaseline,
	Drawer,
	Divider,
	Grid,
	List,
	ListItem,
	ListItemText,
}  from '@material-ui/core'

import MusicPlayer from './MusicPlayer';
const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    overflow: window.scroll,
    // padding: theme.spacing.unit * 3,
  },
});

function PermanentDrawerLeft(props) {
  const { classes } = props

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <Divider />
				<h2> Playlists</h2>
        <List>
          {['Playlist1', 'Playlist2', 'Playlist3',].map((text, index) => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        
      </Drawer>
      <main className={classes.content}>
        {/* <div className={classes.toolbar} /> */}
					<Grid container direction='column' alignItems='stretch' className={classes.root}>
						<h2>Playlist 1</h2>
						<List className={classes.list}>
                {/* We are previously passing down an array of objects,
                the first argument of map is a callback to the object in an array,
                we need to access the property of that object, in this case its the "track"
                property.
                */}
								{props.music.map((song, index) => (
								<ListItem button key={index} onClick={() => props.changeSong(index)}>
								<ListItemText primary={song.track} />
							</ListItem>
							))}
							
						</List>
					</Grid>
					
					<MusicPlayer
          toggleAudio={props.toggleAudio}
          changeSong={props.changeSong}
          shuffleSongs={props.shuffleSongs}
          repeatSongs={props.repeatSongs}
          audioState={props.audioState}
          currentTrack={props.currentTrack}
          // Keep passing down our current index of the songs array
          currentIndex={props.currentIndex}
          music={props.music}
          shuffle={props.shuffle} 
          repeat={props.repeat}
          repeatOne={props.repeatOne}
          />
      </main>
    </div>
  );
}

PermanentDrawerLeft.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PermanentDrawerLeft);