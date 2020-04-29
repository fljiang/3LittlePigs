import React from 'react';

import { makeStyles } from "@material-ui/core/styles";
import { Fab } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    fab: {
        width: "200px",
        height: "70px",
        marginLeft: "5px"
    }
  }))

let ChooseOpponent = ({ 
    chooseOpponentToBuyFromClick
}) => {
    const classes = useStyles();

    return (
        <Fab
            variant="extended"
            color="primary"
            className={classes.fab}
            onClick={() => chooseOpponentToBuyFromClick()}
        >
            Buy Resource from This Opponent
        </Fab>
    )
}

export default ChooseOpponent;