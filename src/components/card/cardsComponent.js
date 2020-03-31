import React from 'react';

import Card from './cardComponent.js';
import './cardComponent.css';

const Cards = ({cards}) => (
    <div className="cards-wrapper">
        <Card cardInfo={cards[0]} cardIndex={0} />
        <Card cardInfo={cards[1]} cardIndex={1} />
        <Card cardInfo={cards[2]} cardIndex={2} />
        <Card cardInfo={cards[3]} cardIndex={3} />
        {/* <Card cardInfo={cards[4]} cardIndex={4} />
        <Card cardInfo={cards[5]} cardIndex={5} />
        <Card cardInfo={cards[6]} cardIndex={6} /> */}
    </div>
);

export default Cards;