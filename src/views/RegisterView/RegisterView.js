import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth';

import {
  form,
  label,
  registerContainer,
  title,
  button,
  inputs,
} from './RegisterView.module.scss';

const RegisterView = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      dispatch(register({ name, email, password }));
      setName('');
      setEmail('');
      setPassword('');
    },
    [name, email, password, dispatch],
  );

  const handleChange = useCallback(e => {
    const { name, value } = e.target;

    switch (name) {
      case 'name':
        setName(value);
        break;

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

  const classes = `container ${registerContainer}`;
  return (
    <div className={classes}>
      <h1 className={title}>Страница регистрации</h1>

      <form onSubmit={handleSubmit} className={form} autoComplete="off">
        <label className={label}>
          Имя
          <input
            className={inputs}
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
          />
        </label>

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
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
};

export default RegisterView;
