import { createContext } from "react";

interface UserContext {
  isLoggedIn: boolean;
  user: User | null;
  login: (user: User, isLoggedIn: boolean) => void;
  logout: () => void;
}

export type User = {
  _id: string;
  email: string;
  name: string;
  password: string;
};

export const AuthContext = createContext<UserContext>({
  isLoggedIn: false,
  user: null,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login: (user: object, isLoggedIn: boolean) => {},
  logout: () => {},
});
