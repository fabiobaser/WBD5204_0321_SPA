import React, { useState } from "react";

export default () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [age, setAge] = useState(18);

  const handleChange = (value, stateUpdater) => {
    stateUpdater(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = {
      firstname,
      lastname,
      age,
      timestamp: new Date().toLocaleString(),
    };

    console.log(form);

    fetch("http://localhost:3000/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then(console.log)
      .catch(console.error);
  };

  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="Vorname"
          name="firstname"
          value={firstname}
          onChange={(event) => handleChange(event.target.value, setFirstname)}
        />
        <input
          type="text"
          placeholder="Nachname"
          name="lastname"
          value={lastname}
          onChange={(event) => handleChange(event.target.value, setLastname)}
        />
        <input
          type="number"
          placeholder="Alter"
          name="age"
          value={age}
          onChange={(event) => handleChange(event.target.value, setAge)}
        />
        <input type="submit" onClick={handleSubmit} />
      </form>
    </div>
  );
};
