import { createContext, useContext, useState } from 'react';
import { useGameState } from '../../GameHandling/Api/useGameState';

//User
const UserGameStateContext = createContext();

export const UserGameStateProvider = ({ children }) => {
    const { player } = useGameState.getState();
    const [gameState] = useState(player.gameState);
    const isOpponent = false;
    return (
        <UserGameStateContext.Provider value={{ gameState, isOpponent }}>{children}</UserGameStateContext.Provider>
    )
}

export const useUserGameState = () => {
    return useContext(UserGameStateContext);
};

//Opponent
const OpponentGameStateContext = createContext();

export const OpponentGameStateProvider = ({ children }) => {
    const { opponent } = useGameState.getState();
    const [gameState] = useState(opponent.gameState);
    const isOpponent = true;
    const username = opponent.username;
    const profilePictureUrl = opponent.profilePictureUrl;

    return (
        <OpponentGameStateContext.Provider value={{ gameState, isOpponent, username, profilePictureUrl }}>{children}</OpponentGameStateContext.Provider>
    )
}

export const useOpponentGameState = () => {
    return useContext(OpponentGameStateContext);
};


