import * as React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { authProvider } from "./authProvider";

interface AuthContextType {
  user: any;
  isLoading: boolean;
  signin: (
    email: string,
    password: string,
    callback: (isSuccessful: boolean) => void
  ) => void;
  register: (
    email: string,
    password: string,
    callback: (isSuccessful: boolean) => void
  ) => void;
  signout: (callback: VoidFunction) => void;
}

let AuthContext = React.createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  let signin: AuthContextType["signin"] = (email, password, callback) => {
    setIsLoading(true);
    return authProvider.signin(email, password, (isSuccessful) => {
      setUser(email);
      setIsLoading(false);
      callback(isSuccessful);
    });
  };

  let register: AuthContextType["register"] = (email, password, callback) => {
    setIsLoading(true);
    return authProvider.register(email, password, (isSuccessful) => {
      setUser(email);
      setIsLoading(false);
      callback(isSuccessful);
    });
  };

  let signout = (callback: VoidFunction) => {
    return authProvider.signout(() => {
      setUser(null);
      callback();
    });
  };

  let value = { user, signin, register, signout, isLoading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return React.useContext(AuthContext);
}

export function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = useAuth();
  let location = useLocation();

  // get cookie
  // if cookie is not set, redirect to login page
  // if cookie is set, check if it's valid

  if (!auth.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
