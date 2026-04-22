import Grid from './Grid';
import PlayerInfo from './PlayerInfo';

export default function OpponentBoard({ gameState }) {
  return (
    <div id="board-right">
      <PlayerInfo
        isLeft={false}
        username={gameState.username}
        profilePictureUrl={gameState.profilePictureUrl}
        remainingDice={gameState.remainingDice}
      />
      <Grid isLeft={false} />
    </div>
  );
}
