import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Fab } from '@material-ui/core';
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

let CreateOrJoinGame = ({ width, height }) => {
    const classes = useStyles();

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

export default CreateOrJoinGame;