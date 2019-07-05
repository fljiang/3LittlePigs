import React from 'react';
import { Box, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import brick from './../../img/icons/brick_icon.png';
import './boardComponent.css';

const Board = ({ }) => (
  <Box border={1} width="90%">
    <List>
      <ListItem>
        <img src={brick} alt="" style={{ width: 50, height: 65 }} />
        <ListItemText 
          disableTypography
          primary={<Typography className="HouseName">Billy's House</Typography>}
        />
      </ListItem>

      {/* <ListItem>
        <img src={brick} alt="" style={{ width: 50, height: 65 }} />
        <ListItemText 
          disableTypography
          primary={<Typography className="HouseName">Billy's House</Typography>}
        />
      </ListItem> */}
    </List>
  </Box>
);

export default Board;
