import React, { useState } from "react";
import { Button, Card, Checkbox, Form } from "semantic-ui-react";
import { useMainContext } from "../Components/App";
import { Redirect } from "react-router-dom";

export default () => {
  const context = useMainContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = (event) => {
    event.preventDefault();

    context.logIn(username, password);
  };

  const handleInput = (event) => {
    const { name, value } = event.target;

    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  if (context.loggedIn) return <Redirect to={"/users"} />;

  return (
    <div>
      <Card style={{ margin: "auto", marginTop: "4rem", padding: "2rem" }}>
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
          <Form.Field>
            <Checkbox label="Ich habe die AGBs übersprungen aber akzeptiere sie trotzdem" />
          </Form.Field>
          <Button
            type="submit"
            fluid
            basic
            color={"green"}
            onClick={handleClick}
          >
            Anmelden
          </Button>
        </Form>
      </Card>
    </div>
  );
};
