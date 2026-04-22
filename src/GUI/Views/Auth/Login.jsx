import SpacerSmall from '../../Components/SpacerSmall';
import Input from '../../Components/Auth/Input';
import Button from '../../Components/Auth/Button';
import TextButton from '../../Components/Auth/TextButton';
// import RememberMeCheckbox from '../Components/Auth/RememberMeCheckbox';

export default function Login({
  credentials,
  credentialsSetters,
  authHandler,
  goToRegistration,
  loading,
}) {
  return (
    <>
      <form>
        <Input
          type="text"
          label="Username"
          value={credentials.username}
          autocomplete={'username'}
          changeHandler={(e) => credentialsSetters.setUsername(e.target.value)}
        />
        <SpacerSmall />
        <Input
          type="password"
          label="Password"
          value={credentials.password}
          autocomplete={'current-password'}
          changeHandler={(e) => credentialsSetters.setPassword(e.target.value)}
        />
        <SpacerSmall />
        {/* <RememberMeCheckbox /> */}
        <SpacerSmall />
        <Button
          clickHandler={(e) => {
            e.preventDefault();
            authHandler();
          }}
        >
          Log in
        </Button>
      </form>
      <SpacerSmall />
      <p>
        Don't have an account?
        <TextButton clickHandler={goToRegistration}>Sign up</TextButton>
      </p>
    </>
  );
}
