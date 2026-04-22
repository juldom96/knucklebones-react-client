import { useUser } from '../hooks/useUserHandling';
import { useState } from 'react';
import Registration from './Auth/Registration';
import Login from './Auth/Login';
import AuthContainer from '../Components/AuthContainer';
import LoadingSpinner from '../Components/LoadingSpinner';
import FormContainer from '../Components/FormContainer';

const LOGIN = 'login';
const REGISTER = 'register';

export default function Auth({ goToMainMenu }) {
  // navigation
  const [authMethod, setAuthMethod] = useState(LOGIN);
  const goToRegistration = () => setAuthMethod(REGISTER);
  const goToLogin = () => setAuthMethod(LOGIN);

  //credentials and authentication
  const { login, register, loading } = useUser();

  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    repeatedPassword: '',
  });

  const setUsername = (newUsername) => {
    setCredentials({ ...credentials, username: newUsername });
  };

  const setPassword = (newPassword) => {
    setCredentials({ ...credentials, password: newPassword });
  };

  const setRepeatedPassword = (newRepeatedPassword) => {
    setCredentials({ ...credentials, repeatedPassword: newRepeatedPassword });
  };

  const credentialsSetters = { setUsername, setPassword, setRepeatedPassword };

  const loginHandler = async () => {
    await login(credentials.username, credentials.password);
  };

  const registerHandler = async () => {
    await register(credentials);
  };

  const authClickHandler = async (authHandler) => {
    try {
      await authHandler();
      goToMainMenu();
    } catch (error) {
      alert(error.message);
    }
  };

  const renderSwitch = () => {
    switch (authMethod) {
      case REGISTER:
        return (
          <Registration
            credentials={credentials}
            credentialsSetters={credentialsSetters}
            authHandler={() => {
              authClickHandler(registerHandler);
            }}
            goToLogin={goToLogin}
          />
        );
      default:
        return (
          <Login
            credentials={credentials}
            credentialsSetters={credentialsSetters}
            authHandler={() => {
              authClickHandler(loginHandler);
            }}
            goToRegistration={goToRegistration}
          />
        );
    }
  };

  return (
    <AuthContainer>
      <h1 className="title">KNUCKLEBONES</h1>
      <FormContainer>
        {loading && <LoadingSpinner />}
        {!loading && renderSwitch()}
      </FormContainer>
    </AuthContainer>
  );
}
