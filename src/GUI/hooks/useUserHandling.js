import { createContext, useState, useContext, useCallback } from 'react';
import UserServiceApi from '../../UserHandling/Api/UserServiceApi';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [username, setUsername] = useState(null);
    const [profilePictureUrl, setProfilePictureUrl] = useState(null);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleLoadingState = async (callback) => {
        setLoading(true);
        try {
            await callback();
        } catch (error) {
            console.error(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const loadUser = useCallback(() => handleLoadingState(async () => {
        setUsername(UserServiceApi.getCurrentUser());
        const profilePictureUrl = await UserServiceApi.getProfilePictureUrl();
        setProfilePictureUrl(profilePictureUrl);
    }), []);

    const loadHistory = useCallback(() => handleLoadingState(async () => {
        const historyData = await UserServiceApi.getHistory();
        setHistory(historyData);
    }), []);

    const login = async (username, password) => {
        await handleLoadingState(async () => {
            await UserServiceApi.loginUser(username, password);
            await loadUser();
        });
    };

    const register = async (credentials) => {
        const { username, password, repeatedPassword } = credentials;
        await handleLoadingState(async () => {
            await UserServiceApi.registerUser(username, password, repeatedPassword);
            await loadUser();
        });
    };

    const logout = () => {
        UserServiceApi.logoutUser();
        setUsername(null);
        setHistory([]);
        setProfilePictureUrl(null);
    };

    //hier wäre eine Art Auto-Login:
    // useEffect(() => {
    //     loadUser(); 
    // }, [loadUser]);

    return (
        <UserContext.Provider
            value={{
                username,
                profilePictureUrl,
                history,
                loading,
                login,
                register,
                logout,
                loadHistory,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
};
