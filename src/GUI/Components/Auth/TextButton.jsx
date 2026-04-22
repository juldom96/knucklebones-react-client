export default function Button({ clickHandler, children }) {
  return (
    <button className="text" onClick={clickHandler}>
      {children}
    </button>
  );
}
