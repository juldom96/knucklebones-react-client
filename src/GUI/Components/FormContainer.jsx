export default function FormContainer({ className, children }) {
  return <div className={'form-container ' + className}> {children}</div>;
}
