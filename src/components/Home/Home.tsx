import { useContext } from "react";

import { Link } from "react-router-dom";

import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import TodoImg from "../../assets/todo.png";
import { AuthContext } from "../../context/auth-context";

const Home = () => {
  const auth = useContext(AuthContext);
  const id = auth?.user?._id;

  return (
    <Container maxWidth="md" sx={{ marginTop: 2 }}>
      <Grid container direction="column" spacing={2} alignItems="center">
        <Grid item>
          <Paper sx={{ padding: 2, borderRadius: 10 }}>
            <Stack spacing={2}>
              <Typography variant="h6" color="text.secondary">
                {auth?.isLoggedIn
                  ? `Welcome back ${auth?.user?.name}`
                  : "Welcome to Todio app"}
              </Typography>
              <Typography gutterBottom color="text.secondary">
                Now you can manage all your todo aspects in one free and useful
                experience. Being able to organize your tasks, see them in front
                you and then complete them leads to much more effective
                task-management.
              </Typography>
            </Stack>
          </Paper>
        </Grid>
        <Grid item>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Button size="small" variant="outlined">
              Learn More
            </Button>
            <Button
              component={Link}
              to={auth?.isLoggedIn ? `/${id}/dashboard` : "/login"}
              size="small"
              variant="contained"
            >
              {auth?.isLoggedIn ? "Dashboard" : "Get Started"}
            </Button>
          </Stack>
        </Grid>

        <Grid item>
          <CardMedia
            component="img"
            src={TodoImg}
            alt="home-img"
            sx={{ width: "100%", height: "100%" }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
