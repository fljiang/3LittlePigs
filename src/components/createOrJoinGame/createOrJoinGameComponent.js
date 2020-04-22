import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Fab, Typography, TextField } from '@material-ui/core';
import { green, blue } from '@material-ui/core/colors';

import { connect } from 'react-redux';
import { setGameToJoin } from '../../actions';

const useStyles = makeStyles(theme => ({
    fab: {
        width: "250px",
        height: "40px",
        marginTop: "10px",
        marginBottom: "10px"
    },
    greenFab: {
        color: theme.palette.common.white,
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[600],
        }
    },
    blueFab: {
        width: "250px",
        height: "40px",
        marginTop: "10px",
        marginBottom: "10px",
        color: theme.palette.common.white,
        backgroundColor: blue[500],
        '&:hover': {
            backgroundColor: blue[600],
        }
    }
}))

let CreateOrJoinGame = ({ 
    width, 
    height, 
    gameCode, 
    startGame, 
    joinGame, 
    launchGameBoard,
    setGameToJoin,
    gameToJoin = false
}) => {
    const classes = useStyles();

    if (gameCode != null && !gameToJoin) {
        return (
            <div style={{
                alignItems: 'center',
                justifyContent: 'center',
                height: height,
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <Typography style={{ marginBottom: 5, fontSize: 18 }}>
                    Game Code: { gameCode }
                </Typography>
                <Fab
                    variant="extended"
                    color="inherit"
                    className={classes.fab, classes.greenFab}
                    onClick={() => launchGameBoard()}
                > 
                    Launch Game Board
                </Fab>  
            </div>
        )
    } else if (gameToJoin) {
        return (
            <div style={{
                alignItems: 'center',
                justifyContent: 'center',
                height: height,
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <Typography style={{ marginBottom: 5 }}>
                    Enter game code below:
                </Typography>
                <TextField 
                    style={{ marginBottom: 10 }}
                    onChange={(event) => gameCode = event.target.value} 
                />
                <Fab
                    variant="extended"
                    color="inherit"
                    className={classes.fab, classes.greenFab}
                    onClick={() => joinGame(gameCode)}
                > 
                    Join Game
                </Fab>  
            </div>
        )
    } else {
        return (
            <div style={{ 
                position: 'absolute', 
                left: (width - 250) / 2, 
                top: (height - 120) / 2,
                display: 'flex',
                flexDirection: 'column'
            }}>
                <Fab
                    variant="extended"
                    color="inherit"
                    className={classes.fab, classes.blueFab}
                    onClick={() => startGame()}
                > 
                    Create New Game
                </Fab>   
                <Fab
                    variant="extended"
                    color="inherit"
                    className={classes.fab, classes.greenFab}
                    onClick={() => setGameToJoin()}
                > 
                    Join Existing Game
                </Fab>      
            </div>
        )
    }
}

const mapDispatchToProps = {
    setGameToJoin: setGameToJoin
};

CreateOrJoinGame = connect(null, mapDispatchToProps)(CreateOrJoinGame);

const mapStateToProps = (state) => ({
    gameToJoin: state.gameToJoin
});

CreateOrJoinGame = connect(mapStateToProps, null)(CreateOrJoinGame);

export default CreateOrJoinGame;