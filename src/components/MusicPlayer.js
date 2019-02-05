import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import RepeatIcon from '@material-ui/icons/Repeat';
import RepeatOneIcon from '@material-ui/icons/RepeatOne';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    // width: '100%',
    position: 'fixed',

    bottom: 0,
  },
  card: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: '100%',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  toggledIcon: {
    color: 'blue',
  },
  untoggledIcon: {
    color: 'gray',
  },
  playPauseIcon: {
    height: 38,
    width: 38,
  },
});

function MediaControlCard(props) {
  console.log(props);
  const { classes, theme } = props;

  // This is O(N) look up every time we re-render the component, expensive.
  // var index = props.music.findIndex(s => s.track === props.currentTrack.track)

  // var is global and mutable! Could produce undesired behavior.
  // We use const to make it immutable, and let to have a locally scoped, mutable variable. 
  const index = props.currentIndex

  return (
    <Grid container direction="column" alignitems="stretch"className={classes.root}>
    <Card className={classes.card}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {props.currentTrack.track}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {props.currentTrack.artist}
          </Typography>
        </CardContent>
        <div className={classes.controls}>
          <IconButton aria-label="Shuffle" onClick={() => props.shuffleState(index)}>
            <ShuffleIcon className={!props.shuffle ? classes.untoggledIcon : classes.toggledIcon} />
          </IconButton>
          <IconButton aria-label="Previous" onClick={() => props.changeSong(index - 1, index)}>
            {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
          </IconButton>
          <IconButton aria-label="Play/pause" onClick={props.toggleAudio}>
            {!props.audioState ? <PlayArrowIcon className={classes.playPauseIcon} /> : <PauseIcon className={classes.playPauseIcon} />}
          </IconButton>
          <IconButton aria-label="Next" onClick={() => props.changeSong(index + 1, index)}>
            {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
          </IconButton>
          <IconButton aria-label="Repeat" onClick={() => props.repeatSongs()}>
            {!props.repeat ? <RepeatIcon /> : (props.repeat && !props.repeatOne) ? <RepeatIcon className={classes.toggledIcon} /> : <RepeatOneIcon className={classes.toggledIcon} />}
          </IconButton>
        </div>
      </div>
      
    </Card>
    </Grid>
  );
}

MediaControlCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MediaControlCard);