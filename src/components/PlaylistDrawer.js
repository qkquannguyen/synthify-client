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
    // padding: theme.spacing.unit * 3,
  },
});

function PermanentDrawerLeft(props) {
  const { classes } = props;

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
								{['Song1', 'Song2', 'Song3', 'Song4', 'Song5', 'Song6', 'Song7', 'Song8', 'Song9', 'Song10', 'Song11', 'Song12', 'Song13', 'Song14', 'Song15', 'Song16', 'Song17', 'Song18',].map((text, index) => (
								<ListItem button key={text}>
								<ListItemText primary={text} />
							</ListItem>
							))}
							
						</List>
					</Grid>
					
					<MusicPlayer/>

      </main>
    </div>
  );
}

PermanentDrawerLeft.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PermanentDrawerLeft);