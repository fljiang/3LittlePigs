import React, { Component } from 'react';
import { Box, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import coin from './../../img/icons/vp_icon.png';
import brick from './../../img/icons/brick_icon.png';
import stick from './../../img/icons/stick_icon.png';
import stone from './../../img/icons/stone_icon.png';
import wolf from './../../img/icons/wolf_icon.png';
import './statsComponent.css';

class Stats extends Component {
  render() {
    return (
      <Box border={1} width="15%">
        <List>
          <ListItem>
            <img src={coin} alt="" style={{ width: 25, height: 25 }} />
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
            <img src={brick} alt="" style={{ width: 25, height: 25 }} />
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
            <img src={stick} alt="" style={{ width: 25, height: 25 }} />
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
            <img src={stone} alt="" style={{ width: 25, height: 25 }} />
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
            <img src={wolf} alt="" style={{ width: 25, height: 25 }} />
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
