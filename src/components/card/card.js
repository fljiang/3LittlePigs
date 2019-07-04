import brick from './../../img/brick.png';
import brick_2 from './../../img/brick_2.png';
import stick from './../../img/stick.png';
import stick_2 from './../../img/stick._2png';
import stone from './../../img/stone.png';
import stone_2 from './../../img/stone_2.png';
import stone_or_stick from './../../img/stone_or_stick.png';
import mud from './../../img/mud.png';
import water from './../../img/water.png'
import wolf from './../../img/wolf.png';
import glass from './../../img/glass.png';

phase1Cards = 20;

class Card {
    constructor(cardType, cost, reward, phase, image = None) {
        this.cardType = cardType // Resource, Appliance, Wolf, VP, Coins
        this.cost = cost // Cost object
        this.reward = reward // Array of str 
        this.phase = phase // 1, 2, 3
        this.image = image // Path
    }
}

class Inventory {
    constructor(resource = None, resource_amt = None, coin_amt = None) {
        this.resource = resource // Array of str, HASH ME PLS
        this.resource_amt = resource_amt // Array of int, HASH ME PLS
        this.coin_amt = coin_amt // Int
    }
}

brick_card = Card("Resource", Inventory(), Inventory(["Brick"], [1]), 1);
brick_2_card = Card("Resource", Inventory([], [], 1), Inventory(["Brick"], [2]));