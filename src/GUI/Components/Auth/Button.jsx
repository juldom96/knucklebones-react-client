export default function TextButton({ clickHandler, children }) {
  return (
    <button className="big green" onClick={clickHandler}>
      {children}
    </button>
  );
}
