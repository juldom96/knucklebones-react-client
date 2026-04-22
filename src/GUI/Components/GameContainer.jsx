export default function GameContainer({ children }) {
  return (
    <div className="game">
      <div className="container">{children}</div>
    </div>
  );
}
