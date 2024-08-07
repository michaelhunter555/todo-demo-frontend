import React, { useEffect } from "react";

import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { useForm } from "../../hooks/useForm";
import { useUser } from "../../hooks/user-hooks";

const validateEmail = (email: string) => {
  return /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email);
};

const LoginUser = () => {
  const { loginUser, isLoading } = useUser();
  const [formState, inputHandler, setFormData] = useForm(
    {
      password: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    if (formState?.isValid) {
      setFormData(
        {
          password: {
            value: formState?.inputs?.password?.value,
            isValid: true,
          },
          email: {
            value: formState?.inputs?.email?.value,
            isValid: true,
          },
        },
        true
      );
    }
  }, [
    formState?.isValid,
    formState?.inputs?.password?.value,
    formState?.inputs?.email?.value,
    setFormData,
  ]);

  const submitSignUpHandler = async (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
    //create api call
    const loginData = {
      email: formState?.inputs?.email?.value as string,
      password: formState?.inputs?.password?.value as string,
    };

    try {
      await loginUser(loginData.password, loginData.email);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        marginTop: 4,
      }}
    >
      <Paper sx={{ padding: 2 }}>
        {isLoading && <LinearProgress />}

        <Typography align="center">Login</Typography>
        <form onSubmit={submitSignUpHandler}>
          <Grid container direction="column" spacing={2}>
            <Grid item xs={12}>
              <FormHelperText>Please enter your email</FormHelperText>
              <TextField
                id="email"
                name="email"
                type="text"
                fullWidth
                value={formState?.inputs?.email?.value}
                onChange={(event) =>
                  inputHandler(
                    "email",
                    event.target.value,
                    event.target.value.length > 0
                  )
                }
              />
            </Grid>
            <Grid item xs={12}>
              <FormHelperText>Enter Password</FormHelperText>
              <TextField
                id="password"
                name="password"
                type="password"
                fullWidth
                value={formState?.inputs?.password.value}
                onChange={(event) =>
                  inputHandler(
                    "password",
                    event.target.value,
                    event.target.value.length > 0
                  )
                }
              />
            </Grid>
          </Grid>
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            sx={{ marginTop: "1rem" }}
            spacing={2}
          >
            <Button color="secondary">Go back</Button>
            <Button
              variant="contained"
              type="submit"
              disabled={
                !formState.isValid ||
                !validateEmail(formState?.inputs?.email?.value as string)
              }
            >
              Login
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginUser;
