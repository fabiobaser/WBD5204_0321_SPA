import React from "react";
import { Link } from "react-router-dom";
import { Button, Menu } from "semantic-ui-react";
import { useMainContext } from "./App";

const Navbar = () => {
  const context = useMainContext();

  const MItem = ({ name, path }) => (
    <Menu.Item name={name}>
      <Link to={path}>{name}</Link>
    </Menu.Item>
  );

  return (
    <Menu pointing secondary>
      <MItem name={"Home"} path={"/"} />
      <MItem name={"About"} path={"/about"} />
      <MItem name={"Blog"} path={"/blog"} />
      <MItem name={"Users"} path={"/users"} />
      <Menu.Menu position={"right"}>
        {context.loggedIn ? (
          <Menu.Item name={"logout"} onClick={context.logOut}>
            Abmelden
          </Menu.Item>
        ) : (
          <MItem name={"Anmelden"} path={"/login"} />
        )}
      </Menu.Menu>
    </Menu>
  );
};

export default Navbar;
