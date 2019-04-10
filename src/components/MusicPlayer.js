import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import PauseIcon from '@material-ui/icons/Pause'
import SkipNextIcon from '@material-ui/icons/SkipNext'
import Grid from '@material-ui/core/Grid'
import LinearProgress from '@material-ui/core/LinearProgress'
import Sound from 'react-sound'

const styles = theme => ({
  root: {
    // width: '100%',
    position: 'fixed',

    bottom: 0
  },
  card: {
    display: 'flex'
  },
  details: {
    display: 'flex',
    flexDirection: 'column'
  },
  content: {
    flex: '1 0 auto'
  },
  cover: {
    width: '100%'
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  },
  playPauseIcon: {
    height: 38,
    width: 38
  }
})

function MediaControlCard(props) {
  const { classes, theme } = props
  const index = props.currentIndex
  return (
    <Grid
      container
      direction="column"
      alignitems="stretch"
      className={classes.root}
    >
      <Card className={classes.card}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              {props.currentTrack.title}
            </Typography>
            {props.currentTrack.artist && (
              <Typography variant="subtitle1" color="textSecondary">
                {props.currentTrack.artist}
              </Typography>
            )}
            {props.currentTrack.album && (
              <Typography variant="subtitle1" color="textSecondary">
                {props.currentTrack.album}
              </Typography>
            )}
          </CardContent>
          <div className={classes.controls}>
            <IconButton
              aria-label="Previous"
              onClick={() => props.changeSong(index - 1)}
            >
              {theme.direction === 'rtl' ? (
                <SkipNextIcon />
              ) : (
                <SkipPreviousIcon />
              )}
            </IconButton>
            <IconButton aria-label="Play/pause" onClick={props.toggleAudio}>
              {props.audioState === false ? (
                <PlayArrowIcon className={classes.playPauseIcon} />
              ) : (
                <PauseIcon className={classes.playPauseIcon} />
              )}
            </IconButton>
            <IconButton
              aria-label="Next"
              onClick={() => props.changeSong(index + 1)}
            >
              {theme.direction === 'rtl' ? (
                <SkipPreviousIcon />
              ) : (
                <SkipNextIcon />
              )}
            </IconButton>
          </div>
          <Sound
            url={
              props.currentTrack.stream_url ? props.currentTrack.stream_url : ''
            }
            playStatus={
              props.audioState ? Sound.status.PLAYING : Sound.status.PAUSED
            }
            onFinishedPlaying={() => props.changeSong(index + 1)}
            // questionable decisions here
            onPlaying={({ position, duration }) =>
              props.setProgress(position, duration)
            }
          />
        </div>
      </Card>
      {props.progress >= 0 && (
        <div>
          <LinearProgress
            color="secondary"
            variant="determinate"
            value={
              props.progress
                ? Math.floor((props.progress / props.duration) * 100)
                : 0
            }
          />
        </div>
      )}
    </Grid>
  )
}

MediaControlCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(MediaControlCard)
