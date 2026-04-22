export default function Input({
  label,
  type,
  value,
  autocomplete,
  changeHandler,
}) {
  return (
    <>
      <label>{label}</label>
      <br />
      <input
        type={type}
        value={value}
        onChange={changeHandler}
        autoComplete={autocomplete}
      />
    </>
  );
}
