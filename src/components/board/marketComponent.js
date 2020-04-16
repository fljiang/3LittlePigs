import React from 'react';

import { Box, List, ListItem, ListItemText, Typography, Tooltip, makeStyles } from '@material-ui/core';
import brick from './../../img/icons/brick_icon.png';
import stick from './../../img/icons/stick_icon.png';
import stone from './../../img/icons/stone_icon.png';
import mud from './../../img/icons/mud_icon.png';
import water from './../../img/icons/water_icon.png';
import apple from './../../img/icons/apple_icon.png';
import flower from './../../img/icons/flower_icon.png';

const useStyles = makeStyles(theme => ({
  tooltipValid: {
      maxWidth: "130px",
      fontSize: "0.8em",
      color: "black",
      backgroundColor: "#3CB043"
  },
  tooltipInvalid: {
      maxWidth: "130px",
      fontSize: "0.8em",
      color: "white",
      backgroundColor: "#D0312D"
  }
}))

const Market = ({
  isValidResourceToBuyArray
}) => {
  img_width = (window.innerWidth * 0.35) / 7;
  img_height = img_width * 1.3;
  const classes = useStyles();
  return (
    <Box border={1} width="35%" marginLeft={5} marginTop={-2}>
      <List>
        <ListItem style={{ marginLeft: 5 }}>
          <ListItemText
            disableTypography
            primary={<Typography classname="Market">{"Market"}</Typography>} 
          />
        </ListItem>
        <ListItem style={{ marginTop: -2 }}>
          <Tooltip title={
            isValidResourceToBuyArray[0] ?
            "Click to purchase" :
            "Do not have enough coins\nor resource not owned by any other player"
          } classes={
            isValidResourceToBuyArray[0] ?
            { tooltip: classes.tooltipValid } :
            { tooltip: classes.tooltipInvalid }
          }>
            { <img src={ brick } alt="" style={{ width: img_width, height: img_height }} /> }
          </Tooltip>
          <img src={ stick } alt="" style={{ width: img_width, height: img_height }} />
          <img src={ mud } alt="" style={{ width: img_width, height: img_height }} />
          <img src={ stone } alt="" style={{ width: img_width, height: img_height }} />
          <img src={ water } alt="" style={{ width: img_width, height: img_height }} />
          <img src={ apple } alt="" style={{ width: img_width, height: img_height }} />
          <img src={ flower } alt="" style={{ width: img_width, height: img_height }} />
        </ListItem>
      </List>
    </Box>
  );
}
  
export default Market;