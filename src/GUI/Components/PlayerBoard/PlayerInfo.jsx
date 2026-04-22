import { useUser } from '../../hooks/useUserHandling';
import SpacerSmall from '../SpacerSmall';
import DiceCup from './DiceCup';
import ProfilePicture from '../ProfilePicture';

export default function PlayerInfo({ context }) {
  const { gameState, isOpponent } = context();
  const myContext = isOpponent ? context : useUser;
  const { profilePictureUrl, username } = myContext();

  return (
    <div
      className={`flex horizontal player-info${isOpponent ? ' reversed' : ''}`}
    >
      <div>
        <ProfilePicture src={profilePictureUrl} />
      </div>
      <SpacerSmall />
      <div>
        <h3
          className={`no-margin${gameState.isMyTurn ? ' underlined' : ''}${
            isOpponent ? ' end' : ''
          }`}
        >
          {(username || 'unknown') + ' 🜲' + gameState.gamesWon}
        </h3>
        <DiceCup context={context} />
      </div>
    </div>
  );
}
