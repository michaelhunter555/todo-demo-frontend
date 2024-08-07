import { useCallback, useContext, useState } from "react";

import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/auth-context";

type UserSignUpProps = {
  name: string;
  email: string;
  password: string;
};

export const useUser = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const { login } = auth;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const signUp = useCallback(
    async (signUpData: UserSignUpProps) => {
      setIsLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_USER}/sign-up`, {
          method: "POST",
          body: JSON.stringify({ data: signUpData }),
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message);
        }

        const data = await response.json();
        const { user } = data;
        //context to log user in
        login(user, true);
        setIsLoading(false);
        navigate("/");
      } catch (err) {
        setIsLoading(false);
        console.log(err);
      }
    },
    [login, navigate]
  );

  const loginUser = useCallback(
    async (password: string, email: string) => {
      setIsLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_USER}/login`, {
          method: "POST",
          body: JSON.stringify({ password, email }),
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message);
        }

        const data = await response.json();
        const { user } = data;
        login(user, true); //auth context
        setIsLoading(false);
        navigate("/");
      } catch (err) {
        setIsLoading(false);
        console.log(err);
      }
    },
    [login, navigate]
  );

  return {
    isLoading,
    signUp,
    loginUser,
  };
};
