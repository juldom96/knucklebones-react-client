import SpacerSmall from '../SpacerSmall';
import SpacerMedium from '../SpacerMedium';
import Field from './Field';

export default function Row({ row, context }) {
  const { isOpponent } = context();
  const rowScore = context().gameState.board.rows[row].rowScore;

  const getClassName = () => {
    return isOpponent
      ? 'flex horizontal flex-end reversed'
      : 'flex horizontal flex-end';
  };

  return (
    <div className={getClassName()}>
      <SpacerSmall />
      <h3>{rowScore}</h3>
      <SpacerMedium />
      <div className={`flex horizontal${isOpponent ? '' : ' reversed'}`}>
        {[...Array(3)].map((_, index) => (
          <Field key={index} row={row} col={index} context={context} />
        ))}
      </div>
    </div>
  );
}
