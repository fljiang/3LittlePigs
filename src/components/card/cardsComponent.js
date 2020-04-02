import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Fab from '@material-ui/core/Fab';

import Card from './cardComponent.js';
import './cardComponent.css';

const useStyles = makeStyles(theme => ({
    fab: {
        width: "80px",
        height: "80px",
        borderRadius: "50%",
        marginLeft: "5px",
        backgroundColor: "#111E6C"
    }
}))

const Cards = ({cards}) => {
    const classes = useStyles();

    return (
        <div className="cards-wrapper">
            <Card cardInfo={cards[0]} cardIndex={0} />
            <Card cardInfo={cards[1]} cardIndex={1} />
            <Card cardInfo={cards[2]} cardIndex={2} />
            <Card cardInfo={cards[3]} cardIndex={3} />
            <Card cardInfo={cards[4]} cardIndex={4} />
            {/* <Card cardInfo={cards[5]} cardIndex={5} />
            <Card cardInfo={cards[6]} cardIndex={6} /> */}

            <Fab 
                variant="extended" 
                color="primary"
                className={classes.fab}>
                    Pass
            </Fab>
        </div>
    );
}

export default Cards;