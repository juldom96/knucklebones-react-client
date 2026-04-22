import React, { useEffect, useState } from 'react';
import { useGameState } from './GameHandling/Api/useGameState';
import { EventTypes } from './GameHandling/models/eventTypes';

import MainMenu from './GUI/Views/MainMenu';
import Profile from './GUI/Views/Profile'
import NewGame from './GUI/Views/NewGame'
import RunningGame from './GUI/Views/RunningGame';
import Auth from './GUI/Views/Auth';
import MenuButton from './GUI/Components/MenuButton';

const AUTH = "authentication";
const MENU = "main menu";
const PROFILE = "player profile";
const NEWGAME = "new game configuration";
const RUNNINGGAME = "running game";

const START_VIEW = AUTH;

function App() {
  const [showScreen, setShowScreen] = useState(START_VIEW);
  const { currentEvent } = useGameState();
  const goToAuth = () => setShowScreen(AUTH);
  const goToMainMenu = () => setShowScreen(MENU);
  const goToProfile = () => setShowScreen(PROFILE);
  const goToNewGame = () => setShowScreen(NEWGAME);
  const goToRunningGame = () => setShowScreen(RUNNINGGAME);

  useEffect(() => {
    switch (currentEvent) {
      case EventTypes.GAME_STARTED: goToRunningGame(); break;
      case EventTypes.MATCH_ABORTED: alert("The opponent quit the match. You won!"); goToMainMenu(); break;
      case EventTypes.MATCH_OVER: goToMainMenu(); break;
      default: return;
    }
  }, [currentEvent])

  const renderSwitch = () => {
    switch (showScreen) {
      case AUTH: return <Auth goToMainMenu={goToMainMenu} />
      case MENU: return <MainMenu goToAuth={goToAuth} goToProfile={goToProfile} goToNewGame={goToNewGame} />
      case PROFILE: return <Profile goToMainMenu={goToMainMenu} />
      case NEWGAME: return <NewGame goToMainMenu={goToMainMenu}></NewGame>
      case RUNNINGGAME: return <RunningGame goToMainMenu={goToMainMenu}></RunningGame>
      default: return <MenuButton clickHandler={goToAuth}>Zum Login</MenuButton>
    }
  }

  return (<>{renderSwitch()}</>
  );
}

export default App;
