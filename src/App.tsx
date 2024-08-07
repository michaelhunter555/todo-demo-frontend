import { useCallback, useReducer } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Dashboard from "./components/Dashboard/Dashboard";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import LoginUser from "./components/Users/Login";
import SignUp from "./components/Users/Signup";
import { authReducer, initialState } from "./context/auth-actions";
import { AuthContext, User } from "./context/auth-context";

const queryClient = new QueryClient();

function App() {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = useCallback((user: User, isLoggedIn: boolean) => {
    dispatch({
      type: "LOGIN",
      user: user,
      isLoggedIn: isLoggedIn,
    });
  }, []);

  const logout = useCallback(() => {
    dispatch({ type: "LOGOUT", isLoggedIn: false, user: null });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider
        value={{
          isLoggedIn: state.isLoggedIn,
          user: state.user,
          login: login,
          logout: logout,
        }}
      >
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginUser />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/:userId/dashboard" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
