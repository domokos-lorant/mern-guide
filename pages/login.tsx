import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Button, Form, Icon, Message, Segment } from "semantic-ui-react";
import catchErrors from "../utils/catchErrors";

type State = {
  email: string,
  password: string
};

const defaultUser: State = {
  email: "",
  password: ""
}

function Login(): JSX.Element {
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
        console.log(user);
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
        icon="privacy"
        header="Welcome Back!"
        content="Log in with email and password"
        color="blue"
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
            icon="sign in"
            type="submit"
            color="orange"
            content="Login"
          />
        </Segment>
      </Form>
      <Message attached="bottom" warning>
        <Icon name="help" />
        New user?{" "}
        <Link href="/signup">
          <a>Sign up here</a>
        </Link>{" "}instead.
      </Message>
    </>
  );
}

export default Login;
