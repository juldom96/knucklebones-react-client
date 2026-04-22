import MenuContainer from '../Components/MenuContainer';
import FormContainer from '../Components/FormContainer';
import MenuButton from '../Components/MenuButton';
import LoadingSpinner from '../Components/LoadingSpinner';
import { useState } from 'react';
import GameHandlingApi from '../../GameHandling/Api/GameHandlingApi';

export default function NewGame({ goToMainMenu }) {
  const [bestOf, setBestOf] = useState(3);
  const [mode, setMode] = useState('');
  const options = [3, 5, 7];

  const renderSwitch = () => {
    switch (mode) {
      case 'wait':
        return (
          <FormContainer>
            <h2>Finding Opponent</h2>
            <LoadingSpinner />
            <MenuButton
              clickHandler={() => {
                setMode('new');
                GameHandlingApi.abortFindingOpponent();
              }}
            >
              Abort
            </MenuButton>
          </FormContainer>
        );
      default:
        return (
          <FormContainer className="left">
            <h2>New Game</h2>
            <div className="flex horizontal">
              <p>Best of</p>
              <div className="flex horizontal">
                {options.map((option) => (
                  <button
                    key={option}
                    className={bestOf === option ? 'number active' : 'number'}
                    onClick={() => setBestOf(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            <MenuButton
              clickHandler={() => {
                setMode('wait');
                GameHandlingApi.sendWantToPlay('bestOf' + bestOf.toString());
              }}
            >
              Play
            </MenuButton>
            <hr />
            <MenuButton clickHandler={goToMainMenu}>Main Menu</MenuButton>
          </FormContainer>
        );
    }
  };
  return <MenuContainer>{renderSwitch()}</MenuContainer>;
}
