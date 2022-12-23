import {createContext, ReactNode, useEffect, useState} from "react";
import {UserEndpoint} from "Frontend/generated/endpoints.js";
import {logout} from "@hilla/frontend";
import UserDetails from "Frontend/generated/com/example/application/security/UserDetails.js";

export function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [authenticatedUser, setAuthenticatedUser] = useState<UserDetails>();

  useEffect(() => {
    UserEndpoint.isAuthenticated().then(setAuthenticated)
    UserEndpoint.getAuthenticatedUser().then(setAuthenticatedUser);
  }, []);

  return {
    authenticated,
    authenticatedUser,
    logout: async () => {
      await logout();
      setAuthenticated(false);
      setAuthenticatedUser(undefined);
    }
  }
}

const AuthContext = createContext<ReturnType<typeof useAuth> | null>(null);

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({children}: AuthProviderProps) {
  const auth = useAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}