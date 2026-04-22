const Pip = () => <span className="pip" />;

const Face = ({ isOpponent, children }) => (
  <div className={`face${isOpponent ? ' opponent' : ''}`}>{children}</div>
);

export default function CSSDice({ isOpponent, isSmall, value }) {
  const pips =
    Number.isInteger(value) && value > 0
      ? Array(value)
          .fill(0)
          .map((_, i) => <Pip key={i} />)
      : null;
  return (
    <>
      {pips && (
        <div
          className={`css-dice${isSmall ? ' small' : ''}${
            isOpponent ? ' opponent' : ''
          }`}
        >
          <Face isOpponent={isOpponent}>{pips}</Face>
        </div>
      )}
    </>
  );
}
