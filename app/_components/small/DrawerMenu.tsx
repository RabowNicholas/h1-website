"use client";
import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
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
      className="w-72 bg-warm-white h-screen text-dark-black"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button>
          <Link href="/" passHref>
            <ListItemText primary="Shop" />
          </Link>
        </ListItem>
        <ListItem button>
          <Link href="/educate" passHref>
            <ListItemText primary="Why Hydrogen" />
          </Link>
        </ListItem>
        <ListItem button>
          <Link href="/where-to-buy" passHref>
            <ListItemText primary="Where to Buy" />
          </Link>
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      <AppBar
        position="static"
        className="bg-dark-black w-full fixed top-0 left-0 z-50"
      >
        <Toolbar className="flex justify-between w-full px-4 md:px-8 lg:px-16">
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
