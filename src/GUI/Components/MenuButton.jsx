export default function MenuButton({ children, clickHandler }) {
  return (
    <button className="green menu" onClick={clickHandler}>
      {children}
    </button>
  );
}
