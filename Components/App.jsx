import React, { useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import pages from "../Pages/pages";

function Routes(loggedIn) {
  return pages.map((page) => {
    const Layout = page.layout;
    const PageComp = page.component;

    return (
      <Route path={page.path} key={page.path}>
        {!page.private || (page.private && loggedIn) ? (
          <Layout>
            <PageComp />
          </Layout>
        ) : (
          <Redirect to={"/login"} />
        )}
      </Route>
    );
  });
}

const MainContext = React.createContext({ loggedIn: false });

export const useMainContext = () => React.useContext(MainContext);

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  window.setLoggedIn = setLoggedIn;

  const contextValue = {
    loggedIn,
    register: async (username, password) => {
      const fetchResult = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const response = await fetchResult.json();

      if (response.success) setLoggedIn(true);

      return response;
    },
    logIn: async (username, password) => {
      const fetchResult = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const response = await fetchResult.json();

      if (response.success) setLoggedIn(true);

      return response;
    },
    logOut: () => {
      setLoggedIn(false);
    },
  };

  return (
    <MainContext.Provider value={contextValue}>
      <BrowserRouter>
        <Switch>{Routes(loggedIn)}</Switch>
      </BrowserRouter>
    </MainContext.Provider>
  );
};

export default App;
