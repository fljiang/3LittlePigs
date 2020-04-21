import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Fab, Typography } from '@material-ui/core';
import { green, blue } from '@material-ui/core/colors';

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

let CreateOrJoinGame = ({ width, height, gameCode, startGame, launchGameBoard }) => {
    const classes = useStyles();

    if (gameCode != null) {
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
                > 
                    Join Existing Game
                </Fab>      
            </div>
        )
    }
}

export default CreateOrJoinGame;