import ChecklistIcon from "@mui/icons-material/Checklist";
import SettingsIcon from "@mui/icons-material/Settings";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const menuItems = [
  {
    menuText: "My Todo List",
    icon: <ChecklistIcon />,
    component: "todolist",
    subMenuText: "View your current todo list.",
  },
  {
    menuText: "Settings",
    icon: <SettingsIcon />,
    component: "settings",
    subMenuText: "Manage your settings.",
  },
];

interface SidebarProps {
  open: boolean;
}

const SidebarMenu = ({ open }: SidebarProps) => {
  return (
    <List>
      {menuItems?.map((items) => (
        <ListItem key={items.component} sx={{ display: "block" }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              {items.icon}
            </ListItemIcon>
            <ListItemText
              primary={items.menuText}
              sx={{ opacity: open ? 1 : 0 }}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default SidebarMenu;
