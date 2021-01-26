import axios from "axios";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Button, Form, Icon, Message, Segment } from "semantic-ui-react";
import { handleLogin } from "../utils/auth";
import baseUrl from "../utils/baseUrl";
import catchErrors from "../utils/catchErrors";

type State = {
  name: string,
  email: string,
  password: string
};

const defaultUser: State = {
  name: "",
  email: "",
  password: ""
}

function Signup(): JSX.Element {
  const [user, setUser] = useState(defaultUser);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => setDisabled(!Object.values(user).every(val => Boolean(val))), [user]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setUser((prevState) => ({ ...prevState, [name]: value }));
    },
    []
  );

  const handleSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();

      try {
        setLoading(true);
        setError("");
        const url = `${baseUrl}/api/signup`;
        const payload = { ...user };
        const response = await axios.post(url, payload);
        handleLogin(response.data);
      } catch (error) {
        catchErrors(error, setError);
      } finally {
        setLoading(false);
      }
    },
    [user]
  );

  return (
    <>
      <Message attached
        icon="settings"
        header="Get Started!"
        content="Create a new account"
        color="teal"
      />
      <Form
        onSubmit={handleSubmit}
        loading={loading}
        error={Boolean(error)}
      >
        <Message
          error
          header="Oups!"
          content={error}
        />
        <Segment>
          <Form.Input
            fluid
            icon="user"
            iconPosition="left"
            label="Name"
            placeholder="Name"
            name="name"
            onChange={handleChange}
            value={user.name}
          />
          <Form.Input
            fluid
            icon="envelope"
            iconPosition="left"
            label="Email"
            placeholder="Email"
            name="email"
            type="email"
            onChange={handleChange}
            value={user.email}
          />
          <Form.Input
            fluid
            icon="lock"
            iconPosition="left"
            label="Password"
            placeholder="Password"
            name="password"
            type="password"
            onChange={handleChange}
            value={user.password}
          />
          <Button
            disabled={disabled || loading}
            icon="signup"
            type="submit"
            color="orange"
            content="Signup"
          />
        </Segment>
      </Form>
      <Message attached="bottom" warning>
        <Icon name="help" />
        Existing user?{" "}
        <Link href="/login">
          <a>Log in here</a>
        </Link>{" "}instead.
      </Message>
    </>
  );
}

export default Signup;
