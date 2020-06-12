import React, { useState } from 'react';
import { Fab, Typography, TextField } from '@material-ui/core';
import './createOrJoinGameComponent.css';

import { useDispatch, useSelector } from 'react-redux';

// TODO: Determine whether or not need to convert CreateOrJoinGame into a function
let CreateOrJoinGame = () => {
    const dispatch = useDispatch();

    const [gameCode, setGameCode] = useState("");

    const joinedGame = useSelector(state => state.joinedGame);

    if (!joinedGame) {
        return (
            <div className="LaunchGameModalContainer" height={height}>
                <Typography className="GameCodeDisplay">
                    Enter game code below:
                </Typography>
                <TextField className="GameCodeInput"
                    onChange={(event) => setGameCode(event.target.value)}
                />
                <Fab
                    variant="extended"
                    color="inherit"
                    className="JoinGameFab"
                    onClick={() => {}}
                >
                    Join Game
                </Fab>
            </div>
        )
    }

    if (gameCode != "") {
        return (
            <div className="LaunchGameModalContainer" height={height}>
                <Typography className="GameCodeDisplay">
                    Game Code: { gameCode }
                </Typography>
                <Fab
                    variant="extended"
                    color="inherit"
                    className="JoinGameFab"
                    onClick={() => {}}
                >
                    Launch Game Board
                </Fab>
            </div>
        )
    }
   
    return (
        <div className="CreateOrJoinGameModalContainer">
            <Fab 
                variant="extended"
                color="inherit"
                className="CreateGameFab"
                onClick={() => dispatch(createGame())}
            >
                Create New Game
            </Fab>
            <Fab 
                variant="extended"
                color="inherit"
                className="JoinGameFab"
                // onClick={() => dispatch(joinGame(gameCode))}
            >
                Join Existing Game
            </Fab>
        </div>
    )
}

export default CreateOrJoinGame;