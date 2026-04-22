import {
  useUserGameState,
  UserGameStateProvider,
  OpponentGameStateProvider,
  useOpponentGameState,
} from '../hooks/useGameHandling';
import { useEffect } from 'react';
import { useGameState } from '../../GameHandling/Api/useGameState';
import { EventTypes } from '../../GameHandling/models/eventTypes';
import GameContainer from '../Components/GameContainer';
import Spacer from '../Components/Spacer';
import PlayerBoard from '../Components/PlayerBoard/PlayerBoard';
import GameHandlingApi from '../../GameHandling/Api/GameHandlingApi';
import dieRollSound from '../../assets/sounds/dice.mp3';

export default function RunningGame({ goToMainMenu }) {
  const quitMatchHandler = () => {
    if (window.confirm('Are you sure you want to quit the match?')) {
      GameHandlingApi.sendQuitMatch();
    }
    goToMainMenu();
  };
  const { currentEvent, currentGameWinner, matchWinner } = useGameState();

  useEffect(() => {
    const alertGameWinner = () => {
      if (currentGameWinner) {
        setTimeout(() => {
          alert('Game over! The winner is: ' + currentGameWinner);
        }, 0);
      }
    };

    const alertMatchWinner = () => {
      if (matchWinner) {
        setTimeout(() => {
          alert('Match over! The winner is: ' + matchWinner);
        }, 0);
        goToMainMenu();
      }
    };

    const playDieRoll = () => {
      let dieRollAudio = new Audio(dieRollSound);
      dieRollAudio.play();
    };

    switch (currentEvent) {
      case EventTypes.GAME_OVER:
        alertGameWinner();
        break;
      case EventTypes.MATCH_OVER:
        alertGameWinner();
        alertMatchWinner();
        break;
      case EventTypes.GAME_STARTED:
      case EventTypes.NEXT_TURN:
        playDieRoll();
        break;
      default:
        return;
    }
  }, [currentEvent, currentGameWinner, matchWinner, goToMainMenu]);
  return (
    <GameContainer>
      <i
        className="bi bi-box-arrow-right"
        id="exit-icon"
        onClick={quitMatchHandler}
      />
      <div className="flex horizontal centered">
        <UserGameStateProvider>
          <PlayerBoard context={useUserGameState} />
        </UserGameStateProvider>
        <Spacer />
        <OpponentGameStateProvider>
          <PlayerBoard context={useOpponentGameState} />
        </OpponentGameStateProvider>
      </div>
    </GameContainer>
  );
}
