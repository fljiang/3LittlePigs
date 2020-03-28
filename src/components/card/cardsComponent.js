import React from 'react';

import Card from './cardComponent.js';
import './cardComponent.css';

const Cards = ({cards}) => (
    <div className="cards-wrapper">
        <Card cardInfo={cards[0]}/>
        <Card cardInfo={cards[1]}/>
        <Card cardInfo={cards[2]}/>
        <Card cardInfo={cards[3]}/>
        <Card cardInfo={cards[4]}/>
        <Card cardInfo={cards[5]}/>
       <Card cardInfo={cards[6]}/>
    </div>
);

export default Cards;