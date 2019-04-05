import React, { Component } from 'react'

import { List, ListItem, ListItemText, Collapse } from '@material-ui/core'

import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'

export default class NestedList extends Component {
  state = {
    open: false
  }

  handleClick = () => {
    this.setState(state => ({ open: !state.open }))
  }

  render() {
    return (
      <List component="nav">
        <ListItem button onClick={this.handleClick}>
          <ListItemText inset primary={`${this.props.name}`} />
          {this.state.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {this.props.playlists.map(playlist => (
              <ListItem
                onClick={() =>
                  this.props.getTracks(this.props.name, playlist.id)
                }
                key={playlist.id}
                button
              >
                <ListItemText inset primary={`${playlist.title}`} />
              </ListItem>
            ))}
          </List>
        </Collapse>
      </List>
    )
  }
}
