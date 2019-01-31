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

  var tracks = [];
  for(var i = 0; i < props.music.length; i++) {
    tracks[i] = props.music[i].track;
  }

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
								{tracks.map((text, index) => (
								<ListItem button key={text} onClick={() => props.selectTrack(props.music[index])}>
								<ListItemText primary={text} />
							</ListItem>
							))}
							
						</List>
					</Grid>
					
					<MusicPlayer
          toggleAudio={props.toggleAudio}
          audioState={props.audioState}
          currentTrack={props.currentTrack} />

      </main>
    </div>
  );
}

PermanentDrawerLeft.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PermanentDrawerLeft);