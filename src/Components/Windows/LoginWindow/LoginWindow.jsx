import classNames from 'classnames';
import 'firebase/auth';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Button from '../../Helpers/Button/Button';
import '../../utils.scss';
import Loader from '../../Helpers/Loader/Loader';
import { login, signup } from './logic';
import './LoginWindow.scss';

class LoginWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errors: new Set(),
      errorText: '',
    };
    this.logInCallback = name => props.onLogIn(name);
  }

  onUsernameChange(e) {
    const username = e.target.value;
    this.setState({ username });
    if (username) {
      this.setState((prevState) => {
        const newState = { ...prevState };
        newState.errors.delete('username');
        return newState;
      });
    }
  }

  onPasswordChange(e) {
    const password = e.target.value;
    this.setState({ password });
    if (password) {
      this.setState((prevState) => {
        const newState = { ...prevState };
        newState.errors.delete('password');
        return newState;
      });
    }
  }

  async onLogIn() {
    const { username, password } = this.state;
    if (!this.validateInput({ username, password })) return;
    this.setState({ loading: true });
    try {
      await login(username, password);
    } catch ({ message: errorText }) {
      this.setState({ errorText });
      return;
    } finally {
      this.setState({ loading: false });
    }
    this.logInCallback(username);
  }

  async onSignUp() {
    const { username, password } = this.state;
    if (!this.validateInput({ username, password })) return;
    this.setState({ loading: true });
    try {
      await signup(username, password);
    } catch ({ message: errorText }) {
      this.setState({ errorText });
      return;
    } finally {
      this.setState({ loading: false });
    }
    this.logInCallback(username);
  }

  validateInput({ username, password }) {
    let valid = true;
    if (!username) {
      this.setState((prevState) => {
        const newState = { ...prevState };
        newState.errors.add('username');
        return newState;
      });
      valid = false;
    }
    if (!password) {
      this.setState((prevState) => {
        const newState = { ...prevState };
        newState.errors.add('password');
        return newState;
      });
      valid = false;
    }
    return valid;
  }

  render() {
    const { errors, errorText, loading } = this.state;
    const initialRowClass = 'login-window__row';
    const usernameInputClasses = classNames(
      initialRowClass,
      { invalid: errors.has('username') },
    );
    const passwordInputClasses = classNames(
      initialRowClass,
      { invalid: errors.has('password') },
    );
    const errorMessageClasses = classNames(
      initialRowClass,
      'login-window__error-message',
      { visible: Boolean(errorText) },
    );
    return (
      <div className="login-window horizontal-center">
        <div className={usernameInputClasses}>
          <label htmlFor="username-input">
            <span className="login-window__label">Username:</span>
            <input type="text" id="username-input" onChange={e => this.onUsernameChange(e)} autoFocus />
          </label>
        </div>
        <div className={passwordInputClasses}>
          <label htmlFor="password-input">
            <span className="login-window__label">Password:</span>
            <input type="password" id="password-input" onChange={e => this.onPasswordChange(e)} />
          </label>
        </div>
        <div className={errorMessageClasses}>{errorText}</div>
        {loading && <Loader />}
        <div className="login-window__input-row">
          <Button onClick={() => this.onLogIn()}>Log in</Button>
          <Button onClick={() => this.onSignUp()}>Sign up</Button>
        </div>
      </div>
    );
  }
}

LoginWindow.propTypes = {
  onLogIn: PropTypes.func.isRequired,
};


export default LoginWindow;
