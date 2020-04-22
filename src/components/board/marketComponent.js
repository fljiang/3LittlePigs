import React from 'react';

import { Box, List, ListItem, ListItemText, Typography, Tooltip, makeStyles } from '@material-ui/core';
import brick from './../../img/icons/brick_icon.png';
import stick from './../../img/icons/stick_icon.png';
import stone from './../../img/icons/stone_icon.png';
import mud from './../../img/icons/mud_icon.png';
import water from './../../img/icons/water_icon.png';
import apple from './../../img/icons/apple_icon.png';
import flower from './../../img/icons/flower_icon.png';

import { connect } from 'react-redux';
import { marketClick } from '../../actions';

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

let Market = ({
    secondaryOpponentsStats,
    tertiaryOpponentsStats,
    updateOpponentsStatsOnBackend,
    stats,
    marketDemandMap,
    statsReRendered,
    marketClick
}) => {

    stats = stats ? stats : secondaryOpponentsStats;
    let marketSupplyMap = new Map();
    let isValidResourceToBuyMap = new Map();
    const resourceList = ["Brick", "Stick", "Mud", "Stone", "Water", "Apple", "Flower"];

    resourceList.map(resource => {
        marketSupplyMap[resource] = secondaryOpponentsStats[resource] + tertiaryOpponentsStats[resource];
    });

    resourceList.map(resource => {
        isValidResourceToBuyMap[resource] = (stats["Coin"] > 2 && marketSupplyMap[resource] && marketSupplyMap[resource] > marketDemandMap[resource]) ? true : false;
    });

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
                        isValidResourceToBuyMap["Brick"] ?
                        "Click to purchase brick" :
                        "Do not have enough coins\nor sticks not available for purchase"
                    } classes={
                        isValidResourceToBuyMap["Brick"] ?
                        { tooltip: classes.tooltipValid} :
                        { tooltip: classes.tooltipInvalid }
                    }>
                        {<img 
                            src={brick} 
                            alt="" 
                            style={{ width: img_width, height: img_height }} 
                            onClick={() => isValidResourceToBuyMap["Brick"] ? marketClick("Brick", secondaryOpponentsStats["Brick"] ? true : false, tertiaryOpponentsStats["Brick"] ? true : false, updateOpponentsStatsOnBackend) : null} />}
                    </Tooltip>

                    <Tooltip title={
                        isValidResourceToBuyMap["Stick"] ?
                        "Click to purchase stick" :
                        "Do not have enough coins\nor sticks not available for purchase"
                    } classes={
                        isValidResourceToBuyMap["Stick"] ?
                        { tooltip: classes.tooltipValid } :
                        { tooltip: classes.tooltipInvalid }
                    }>
                        {<img 
                            src={stick} 
                            alt="" 
                            style={{ width: img_width, height: img_height }} 
                            onClick={() => isValidResourceToBuyMap["Stick"] ? marketClick("Stick", secondaryOpponentsStats["Stick"] ? true : false, tertiaryOpponentsStats["Stick"] ? true : false, updateOpponentsStatsOnBackend) : null} />}
                    </Tooltip>

                    <Tooltip title={
                        isValidResourceToBuyMap["Mud"] ?
                        "Click to purchase mud" :
                        "Do not have enough coins\nor mud not available for purchase"
                    } classes={
                        isValidResourceToBuyMap["Mud"] ?
                        { tooltip: classes.tooltipValid } :
                        { tooltip: classes.tooltipInvalid }
                    }>
                        {<img 
                            src={mud} 
                            alt="" 
                            style={{ width: img_width, height: img_height }} 
                            onClick={() => isValidResourceToBuyMap["Mud"] ? marketClick("Mud", secondaryOpponentsStats["Mud"] ? true : false, tertiaryOpponentsStats["Mud"] ? true : false, updateOpponentsStatsOnBackend) : null} />}
                    </Tooltip>

                    <Tooltip title={
                        isValidResourceToBuyMap["Stone"] ?
                        "Click to purchase stone" :
                        "Do not have enough coins\nor stones not available for purchase"
                    } classes={
                        isValidResourceToBuyMap["Stone"] ?
                        { tooltip: classes.tooltipValid } :
                        { tooltip: classes.tooltipInvalid }
                    }>
                        {<img 
                            src={stone} 
                            alt="" 
                            style={{ width: img_width, height: img_height }} 
                            onClick={() => isValidResourceToBuyMap["Stone"] ? marketClick("Stone", secondaryOpponentsStats["Stone"] ? true : false, tertiaryOpponentsStats["Stone"] ? true : false, updateOpponentsStatsOnBackend) : null} />}
                    </Tooltip>

                    <Tooltip title={
                        isValidResourceToBuyMap["Water"] ?
                        "Click to purchase water" :
                        "Do not have enough coins\nor water not available for purchase"
                    } classes={
                        isValidResourceToBuyMap["Water"] ?
                        { tooltip: classes.tooltipValid } :
                        { tooltip: classes.tooltipInvalid }
                    }>
                        {<img 
                            src={water} 
                            alt="" 
                            style={{ width: img_width, height: img_height }} 
                            onClick={() => isValidResourceToBuyMap["Water"] ? marketClick("Water", secondaryOpponentsStats["Water"] ? true : false, tertiaryOpponentsStats["Water"] ? true : false, updateOpponentsStatsOnBackend) : null} />}
                    </Tooltip>

                    <Tooltip title={
                        isValidResourceToBuyMap["Apple"] ?
                        "Click to purchase apple" :
                        "Do not have enough coins\nor apples not available for purchase"
                    } classes={
                        isValidResourceToBuyMap["Apple"] ?
                        { tooltip: classes.tooltipValid } :
                        { tooltip: classes.tooltipInvalid }
                    }>
                        {<img 
                            src={apple} 
                            alt="" 
                            style={{ width: img_width, height: img_height }} 
                            onClick={() => isValidResourceToBuyMap["Apple"] ? marketClick("Apple", secondaryOpponentsStats["Apple"] ? true : false, tertiaryOpponentsStats["Apple"] ? true : false, updateOpponentsStatsOnBackend) : null} />}
                    </Tooltip>

                    <Tooltip title={
                        isValidResourceToBuyMap["Flower"] ?
                        "Click to purchase flower" :
                        "Do not have enough coins\nor flowers not available for purchase"
                    } classes={
                        isValidResourceToBuyMap["Flower"]  ?
                        { tooltip: classes.tooltipValid } :
                        { tooltip: classes.tooltipInvalid }
                    }>
                        {<img 
                            src={flower} 
                            alt="" 
                            style={{ width: img_width, height: img_height }} 
                            onClick={() => isValidResourceToBuyMap["Flower"] ? marketClick("Flower", secondaryOpponentsStats["Flower"] ? true : false, tertiaryOpponentsStats["Flower"] ? true : false, updateOpponentsStatsOnBackend) : null} />}
                    </Tooltip>
                </ListItem>
            </List>
        </Box>
    );
}

const mapDispatchToProps = {
    marketClick: marketClick
};

Market = connect(null, mapDispatchToProps)(Market);

const mapStateToProps = (state) => ({
    stats: state.stats,
    marketDemandMap: state.marketDemandMap,
    statsReRendered: state.statsReRendered
});

Market = connect(mapStateToProps, null)(Market);

export default Market;