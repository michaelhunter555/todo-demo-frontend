import Drawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";

import { closedMixin, openedMixin } from "./mixinHelpers";

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    ...(!open && closedMixin(theme)),
    ...(open && openedMixin(theme)),
    top: "auto",
    boxSizing: "border-box",
    whiteSpace: "nowrap",
    position: "absolute",
  },
}));

const drawerWidth = 240;

type MainContentProps = {
  openMenu: boolean;
};

export const MainContent = styled("div", {
  shouldForwardProp: (prop) => prop !== "openMenu",
})<MainContentProps>(({ openMenu, theme }) => ({
  flexGrow: 1,
  marginLeft: openMenu ? drawerWidth : `calc(${theme.spacing(7)} + 1px)`,
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  padding: theme.spacing(3),
  [theme.breakpoints.up("sm")]: {
    marginLeft: openMenu ? drawerWidth : `calc(${theme.spacing(8)} + 1px)`, // Adjust margin based on drawer state
  },
}));
