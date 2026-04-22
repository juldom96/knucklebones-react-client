import { useEffect } from 'react';
import { useUser } from '../hooks/useUserHandling';
import MenuButton from '../Components/MenuButton';
import SpacerMedium from '../Components/SpacerMedium';
import FormContainer from '../Components/FormContainer';
import MenuContainer from '../Components/MenuContainer';
import SpacerSmall from '../Components/SpacerSmall';
import HistoryResults from '../Components/HistoryResults';
import LoadingSpinner from '../Components/LoadingSpinner';
import ProfilePicture from '../Components/ProfilePicture';

const UNKNOWN_ATTRIBUTE = '?';

export default function Profile({ goToMainMenu }) {
  const { username, profilePictureUrl, history, loadHistory, loading } =
    useUser();

  // Spielhistorie bei jedem Aufruf der Komponente laden
  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  const getHistoryValue = (value) =>
    value === null ? UNKNOWN_ATTRIBUTE : value;

  return (
    <MenuContainer>
      {loading && (
        <FormContainer>
          <LoadingSpinner />
        </FormContainer>
      )}
      {!loading && (
        <FormContainer className={'wide'}>
          <h2>Player Profile</h2>
          <div className="flex vertical">
            <div className="card flex horizontal centered">
              <div>
                <ProfilePicture src={profilePictureUrl} />
              </div>
              <SpacerMedium />
              <div id="player">
                <h3>{username}</h3>
                <p>
                  Member since:{' '}
                  {new Date(history.member_since).toLocaleDateString()}
                  <br></br> Total Points:{' '}
                  {getHistoryValue(history.total_points)}
                </p>
              </div>
            </div>

            <div className="card">
              <HistoryResults
                results={getHistoryValue(history.recent_results)}
              />
            </div>

            <div className="flex horizontal">
              <div className="card stats">
                <p>Wins: {getHistoryValue(history.wins)}</p>
                <p>Losses: {getHistoryValue(history.losses)}</p>
                <p>Win rate: {getHistoryValue(history.win_rate)}%</p>
              </div>

              <SpacerSmall></SpacerSmall>

              <div className="card stats">
                <p>Games played: {getHistoryValue(history.games_played)}</p>
                <p>
                  Longest Win Streak: {getHistoryValue(history.longest_streak)}
                </p>
                <p>
                  Current Win Streak: {getHistoryValue(history.current_streak)}
                </p>
              </div>
            </div>

            <div className="flex horizontal">
              <MenuButton clickHandler={goToMainMenu}>Main Menu</MenuButton>
            </div>
          </div>
        </FormContainer>
      )}
    </MenuContainer>
  );
}
