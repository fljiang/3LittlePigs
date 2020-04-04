import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Fab from '@material-ui/core/Fab';

import Card from './cardComponent.js';
import './cardComponent.css';

import { connect } from 'react-redux';
import { pass, chooseCard } from '../../actions';

const useStyles = makeStyles(theme => ({
    fab: {
        width: "80px",
        height: "80px",
        borderRadius: "50%",
        marginLeft: "5px",
        backgroundColor: "#111E6C"
    },
    fabRevealCards: {
        width: "300px",
        height: "40px"
    }
}))

let Cards = ({
    cards,
    pass,
    chooseCard,
    cardChosen,
    updateStats
}) => {
    const classes = useStyles();

    if (!cardChosen) {
        return (
            <div className="cards-wrapper">
                <Card cardInfo={cards[0]} cardIndex={0} 
                    cardClick={() => {
                        chooseCard(cards[0].cost, 0)
                        updateStats()
                     }} />
                <Card cardInfo={cards[1]} cardIndex={1} 
                    cardClick={() => {
                        chooseCard(cards[1].cost, 1)
                        updateStats()
                    }} />
                <Card cardInfo={cards[2]} cardIndex={2} 
                    cardClick={() => {
                        chooseCard(cards[2].cost, 2)
                        updateStats()
                    }} />
                <Card cardInfo={cards[3]} cardIndex={3} 
                    cardClick={() => {
                        chooseCard(cards[3].cost, 3)
                        updateStats()
                    }} />
                <Card cardInfo={cards[4]} cardIndex={4} 
                    cardClick={() => {
                        chooseCard(cards[4].cost, 4)
                        updateStats()
                    }} />
                {/* <Card cardInfo={cards[5]} cardIndex={5} />
                <Card cardInfo={cards[6]} cardIndex={6} /> */}

                <Fab 
                    variant="extended" 
                    color="primary"
                    onClick={() => {
                        pass()
                        updateStats()
                    }}
                    className={classes.fab}>
                        Pass
                </Fab>
            </div>
        );
    } else {
        return (
            <div className="reveal-cards-button-wrapper">
                <Fab 
                    variant="extended" 
                    color="primary"
                    className={classes.fabRevealCards}>
                        Reveal Opponents' Cards
                </Fab>
            </div>
        )
    }
}

const mapDispatchToProps = {
    pass: pass,
    chooseCard: chooseCard,
};

Cards = connect(null, mapDispatchToProps)(Cards);

const mapStateToProps = (state) => ({
    cardChosen: state.cardChosen,
})

Cards = connect(mapStateToProps, null)(Cards);

export default Cards;