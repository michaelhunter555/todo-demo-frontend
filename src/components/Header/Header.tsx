import { useContext } from "react";

import { NavLink } from "react-router-dom";

import { Link } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import { AuthContext } from "../../context/auth-context";

const StyledList = styled(List)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  listStyle: "none",
  padding: 0,
  margin: 0,
});

const StyledListItem = styled(ListItem)(({ theme }) => ({
  width: "auto",
  marginLeft: theme.spacing(2),
  "&:first-of-type": {
    marginLeft: 0,
  },
}));

const imageUrl =
  "https://res.cloudinary.com/dtqbxfe7r/image/upload/v1721797076/14_kn5eae.svg";

const Header = () => {
  const auth = useContext(AuthContext);

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      sx={{
        borderBottom: "1px solid #bbbbbb",
        padding: (theme) => theme.spacing(2),
      }}
    >
      <Box>
        <CardMedia
          component="img"
          src={imageUrl}
          alt="site-logo"
          sx={{ width: 50, height: 50 }}
        />
      </Box>

      <StyledList>
        <StyledListItem>
          <NavLink to="/">
            <Typography color="text.secondary" variant="subtitle2">
              Home
            </Typography>
          </NavLink>
        </StyledListItem>
        {!auth?.isLoggedIn && (
          <StyledListItem>
            <NavLink to="/login">
              <Typography color="text.secondary" variant="subtitle2">
                Login
              </Typography>
            </NavLink>
          </StyledListItem>
        )}
        {!auth?.isLoggedIn && (
          <StyledListItem>
            <NavLink to="/sign-up">
              <Typography color="text.secondary" variant="subtitle2">
                Sign-up
              </Typography>
            </NavLink>
          </StyledListItem>
        )}
        {auth?.isLoggedIn && (
          <StyledListItem>
            <NavLink to={`/${auth?.user?._id}/dashboard`}>
              <Typography color="text.secondary" variant="subtitle2">
                Dashboard
              </Typography>
            </NavLink>
          </StyledListItem>
        )}
        {auth?.isLoggedIn && (
          <StyledListItem>
            <Button component={Link} onClick={() => auth?.logout()}>
              <Typography color="text.secondary" variant="subtitle2">
                Log out
              </Typography>
            </Button>
          </StyledListItem>
        )}
      </StyledList>
    </Stack>
  );
};

export default Header;
