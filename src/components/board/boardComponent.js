import React from 'react';
import { Box, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import brick from './../../img/icons/brick_icon.png';
import vp_3 from './../../img/board/vp_3.png';
import vp_5 from './../../img/board/vp_5.png';
import vp_7 from './../../img/board/vp_7.png';
import './boardComponent.css';

const Board = ({ }) => (
  <Box border={1} width="90%">
    <List>
      <ListItem>
        <img src={brick} alt="" style={{ width: 100, height: 130 }} />
        <ListItemText 
          disableTypography
          primary={<Typography className="HouseName">Billy's House</Typography>}
        />
      </ListItem>

      <ListItem>
        <img src={vp_3} alt="" style={{ width: 130, height: 100 }} />
        <img src={vp_5} alt="" style={{ width: 130, height: 100 }} />
        <img src={vp_7} alt="" style={{ width: 130, height: 100 }} />
      </ListItem>
    </List>
  </Box>
);

export default Board;
