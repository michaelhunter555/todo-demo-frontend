import { User } from "./auth-context";

export const initialState = {
  isLoggedIn: false,
  user: null,
};

type State = {
  isLoggedIn: boolean;
  user: User | null;
};

type Action = {
  type: "LOGIN" | "LOGOUT";
  isLoggedIn: boolean;
  user: User | null;
};

export const authReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "LOGIN": {
      return {
        ...state,
        isLoggedIn: true,
        user: action.user,
      };
    }

    case "LOGOUT": {
      return initialState;
    }

    default:
      return state;
  }
};
