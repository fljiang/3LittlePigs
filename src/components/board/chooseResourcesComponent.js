import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Fab, Box, Popover } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { Check } from '@material-ui/icons';

import stone from './../../img/icons/stone_icon.png';
import stick from './../../img/icons/stick_icon.png';
import brick from './../../img/icons/brick_icon.png';
import mud from './../../img/icons/mud_icon.png';
import slash from './../../img/icons/other/slash.png';

import { connect } from 'react-redux';
import { toggleShowSlashCardResources, switchResources } from '../../actions';

const useStyles = makeStyles(theme => ({
    fab: {
        width: "250px",
        height: "40px",
        marginLeft: "40px"
    }
  }));

let ChooseResources = ({ 
    height, 
    width,
    toggleShowSlashCardResources,
    showSlashCardResources,
    switchResources,
    updateStats,
    updateOpponentsStatsOnBackend,
    updatedResourceSlashCards = [],
    resourceSlashCards = []
}) => {
    const classes = useStyles();

    let resourceSlashImages = [];
    resourceSlashCards.forEach(function (item, index) {
        item.reward.forEach(function (rewardItem, rewardIndex) {
            if (rewardItem["Stone"] != null) {
                resourceSlashImages.push(
                    <img
                        src={stone}
                        alt=""
                        onClick={() => {
                            switchResources(item.description, "Stone", updateOpponentsStatsOnBackend)
                            updateStats()
                        }}
                        style={{ width: 50, height: 65 }}
                    />
                )
            } else if (rewardItem["Stick"] != null) {
                resourceSlashImages.push(
                    <img
                        src={stick}
                        alt=""
                        onClick={() => {
                            switchResources(item.description, "Stick", updateOpponentsStatsOnBackend)
                            updateStats()
                        }}
                        style={{ width: 50, height: 65 }}
                    />
                )
            } else if (rewardItem["Brick"] != null) {
                resourceSlashImages.push(
                    <img
                        src={brick}
                        alt=""
                        onClick={() => {
                            switchResources(item.description, "Brick", updateOpponentsStatsOnBackend)
                            updateStats()
                        }}
                        style={{ width: 50, height: 65 }}
                    />
                )
            } else if (rewardItem["Mud"] != null) {
                resourceSlashImages.push(
                    <img
                        src={mud}
                        alt=""
                        onClick={() => {
                            switchResources(item.description, "Mud", updateOpponentsStatsOnBackend)
                            updateStats()
                        }}
                        style={{ width: 50, height: 65 }}
                    />
                )
            }

            let left = 5;
            if (updatedResourceSlashCards.length > 0 &&
                updatedResourceSlashCards[index].reward[rewardIndex].selected === true) {
                    left = rewardIndex === 0 ? 5 : 95;
            }
            if (rewardItem.selected === true || 
                updatedResourceSlashCards[index].reward[rewardIndex].selected === true) {
                    resourceSlashImages.push(
                        <Check 
                            style={{ 
                                position: 'absolute', 
                                top: 13 + (index * 65), 
                                left: left, 
                                fontSize: 50, 
                                color: green[500] 
                            }}
                        />
                    )
            }

            if (rewardIndex === 0) {
                resourceSlashImages.push(
                    <img
                        src={slash}
                        alt=""
                        style={{ width: 50, height: 65 }}
                    />
                )
            }
        })
        resourceSlashImages.push(<br />)
    })

    return (
        <div>
            <Fab
                variant="extended"
                color="primary"
                onClick={() => toggleShowSlashCardResources()}
                className={classes.fab}
            >
                { showSlashCardResources ? "Hide Resource Options" : "Choose Resources" }
            </Fab>
            <Popover
                open={showSlashCardResources && resourceSlashImages.length !== 0}
                onClose={() => toggleShowSlashCardResources()}
                anchorPosition={{
                    top: (height - 65) / 2,
                    left: (width - 150) / 2
                }}
                anchorReference="anchorPosition"
            >
                <Box border={2}>
                    <div> 
                        { resourceSlashImages } 
                    </div>
                </Box>
            </Popover>
        </div>
    )
}

const mapDispatchToProps = {
    toggleShowSlashCardResources: toggleShowSlashCardResources,
    switchResources: switchResources
};

ChooseResources = connect(null, mapDispatchToProps)(ChooseResources);

const mapStateToProps = (state) => ({
    showSlashCardResources: state.showSlashCardResources,
    updatedResourceSlashCards: state.resourceSlashCards
});

ChooseResources = connect(mapStateToProps, null)(ChooseResources);

export default ChooseResources;
