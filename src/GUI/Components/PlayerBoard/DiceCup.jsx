import CSSDice from './CssDice';

export default function DiceCup({ context }) {
  const { gameState, isOpponent } = context();
  return (
    <div className={`dice-cup flex horizontal${isOpponent ? ' reversed' : ''}`}>
      {Array.from({ length: gameState.remainingDice }).map((_, index) => (
        <CSSDice
          isOpponent={isOpponent}
          isSmall={true}
          value={1}
          key={index + isOpponent}
        />
      ))}
    </div>
  );
}
