import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

class Stats extends Component {
  render() {
    return (
      <Box color="#ffffff">
        <List>
          <ListItem>
            <ListItemText primary="Coins" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Resources" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Appliances" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Wolves" />
          </ListItem>
        </List>
      </Box>
    )
  }
}

export default Stats;
