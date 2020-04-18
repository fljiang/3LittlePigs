import React from 'react';

import { Box, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import brick from './../../img/icons/brick_icon.png';
import stick from './../../img/icons/stick_icon.png';
import mud from './../../img/icons/mud_icon.png';
import vp_3 from './../../img/board/vp_3.png';
import vp_5 from './../../img/board/vp_5.png';
import vp_7 from './../../img/board/vp_7.png';
import './boardComponent.css';

import Market from './marketComponent';
import ChooseResources from './chooseResourcesComponent';

import { connect } from 'react-redux';

const renderStats = {"Coin": 0, "Brick": 0, "Stick": 0, "Mud": 0, "Stone": 0, "Water": 0, "Apple": 0, "Flower": 0};

let Board = ({ 
    title, 
    resource, 
    firstPlayer, 
    resourceSlashCards, 
    height, 
    width,
    updateStats,
    updateOpponentsStatsOnBackend,
    stats
}) => {
    console.log(stats);
    return (
        <Box border={1} width="60%" 
            marginRight={firstPlayer ? "39px" : "0px"}
            marginLeft={firstPlayer ? "25px": "0px" }
        >
            <List>
                <ListItem style={{ marginTop: 8 }}>
                    <img 
                        src={resource === "Brick" ? brick : (resource === "Stick" ? stick : mud)} 
                        alt="" 
                        style={{ width: 100, height: 130 }}
                    />
                    { firstPlayer ? 
                        <ChooseResources 
                            height={height} 
                            width={width} 
                            resourceSlashCards={resourceSlashCards} 
                            updateStats={updateStats}
                            updateOpponentsStatsOnBackend={updateOpponentsStatsOnBackend}
                        /> : null 
                    }
                    { firstPlayer ? 
                        <Market stats={stats ? stats : renderStats} /> 
                        : null 
                    }
                    <ListItemText 
                        disableTypography
                        primary={<Typography className="HouseName">{title}</Typography>}
                    />
                </ListItem>

                <ListItem style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <img src={vp_3} alt="" style={{ width: 130, height: 100 }} />
                    <img src={vp_5} alt="" style={{ width: 130, height: 100 }} />
                    <img src={vp_7} alt="" style={{ width: 130, height: 100 }} />
                </ListItem>
            </List>
        </Box>
    );
}

const mapStateToProps = (state) => ({
    stats: state.stats
});

Board = connect(mapStateToProps, null)(Board);

export default Board;
