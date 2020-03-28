import React from 'react';
import { makeStyles } from "@material-ui/core/styles";

import brick from './../../img/cards/brick.png';
import stick from './../../img/cards/stick.png';
import stone from './../../img/cards/stone.png';
import water from './../../img/cards/water.png' // needs 2
import stone_or_stick from './../../img/cards/stone_or_stick.png';
import mud from './../../img/cards/mud.png';
import wolf_brick from './../../img/cards/wolf_brick.png';
import wolf_stick from './../../img/cards/wolf_stick.png';
import glass from './../../img/cards/glass.png';
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
    }
}))

let Card = ({ 
    cardInfo,
    cardIndex,
    canBuyCard,
    isValidCardToBuyArray
 }) => {
    canBuyCard(cardInfo.cost, cardIndex);
    console.log(isValidCardToBuyArray);

    const classes = useStyles();
    let cardImage;

    if (cardInfo.description === "Stick") {
        cardImage = <img src={stick} className={classes.img} alt="stick card" />
    } else if (cardInfo.description === "Stone") {
        cardImage = <img src={stone} className={classes.img} alt="stone card" />
    } else if (cardInfo.description === "Brick") {
        cardImage = <img src={brick} className={classes.img} alt="brick card" />
    } else if (cardInfo.description === "Mud") {
        cardImage = <img src={mud} className={classes.img} alt="mud card" />
    } else if (cardInfo.description === "Stone_Stick") {
        cardImage = <img src={stone_or_stick} className={classes.img} alt="coin for stone or stick card" />
    } else if (cardInfo.description === "Water") {
        cardImage = <img src={water} className={classes.img} alt="water card" />
    } else if (cardInfo.description === "Wolf_Stick") {
        cardImage = <img src={wolf_stick} className={classes.img} alt="stick for wolf card" />
    } else if (cardInfo.description === "Wolf_Brick") {
        cardImage = <img src={wolf_brick} className={classes.img} alt="brick for wolf card" />
    } else {
        cardImage = <img src={glass} className={classes.img} alt="glass card" />
    }

    return (
        <Tooltip title={
            isValidCardToBuyArray[cardIndex] ? 
            "Click card to purchase" : 
            "Do not have enough resources\nor coins to purchase card"
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