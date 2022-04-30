import Cookies from "js-cookie";
import { createContext, Dispatch, useContext, useReducer } from "react";
import { AuthActions, AuthState } from "../../store/auth";
import { ReactNode } from "react";
import authReducer from "../../store/auth";
import { UserClientType } from "../../types";

export const initialAuthState: UserClientType = {
  email: "",
  id: 0,
  token: "",
  userName: "",
  isLoggedIn: false
};

const initialState: AuthState = {
  isLoading: false,
  user: Cookies.get("userInfo")
    ? JSON.parse(Cookies.get("userInfo") as string)
    : initialAuthState,
};

const AuthContext = createContext<{
  state: AuthState;
  dispatch: Dispatch<AuthActions>;
}>({ state: initialState, dispatch: () => undefined });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  return useContext(AuthContext);
}