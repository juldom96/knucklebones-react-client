import Grid from './Grid';
import PlayerInfo from './PlayerInfo';

export default function PlayerBoard({ context }) {
  const { isOpponent } = context();

  return (
    <div className={`flex vertical grid${isOpponent ? ' reversed' : ''}`}>
      <PlayerInfo context={context} />
      <Grid context={context} />
    </div>
  );
}
