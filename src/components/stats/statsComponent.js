import React, { Component } from 'react';
import { Box, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import coin from './../../img/icons/coin_icon.png';
import brick from './../../img/icons/brick_icon.png';
import stick from './../../img/icons/stick_icon.png';
import stone from './../../img/icons/stone_icon.png';
import mud from './../../img/icons/mud_icon.png';
import wolf from './../../img/icons/wolf_icon.png';
import './statsComponent.css';

const Stats = ({ numCoins, numBricks, numSticks, numMud, numStones, numWolves }) => (
  <Box border={1} width="35%">
    <List>
      <ListItem>
        <img src={coin} alt="" style={{ width: 25, height: 25 }} />
        <ListItemText 
          disableTypography
          primary={<Typography className="Key">Coins</Typography>}
        />
        <ListItemText 
          disableTypography
          primary={<Typography className="Value">{numCoins}</Typography>}
        />
      </ListItem>

      <ListItem>
        <ListItemText 
          disableTypography
          primary={<Typography className="Key">Resources</Typography>}
        />
      </ListItem>
      <ListItem>
        <ListItem style={{ marginTop: -20, marginBottom: -20, marginLeft: -15 }}>
          <img src={brick} alt="" style={{ width: 25, height: 32.5 }} />
          <ListItemText 
            disableTypography
            primary={<Typography className="SubKey">{numBricks}</Typography>}
          />
          <ListItemText 
            disableTypography
            primary={<Typography className="Value">0</Typography>}
          />
        </ListItem>

        <ListItem style={{ margin: -15 }}>
          <img src={mud} alt="" style={{ width: 25, height: 32.5 }} />
          <ListItemText 
            disableTypography
            primary={<Typography className="SubKey">Mud</Typography>}
          />
          <ListItemText 
            disableTypography
            primary={<Typography className="Value">{numMud}</Typography>}
          />
        </ListItem>
      </ListItem>
      <ListItem>
        <ListItem style={{ marginTop: -20, marginBottom: -20, marginLeft: -15 }}>
          <img src={stick} alt="" style={{ width: 25, height: 32.5 }} />
          <ListItemText 
            disableTypography
            primary={<Typography className="SubKey">Sticks</Typography>}
          />
          <ListItemText 
            disableTypography
            primary={<Typography className="Value">{numSticks}</Typography>}
          />
        </ListItem>

        <ListItem style={{ margin: -15 }}>
          <img src={stone} alt="" style={{ width: 25, height: 32.5 }} />
          <ListItemText 
            disableTypography
            primary={<Typography className="SubKey">Stones</Typography>}
          />
          <ListItemText 
            disableTypography
            primary={<Typography className="Value">{numStones}</Typography>}
          />
        </ListItem>
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
        <img src={wolf} alt="" style={{ width: 25, height: 32.5 }} />
        <ListItemText 
          disableTypography
          primary={<Typography className="Key">Wolves</Typography>}
        />
        <ListItemText 
          disableTypography
          primary={<Typography className="Value">{numWolves}</Typography>}
        />
      </ListItem>
    </List>
  </Box>
);

export default Stats;
