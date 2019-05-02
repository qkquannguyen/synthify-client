import { apiWrapper } from '../../services/api'

export const LOAD_PLAYLISTS = 'LOAD_PLAYLISTS'
export const SET_PLAYLISTS = 'GET_PLAYLISTS'

export const setPlaylists = (services, playlists) => ({
  type: SET_PLAYLISTS,
  services,
  playlists
})

export const addTracks = (platform, id, tracks) => ({
  type: 'ADD_TRACKS',
  platform,
  id,
  tracks
})

export const setSelected = id => ({
  type: 'SELECT_PLAYLIST',
  id
})

export const getPlaylists = () => {
  return dispatch => {
    apiWrapper('/playlists', {
      method: 'GET'
    })
      .then(res => {
        const services = Object.keys(res)
        dispatch(setPlaylists(services, res))
      })
      // todo handle error
      .catch(err => {
        console.error(err)
      })
  }
}

export const getPlaylistTracks = (platform, id) => {
  return dispatch => {
    apiWrapper(`/tracks/${platform}/${id}`, {
      method: 'GET'
    })
      .then(res => {
        dispatch(addTracks(platform, id, res[id]))
      })
      .catch(err => {
        console.error(err)
      })
  }
}
