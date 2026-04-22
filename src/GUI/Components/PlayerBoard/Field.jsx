import GameHandlingApi from '../../../GameHandling/Api/GameHandlingApi';
import CSSDice from './CssDice';

export default function Field({ row, col, context }) {
  const { value, isValidMove } =
    context().gameState.board.rows[row].fields[col];
  const { isOpponent } = context();
  const isMyTurn = context().gameState.isMyTurn;

  const hasValue = value > 0;

  return (
    <div className="field">
      {hasValue && <CSSDice value={value} isOpponent={isOpponent}></CSSDice>}
      {!hasValue && !isOpponent && isValidMove && isMyTurn && (
        <div
          className="valid-move"
          onClick={() => GameHandlingApi.sendPlaceDie(row)}
        />
      )}
    </div>
  );
}
