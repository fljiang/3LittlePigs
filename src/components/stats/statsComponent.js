import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Typography } from '@material-ui/core';
import './statsComponent.css';

class Stats extends Component {
  render() {
    return (
      <Box border={1} width="15%">
        <List>
          <ListItem>
            <ListItemText 
              disableTypography
              primary={<Typography className="Key">Coins</Typography>}
            />
            <ListItemText 
              disableTypography
              primary={<Typography className="Value">3</Typography>}
            />
          </ListItem>

          <ListItem>
            <ListItemText 
              disableTypography
              primary={<Typography className="Key">Resources</Typography>}
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              disableTypography
              primary={<Typography className="SubKey">Bricks</Typography>}
            />
            <ListItemText 
              disableTypography
              primary={<Typography className="Value">0</Typography>}
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              disableTypography
              primary={<Typography className="SubKey">Mud</Typography>}
            />
            <ListItemText 
              disableTypography
              primary={<Typography className="Value">0</Typography>}
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              disableTypography
              primary={<Typography className="SubKey">Sticks</Typography>}
            />
            <ListItemText 
              disableTypography
              primary={<Typography className="Value">0</Typography>}
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              disableTypography
              primary={<Typography className="SubKey">Stones</Typography>}
            />
            <ListItemText 
              disableTypography
              primary={<Typography className="Value">0</Typography>}
            />
          </ListItem>

          <ListItem>
            <ListItemText 
              disableTypography
              primary={<Typography className="Key">Appliances</Typography>}
            />
            <ListItemText 
              disableTypography
              primary={<Typography className="Value">n/a</Typography>}
            />
          </ListItem>
          
          <ListItem>
            <ListItemText 
              disableTypography
              primary={<Typography className="Key">Wolves</Typography>}
            />
            <ListItemText 
              disableTypography
              primary={<Typography className="Value">0</Typography>}
            />
          </ListItem>
        </List>
      </Box>
    )
  }
}

export default Stats;
