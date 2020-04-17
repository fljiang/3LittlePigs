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
  // const img_width = (width * 0.35) / 7;
  const img_width = "14%";
  const img_height = img_width * 1.3;
  const classes = useStyles();
  return (
    <Box border={1} width="40%" marginLeft={5} marginTop={-2}>
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
            "Click to purchase brick" :
            "Do not have enough coins\nor sticks not available for purchase"
          } classes={
            isValidResourceToBuyArray[0] ?
            { tooltip: classes.tooltipValid } :
            { tooltip: classes.tooltipInvalid }
          }>
            { <img src={ brick } alt="" style={{ width: img_width, height: img_height }} /> }
          </Tooltip>

          <Tooltip title={
            isValidResourceToBuyArray[1] ?
            "Click to purchase stick" :
            "Do not have enough coins\nor sticks not available for purchase"
          } classes={
            isValidResourceToBuyArray[1] ?
            { tooltip: classes.tooltipValid } :
            { tooltip: classes.tooltipInvalid }
          }>
            { <img src={ stick } alt="" style={{ width: img_width, height: img_height }} /> }
          </Tooltip>

          <Tooltip title={
            isValidResourceToBuyArray[2] ?
            "Click to purchase stick" :
            "Do not have enough coins\nor mud not available for purchase"
          } classes={
            isValidResourceToBuyArray[2] ?
            { tooltip: classes.tooltipValid } :
            { tooltip: classes.tooltipInvalid }
          }>
            { <img src={ mud } alt="" style={{ width: img_width, height: img_height }} /> }
          </Tooltip>

          <Tooltip title={
            isValidResourceToBuyArray[3] ?
            "Click to purchase stone" :
            "Do not have enough coins\nor stones not available for purchase"
          } classes={
            isValidResourceToBuyArray[3] ?
            { tooltip: classes.tooltipValid } :
            { tooltip: classes.tooltipInvalid }
          }>
            { <img src={ stone } alt="" style={{ width: img_width, height: img_height }} /> }
          </Tooltip>

          <Tooltip title={
            isValidResourceToBuyArray[4] ?
            "Click to purchase water" :
            "Do not have enough coins\nor water not available for purchase"
          } classes={
            isValidResourceToBuyArray[4] ?
            { tooltip: classes.tooltipValid } :
            { tooltip: classes.tooltipInvalid }
          }>
            { <img src={ water } alt="" style={{ width: img_width, height: img_height }} /> }
          </Tooltip>

          <Tooltip title={
            isValidResourceToBuyArray[5] ?
            "Click to purchase apple" :
            "Do not have enough coins\nor apples not available for purchase"
          } classes={
            isValidResourceToBuyArray[5] ?
            { tooltip: classes.tooltipValid } :
            { tooltip: classes.tooltipInvalid }
          }>
            { <img src={ apple } alt="" style={{ width: img_width, height: img_height }} /> }
          </Tooltip>

          <Tooltip title={
            isValidResourceToBuyArray[6] ?
            "Click to purchase flower" :
            "Do not have enough coins\nor flowers not available for purchase"
          } classes={
            isValidResourceToBuyArray[6] ?
            { tooltip: classes.tooltipValid } :
            { tooltip: classes.tooltipInvalid }
          }>
            { <img src={ flower } alt="" style={{ width: img_width, height: img_height }} /> }
          </Tooltip>
        </ListItem>
      </List>
    </Box>
  );
}
  
export default Market;