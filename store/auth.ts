import { initialAuthState } from "../components/hooks/useAuth";
import { UserClientType } from "../types";

export interface AuthState {
  isLoading: boolean;
  user: UserClientType;
}

export declare type ActionType = 
  "USER_LOGIN"
  | "USER_LOGOUT"
;

export type AuthActions = {
  type: ActionType;
  payload?: UserClientType;
};


function reducer(state: AuthState, action: AuthActions): AuthState {

  const { type, payload } = action;

  switch (type) {
    case "USER_LOGIN":
      return { ...state, user: payload as UserClientType };
    case "USER_LOGOUT":
      return { ...state, user: initialAuthState }
    default:
      return state;
  }

}

export default reducer;
