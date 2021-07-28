import React, { useState, useCallback } from 'react';
import {
  form,
  label,
  loginContainer,
  inputs,
  button,
  title,
} from './LoginView.module.scss';
import { useDispatch } from 'react-redux';
import { logIn } from '../../redux/auth';

const LoginView = () => {
  const classes = `container ${loginContainer}`;
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = useCallback(e => {
    const { name, value } = e.target;

    switch (name) {
      case 'email':
        setEmail(value);
        break;

      case 'password':
        setPassword(value);
        break;

      default:
        console.warn(`Нет такого поля`);
    }
  }, []);

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      dispatch(logIn({ email, password }));
      setEmail('');
      setPassword('');
    },
    [email, password, dispatch],
  );

  return (
    <div className={classes}>
      <h1 className={title}>Страница логина</h1>

      <form onSubmit={handleSubmit} className={form} autoComplete="off">
        <label className={label}>
          Почта
          <input
            className={inputs}
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </label>

        <label className={label}>
          Пароль
          <input
            className={inputs}
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </label>

        <button className={button} type="submit">
          Войти
        </button>
      </form>
    </div>
  );
};

export default LoginView;
