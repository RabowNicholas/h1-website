"use client";
import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import Link from "next/link";
import Cart from "../common/Cart";

export default function DrawerMenu() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const drawerContent = (
    <div
      className="w-72"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <Link href="/">
          <ListItemText primary="Shop" />
        </Link>
        <Link href="/educate">
          <ListItemText primary="Why Hydrogen" />
        </Link>
        <Link href="/where-to-buy">
          <ListItemText primary="Where to Buy" />
        </Link>
      </List>
    </div>
  );

  return (
    <div>
      <AppBar className="bg-dark-black" position="static">
        <Toolbar className="flex justify-between">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Cart />
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerContent}
      </Drawer>
    </div>
  );
}
