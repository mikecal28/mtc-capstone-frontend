import React, { useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "../styles/app.scss";
import LoginPage from "./pages/auth/LoginPage";
import LoginContainer from "./navigation/LoginContainer";
import DefaultContainer from "./navigation/DefaultContainer";
import solidIcons from "../util/fontawesome-icons/solidIcons";
import brandIcons from "../util/fontawesome-icons/brandIcons";

solidIcons();
brandIcons();

function App() {
  const [authToken, setAuthToken] = useState(null);

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/login"
            render={(props) => {
              return (
                <LoginPage
                  {...props}
                  authToken={authToken}
                  setAuthToken={setAuthToken}
                />
              );
            }}
          />

          <Route
            exact
            path="/login/email/sent"
            render={(props) => {
              return (
                <LoginContainer
                  {...props}
                  authToken={authToken}
                  setAuthToken={setAuthToken}
                />
              );
            }}
          />

          <Route
            exact
            path="/login/password/recovery"
            render={(props) => {
              return (
                <LoginContainer
                  {...props}
                  authToken={authToken}
                  setAuthToken={setAuthToken}
                />
              );
            }}
          />

          <Route
            exact
            path="/login/password/temporary"
            render={(props) => {
              return (
                <LoginContainer
                  {...props}
                  authToken={authToken}
                  setAuthToken={setAuthToken}
                />
              );
            }}
          />

          <Route
            exact
            path="/login/password/change"
            render={(props) => {
              return (
                <LoginContainer
                  {...props}
                  authToken={authToken}
                  setAuthToken={setAuthToken}
                />
              );
            }}
          />

          <Redirect exact from="/" to="/login" />

          <Route
            exact
            render={(props) => (
              <DefaultContainer
                {...props}
                authToken={authToken}
                setAuthToken={setAuthToken}
              />
            )}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
