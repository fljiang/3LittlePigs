import React from 'react';
import { makeStyles } from "@material-ui/core/styles";

import brick from './../../img/cards/brick.png';
import stick from './../../img/cards/stick.png';
import stone from './../../img/cards/stone.png';
import water from './../../img/cards/water.png'
import stone_or_stick from './../../img/cards/stone_or_stick.png';
import mud from './../../img/cards/mud.png';
import wolf_brick from './../../img/cards/wolf_brick.png';
import wolf_stick from './../../img/cards/wolf_stick.png';
import apple from './../../img/cards/apple.png';
import flower from './../../img/cards/flower.png';
import glass_flower from './../../img/cards/glass_flower.png';
import pot_water from './../../img/cards/pot_water.png';
import spoon_apple from './../../img/cards/spoon_apple.png';
import brick_or_mud from './../../img/cards/brick_or_mud.png';

import { Tooltip } from '@material-ui/core';

import { connect } from 'react-redux';
import { canBuyCard } from '../../actions';
import { bindActionCreators } from '../../../../../Library/Caches/typescript/3.6/node_modules/redux';

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
    },
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

let Card = ({ 
    cardInfo,
    cardIndex,
    canBuyCard,
    isValidCardToBuyArray
 }) => {
    canBuyCard(cardInfo.cost, cardIndex);

    const classes = useStyles();
    let cardImage;

    if (cardInfo.description === "Stick") {
        cardImage = <img src={stick} className={classes.img} alt="" />
    } else if (cardInfo.description === "Stone") {
        cardImage = <img src={stone} className={classes.img} alt="" />
    } else if (cardInfo.description === "Brick") {
        cardImage = <img src={brick} className={classes.img} alt="" />
    } else if (cardInfo.description === "Mud") {
        cardImage = <img src={mud} className={classes.img} alt="" />
    } else if (cardInfo.description === "Stone_Stick") {
        cardImage = <img src={stone_or_stick} className={classes.img} alt="" />
    } else if (cardInfo.description === "Water") {
        cardImage = <img src={water} className={classes.img} alt="" />
    } else if (cardInfo.description === "Wolf_Stick") {
        cardImage = <img src={wolf_stick} className={classes.img} alt="" />
    } else if (cardInfo.description === "Wolf_Brick") {
        cardImage = <img src={wolf_brick} className={classes.img} alt="" />
    } else if (cardInfo.description === "Flower") {
        cardImage = <img src={flower} className={classes.img} alt="" />
    } else if (cardInfo.description === "Apple") {
        cardImage = <img src={apple} className={classes.img} alt="" />
    } else if (cardInfo.description === "Glass_Flower") {
        cardImage = <img src={glass_flower} className={classes.img} alt="" />
    } else if (cardInfo.description === "Pot_Water") {
        cardImage = <img src={pot_water} className={classes.img} alt="" />
    } else if (cardInfo.description === "Spoon_Apple") {
        cardImage = <img src={spoon_apple} className={classes.img} alt="" />
    } else if (cardInfo.description === "Brick_Mud") {
        cardImage = <img src={brick_or_mud} className={classes.img} alt="" />
    }

    return (
        <Tooltip title={
            isValidCardToBuyArray[cardIndex] ? 
            "Click card to purchase" : 
            "Do not have enough resources\nor coins to purchase card"
        } classes={
            isValidCardToBuyArray[cardIndex] ?
            { tooltip: classes.tooltipValid } :
            { tooltip: classes.tooltipInvalid }
        }>
            {cardImage}
        </Tooltip>
    )
}

const mapDispatchToProps = (dispatch) => 
    bindActionCreators({ canBuyCard }, dispatch);

Card = connect(null, mapDispatchToProps)(Card);

const mapStateToProps = (state) => ({
    isValidCardToBuyArray: state.isValidCardToBuyArray,
})

Card = connect(mapStateToProps, null)(Card);

export default Card;