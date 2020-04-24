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
import { marketClick, calculateIsValidResourceToBuyMap } from '../../actions';

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
    isValidResourceToBuyMap,
    updateOpponentsStatsOnBackend,
    calculateIsValidResourceToBuyMap,
    isValidResourceToBuyMapCalculated,
    marketClick
}) => {
    console.log(secondaryOpponentsStats)
    console.log(tertiaryOpponentsStats)

    if (secondaryOpponentsStats != null && 
        tertiaryOpponentsStats != null && 
        !isValidResourceToBuyMapCalculated) {
        calculateIsValidResourceToBuyMap(
            secondaryOpponentsStats, 
            tertiaryOpponentsStats, 
            updateOpponentsStatsOnBackend
        );
    }

    const img_width = "14%";
    const img_height = img_width * 1.3;
    const classes = useStyles();

    return (
        <Box border={1} width="40%" marginLeft={5} marginTop={-2}>
            <List>
                <ListItem style={{ marginLeft: 5 }}>
                    <ListItemText
                        disableTypography
                        primary={<Typography classname="Market">Market</Typography>} 
                    />
                </ListItem>
                <ListItem style={{ marginTop: -2 }}>
                    <Tooltip 
                        title={
                            isValidResourceToBuyMap != null && isValidResourceToBuyMap["Brick"] ?
                                "Click to purchase brick" :
                                    "Do not have enough coins\nor brick is not available for purchase"
                        } 
                        classes={
                            isValidResourceToBuyMap != null && isValidResourceToBuyMap["Brick"] ?
                                { tooltip: classes.tooltipValid } :
                                    { tooltip: classes.tooltipInvalid }
                        }
                    >
                        <img 
                            src={brick} 
                            alt="" 
                            style={{ width: img_width, height: img_height }} 
                            onClick={() => marketClick("Brick", updateOpponentsStatsOnBackend)}
                        />
                    </Tooltip>

                    <Tooltip 
                        title={
                            isValidResourceToBuyMap != null && isValidResourceToBuyMap["Stick"] ?
                                "Click to purchase stick" :
                                    "Do not have enough coins\nor stick is not available for purchase"
                        } 
                        classes={
                            isValidResourceToBuyMap != null && isValidResourceToBuyMap["Stick"] ?
                                { tooltip: classes.tooltipValid } :
                                    { tooltip: classes.tooltipInvalid }
                        }
                    >
                        <img 
                            src={stick} 
                            alt="" 
                            style={{ width: img_width, height: img_height }} 
                            onClick={() => marketClick("Stick", updateOpponentsStatsOnBackend)}
                        />
                    </Tooltip>

                    <Tooltip 
                        title={
                            isValidResourceToBuyMap != null && isValidResourceToBuyMap["Mud"] ?
                                "Click to purchase mud" :
                                    "Do not have enough coins\nor mud is not available for purchase"
                        } 
                        classes={
                            isValidResourceToBuyMap != null && isValidResourceToBuyMap["Mud"] ?
                                { tooltip: classes.tooltipValid } :
                                    { tooltip: classes.tooltipInvalid }
                        }
                    >
                        <img 
                            src={mud} 
                            alt="" 
                            style={{ width: img_width, height: img_height }} 
                            onClick={() => marketClick("Mud", updateOpponentsStatsOnBackend)}
                        />
                    </Tooltip>

                    <Tooltip 
                        title={
                            isValidResourceToBuyMap != null && isValidResourceToBuyMap["Stone"] ?
                                "Click to purchase stone" :
                                    "Do not have enough coins\nor stone is not available for purchase"
                        } 
                        classes={
                            isValidResourceToBuyMap != null && isValidResourceToBuyMap["Stone"] ?
                                { tooltip: classes.tooltipValid } :
                                    { tooltip: classes.tooltipInvalid }
                        }
                    >
                        <img 
                            src={stone} 
                            alt="" 
                            style={{ width: img_width, height: img_height }} 
                            onClick={() => marketClick("Stone", updateOpponentsStatsOnBackend)}
                        />
                    </Tooltip>

                    <Tooltip 
                        title={
                            isValidResourceToBuyMap != null && isValidResourceToBuyMap["Water"] ?
                                "Click to purchase water" :
                                    "Do not have enough coins\nor water is not available for purchase"
                        } 
                        classes={
                            isValidResourceToBuyMap != null && isValidResourceToBuyMap["Water"] ?
                                { tooltip: classes.tooltipValid } :
                                { tooltip: classes.tooltipInvalid }
                        }
                    >
                        <img 
                            src={water} 
                            alt="" 
                            style={{ width: img_width, height: img_height }} 
                            onClick={() => marketClick("Water", updateOpponentsStatsOnBackend)}
                        />
                    </Tooltip>

                    <Tooltip 
                        title={
                            isValidResourceToBuyMap != null && isValidResourceToBuyMap["Apple"] ?
                                "Click to purchase apple" :
                                    "Do not have enough coins\nor apple is not available for purchase"
                        } 
                        classes={
                            isValidResourceToBuyMap != null && isValidResourceToBuyMap["Apple"] ?
                                { tooltip: classes.tooltipValid } :
                                    { tooltip: classes.tooltipInvalid }
                        }
                    >
                        <img 
                            src={apple} 
                            alt="" 
                            style={{ width: img_width, height: img_height }} 
                            onClick={() => marketClick("Apple", updateOpponentsStatsOnBackend)}
                        />
                    </Tooltip>

                    <Tooltip 
                        title={
                            isValidResourceToBuyMap != null && isValidResourceToBuyMap["Flower"] ?
                                "Click to purchase flower" :
                                    "Do not have enough coins\nor flower is not available for purchase"
                        } 
                        classes={
                            isValidResourceToBuyMap != null && isValidResourceToBuyMap["Flower"]  ?
                                { tooltip: classes.tooltipValid } :
                                    { tooltip: classes.tooltipInvalid }
                        }
                    >
                        <img 
                            src={flower} 
                            alt="" 
                            style={{ width: img_width, height: img_height }} 
                            onClick={() => marketClick("Flower", updateOpponentsStatsOnBackend)}
                        />
                    </Tooltip>
                </ListItem>
            </List>
        </Box>
    );
}

const mapDispatchToProps = {
    marketClick: marketClick,
    calculateIsValidResourceToBuyMap: calculateIsValidResourceToBuyMap
};

Market = connect(null, mapDispatchToProps)(Market);

const mapStateToProps = (state) => ({
    isValidResourceToBuyMap: state.isValidResourceToBuyMap,
    isValidResourceToBuyMapCalculated: state.isValidResourceToBuyMapCalculated
});

Market = connect(mapStateToProps, null)(Market);

export default Market;