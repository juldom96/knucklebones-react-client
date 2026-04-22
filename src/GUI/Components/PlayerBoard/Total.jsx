import CSSDice from './CssDice';

export default function Total({ context }) {
  const { isOpponent, gameState } = context();
  return (
    <div
      className={`field total flex horizontal${isOpponent ? ' reversed' : ''}`}
    >
      <div className={`flex vertical centered`}>
        <p>Total</p>
        <h3>{gameState.totalScore}</h3>
      </div>
      <div className="dice-outline">
        {gameState.isMyTurn && (
          <CSSDice value={gameState.dieValue} isOpponent={isOpponent} />
        )}
      </div>
    </div>
  );
}
