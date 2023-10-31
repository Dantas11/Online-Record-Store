import { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { LOGIN } from "../utils/mutations";
import Auth from "../utils/auth";

function Login(props) {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="background-div">
      <div className="signin">
        <form onSubmit={handleFormSubmit}>
          <input
            placeholder="Email"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
          <input
            placeholder="Password"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />

          {error ? (
            <div>
              <p className="error-text">
                The provided credentials are incorrect
              </p>
            </div>
          ) : null}

          <button type="submit">Sign in</button>
          <h4>
            <span className="signin__gray">New to Vynil Store? </span>
            <span className="signin__link">
              <Link to="/signup">Sign up now</Link>
            </span>
          </h4>
        </form>
      </div>
    </div>

  );
}

export default Login;
