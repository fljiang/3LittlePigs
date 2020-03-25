import React from 'react';
import { makeStyles } from "@material-ui/core/styles";

import brick from './../../img/cards/brick.png';
import brick_2 from './../../img/cards/brick_2.png';
import stick from './../../img/cards/stick.png';
import stick_2 from './../../img//cards/stick_2.png';
import stone from './../../img/cards/stone.png';
import stone_2 from './../../img/cards/stone_2.png';
import water from './../../img/cards/water.png' // needs 2
import stone_or_stick from './../../img/cards/stone_or_stick.png';
import mud from './../../img/cards/mud.png';
import wolf_brick from './../../img/cards/wolf_brick.png';
import wolf_stick from './../../img/cards/wolf_stick.png';
import wolf_stone from './../../img/cards/wolf_stone.png';
import glass from './../../img/cards/glass.png';
import vp_2 from './../../img/cards/vp_2.png';

// brick => clay
// stick => lumber
// stone => stone
// water => ore

// metal => press
// grass => loom
// mud => glass

// glass => apothecary
// spoon => scriptorium
// pot => workshop

const useStyles = makeStyles(theme => ({
    img: {
        width: "110px",
        height: "190px",
        marginLeft: "5px",
        marginRight: "5px"
    }
}))

const Card = ({ cardInfo }) => {
    const classes = useStyles();

    if (cardInfo.description == "Stick") {
        return <img src={stick} className={classes.img} />
    } else if (cardInfo.description == "Stone") {
        return <img src={stone} className={classes.img} />
    } else if (cardInfo.description == "Brick") {
        return <img src={brick} className={classes.img} />
    } else if (cardInfo.description == "Mud") {
        return <img src={mud} className={classes.img} />
    } else if (cardInfo.description == "Stone_Stick") {
        return <img src={stone_or_stick} className={classes.img} />
    } else if (cardInfo.description == "Water") {
        return <img src={water} className={classes.img} />
    } else if (cardInfo.description == "Wolf_Stick") {
        return <img src={wolf_stick} className={classes.img} />
    } else if (cardInfo.description == "Wolf_Brick") {
        return <img src={wolf_brick} className={classes.img} />
    } else {
        return <img src={glass} className={classes.img} />
    }
}

export default Card;