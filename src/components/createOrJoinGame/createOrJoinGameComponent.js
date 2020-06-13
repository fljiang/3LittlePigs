import React, { useState } from 'react';
import { Fab, Typography, TextField } from '@material-ui/core';
import './createOrJoinGameComponent.css';

import { useDispatch, useSelector } from 'react-redux';

let CreateOrJoinGame = ({height, socket }) => {
    const dispatch = useDispatch();

    const [gameCode, setGameCode] = useState("");

    const inGame = useSelector(state => state.inGame);

    if (inGame != null && !inGame) {
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
                    onClick={() => dispatch(lanchGame(socket, gameCode))}
                >
                    Join Game
                </Fab>
            </div>
        )
    }

    if (expectingGameCode != null && !expectingGameCode) {
        return (
            <div className="LaunchGameModalContainer" height={height}>
                <Typography className="GameCodeDisplay">
                    Game Code: { gameCode }
                </Typography>
                <Fab
                    variant="extended"
                    color="inherit"
                    className="JoinGameFab"
                    onClick={() => dispatch(lanchGame(socket, gameCode))}
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
                onClick={() => dispatch(createGame(socket))}
            >
                Create New Game
            </Fab>
            <Fab 
                variant="extended"
                color="inherit"
                className="JoinGameFab"
                // onClick={() => dispatch(joinGame())}
            >
                Join Existing Game
            </Fab>
        </div>
    )
}

export default CreateOrJoinGame;