import React from "react";
import { Link } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import Fingerprint from "@material-ui/icons/Fingerprint";
import Rowing from "@material-ui/icons/Rowing";

const Menu: React.FC = () => {
  return (
    <div>
      <ListItem button component={Link} to="/">
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="LandingPage" />
      </ListItem>
      <ListItem button component={Link} to="/login">
        <ListItemIcon>
          <Fingerprint />
        </ListItemIcon>
        <ListItemText primary="Login" />
      </ListItem>
      <ListItem button component={Link} to="/register">
        <ListItemIcon>
          <Rowing />
        </ListItemIcon>
        <ListItemText primary="Register" />
      </ListItem>
    </div>
  );
};

export default Menu;
