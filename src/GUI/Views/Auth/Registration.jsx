import SpacerSmall from '../../Components/SpacerSmall';
import Input from '../../Components/Auth/Input';
import Button from '../../Components/Auth/Button';
import TextButton from '../../Components/Auth/TextButton';
// import RememberMeCheckbox from '../Components/Auth/RememberMeCheckbox';

export default function Registration({
  credentials,
  credentialsSetters,
  authHandler,
  goToLogin,
}) {
  return (
    <>
      <form>
        <Input
          type="text"
          label="Username"
          value={credentials.username}
          autocomplete="username"
          changeHandler={(e) => credentialsSetters.setUsername(e.target.value)}
        />
        <SpacerSmall />

        <Input
          type="password"
          label="Password"
          value={credentials.password}
          autocomplete="new-password"
          changeHandler={(e) => credentialsSetters.setPassword(e.target.value)}
        />
        <SpacerSmall />

        <Input
          type="password"
          label="Repeat Password"
          value={credentials.repeatedPassword}
          autocomplete="new-password"
          changeHandler={(e) =>
            credentialsSetters.setRepeatedPassword(e.target.value)
          }
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
          Create Account
        </Button>
      </form>
      <SpacerSmall />
      <p>
        Already have an account?
        <TextButton clickHandler={goToLogin}>Sign in</TextButton>
      </p>
    </>
  );
}
