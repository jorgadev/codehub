import React from "react";

import { Grid } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

import HomeIcon from "@material-ui/icons/Home";
import GroupIcon from "@material-ui/icons/Group";
import ListIcon from "@material-ui/icons/List";
import SettingsIcon from "@material-ui/icons/Settings";

export default function Sidebar() {
  return (
    <Grid
      gridTemplateRows={{ base: "0", md: "60px 60px 60px auto 60px" }}
      gridTemplateColumns={{ base: "1fr 1fr 1fr 0 1fr", md: "0" }}
      bg="blue.800"
      gridRow={{ base: "2", md: "1" }}
    >
      <NavLink
        to="/dashboard"
        className="icon-block"
        activeClassName="active-icon-block"
      >
        <HomeIcon />
      </NavLink>
      <NavLink
        to="/teams"
        className="icon-block"
        activeClassName="active-icon-block"
      >
        <GroupIcon />
      </NavLink>
      <NavLink
        to="/projects"
        className="icon-block"
        activeClassName="active-icon-block"
      >
        <ListIcon />
      </NavLink>
      <div></div>
      <NavLink
        to="/settings"
        className="icon-block"
        activeClassName="active-icon-block"
      >
        <SettingsIcon />
      </NavLink>
    </Grid>
  );
}
