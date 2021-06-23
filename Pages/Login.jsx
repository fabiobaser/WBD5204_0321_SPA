import React, { useState } from "react";
import { Button, Card, Checkbox, Form } from "semantic-ui-react";
import { useMainContext } from "../Components/App";
import { Redirect, useHistory } from "react-router-dom";

export default () => {
  const context = useMainContext();
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [registerResult, setRegisterResult] = useState({
    success: false,
    code: "",
  });

  const handleClick = (event) => {
    event.preventDefault();

    if (username === "" && password === "") {
      setRegisterResult({ success: false, code: "missingCredentials" });
      return;
    }

    context.logIn(username, password).then(setRegisterResult);
  };

  const handleInput = (event) => {
    const { name, value } = event.target;

    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const redirectToRegister = () => {
    console.log("Hallo");
    history.push("/register");
  };

  if (context.loggedIn) return <Redirect to={"/users"} />;

  return (
    <div>
      <Card style={{ margin: "auto", marginTop: "4rem", padding: "2rem" }}>
        <h1>Anmelden</h1>
        <Form>
          <Form.Field>
            <label>Benutzername</label>
            <input
              placeholder="billybob64"
              name="username"
              value={username}
              onInput={handleInput}
            />
          </Form.Field>
          <Form.Field>
            <label>Passwort</label>
            <input
              placeholder="123456"
              type={"password"}
              name={"password"}
              value={password}
              onInput={handleInput}
            />
          </Form.Field>
          {registerResult.code === "wrongCredentials" && (
            <>
              <p style={{ color: "red", fontSize: "80%", marginTop: "0.5rem" }}>
                Der Benutzername und Passwort sind flasch
              </p>
              <h4 style={{ textAlign: "center" }}>Password vergessen?</h4>
            </>
          )}
          {registerResult.code === "missingCredentials" && (
            <p style={{ color: "red", fontSize: "80%", marginTop: "0.5rem" }}>
              Die Felder müssen ausgefüllt werden
            </p>
          )}
          <Button
            type="submit"
            fluid
            basic
            color={"green"}
            onClick={handleClick}
          >
            Anmelden
          </Button>
          <h4 onClick={redirectToRegister} style={{ textAlign: "center" }}>
            Jetzt registrieren
          </h4>
        </Form>
      </Card>
    </div>
  );
};
