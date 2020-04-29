import React from 'react';

import { makeStyles } from "@material-ui/core/styles";
import { Fab } from '@material-ui/core';

import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
    fab: {
        width: "200px",
        height: "60px",
        marginLeft: "5px"
    }
  }))

let ChooseOpponent = () => {
    const classes = useStyles();

    return (
        <Fab
            variant="extended"
            color="primary"
            className={classes.fab}
        >
            Buy Resource from This Opponent
        </Fab>
    )
}

export default ChooseOpponent;