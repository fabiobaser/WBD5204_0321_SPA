import React, { useState } from "react";
import { Button, Card, Checkbox, Form } from "semantic-ui-react";
import { useMainContext } from "../Components/App";
import { Redirect, useHistory } from "react-router-dom";

export default () => {
  const context = useMainContext();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  const [registerResult, setRegisterResult] = useState({
    success: false,
    code: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    if (username === "" || password === "" || password !== passwordRepeat)
      return;

    context.register(username, password).then((result) => {
      if (!result.success) setRegisterResult(result);
    });
  };

  const handleInput = (event) => {
    const { name, value } = event.target;

    const setter = {
      username: setUsername,
      password: setPassword,
      passwordRepeat: setPasswordRepeat,
    };

    const setFunction = setter[name];

    setFunction(value);
  };

  console.log(registerResult);

  if (context.loggedIn) return <Redirect to={"/users"} />;

  return (
    <div>
      {registerResult.success && <Redirect to={"/users"} />}
      <Card style={{ margin: "auto", marginTop: "4rem", padding: "2rem" }}>
        <h1>Registrieren</h1>
        <Form>
          <Form.Field>
            <label>Benutzername</label>
            <input
              placeholder="billybob64"
              name="username"
              value={username}
              onInput={handleInput}
            />
            {registerResult.code === "userExists" && (
              <p style={{ color: "red", fontSize: "80%", marginTop: "0.5rem" }}>
                Benutzername existiert bereits
              </p>
            )}
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
            {password.length <= 5 && (
              <p style={{ color: "red", fontSize: "80%", marginTop: "0.5rem" }}>
                Passwort muss mindestens 6 Zeichen lang sein
              </p>
            )}
          </Form.Field>
          <Form.Field>
            <label>Passwort wiederholen</label>
            <input
              placeholder="123456"
              type={"password"}
              name={"passwordRepeat"}
              value={passwordRepeat}
              onInput={handleInput}
            />
            {password !== passwordRepeat && (
              <p style={{ color: "red", fontSize: "80%", marginTop: "0.5rem" }}>
                Passwörter stimmen nicht überein
              </p>
            )}
          </Form.Field>
          <Form.Field>
            <Checkbox label="Ich habe die AGBs übersprungen aber akzeptiere sie trotzdem" />
          </Form.Field>
          <Button
            type="submit"
            fluid
            basic
            color={"green"}
            onClick={handleSubmit}
          >
            Registrieren
          </Button>
        </Form>
      </Card>
    </div>
  );
};
