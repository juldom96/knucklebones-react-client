import Row from './Row';
import Total from './Total';

export default function Grid({ context }) {
  const getClassName = () => {
    return !isOpponent ? 'flex vertical flex-end' : 'flex vertical flex-start';
  };

  const { isOpponent, board } = context().gameState;

  return (
    <>
      {board && (
        <div className={getClassName()}>
          {[...Array(3)].map((_, index) => {
            return <Row key={index} row={index} context={context} />;
          })}
          <Total context={context} />
        </div>
      )}
    </>
  );
}
