import MenuButton from '../Components/MenuButton';
import MenuContainer from '../Components/MenuContainer';

export default function MainMenu({ goToAuth, goToProfile, goToNewGame }) {
  return (
    <MenuContainer>
      <div className="form-container left">
        <h2 className="title">MAIN MENU</h2>
        <MenuButton clickHandler={goToNewGame}>New Game</MenuButton>
        <MenuButton clickHandler={goToProfile}>Profile</MenuButton>
        <MenuButton clickHandler={goToAuth}>Log Out</MenuButton>
      </div>
    </MenuContainer>
  );
}
