import React from 'react';
import { CardMedia } from '@material-ui/core';

import brick from './../../img/brick.png';
import brick_2 from './../../img/brick_2.png';
import stick from './../../img/stick.png';
import stick_2 from './../../img/stick_2.png';
import stone from './../../img/stone.png';
import stone_2 from './../../img/stone_2.png';
import water from './../../img/water.png' // needs 2
import stone_or_stick from './../../img/stone_or_stick.png';
import mud from './../../img/mud.png';
import wolf_brick from './../../img/wolf_brick.png'; // needs all 3
import glass from './../../img/glass.png';

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

const Card = () => (
    <img src={brick_2} width="110" height="190" />
)

export default Card;