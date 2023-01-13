import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { UserEndpoint } from 'Frontend/generated/endpoints.js';
import { logout as serverLogout } from '@hilla/frontend';
import UserDetails from 'Frontend/generated/com/example/application/endpoints/UserDetails.js';

export function authHook() {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState<UserDetails>();
  const [authInitialized, setAuthInitialized] = useState(false);

  async function login() {
    try {
      const authUser = await UserEndpoint.getAuthenticatedUser();
      setUser(authUser);
      setAuthenticated(!!authUser);
    } finally {
      setAuthInitialized(true);
    }
  }

  async function logout(redirect: string = '/login') {
    setAuthenticated(false);
    setUser(undefined);
    setAuthInitialized(false);
    await serverLogout();
    location.href = `${location.origin}${redirect}`;
  }

  useEffect(() => {
    login();
  }, []);

  return {
    authenticated,
    authInitialized,
    user,
    login,
    logout,
  };
}

type AuthContextType = ReturnType<typeof authHook>;

const initialValue: AuthContextType = {
  authenticated: false,
  user: undefined,
  authInitialized: false,
  login: async () => {},
  logout: async () => {},
};

const AuthContext = createContext<AuthContextType>(initialValue);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const auth = authHook();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
