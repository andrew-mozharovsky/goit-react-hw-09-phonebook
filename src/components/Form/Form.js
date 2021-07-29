import React, { useState, useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { phonebookOperations, getContacts } from '../../redux/phonebook';

import { CSSTransition } from 'react-transition-group';
import Alert from '../Alert';

import styles from './Form.module.scss';

const Form = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [alert, setAlert] = useState(false);
  const dispatch = useDispatch();

  const addContact = (name, number) =>
    dispatch(phonebookOperations.addContact(name, number));
  const contacts = useSelector(getContacts);

  const getContactValue = useCallback(e => {
    const { name, value } = e.target;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        console.warn(`Нет такого поля`);
    }
  }, []);

  const findContactName = contactName => {
    return contacts.find(({ name }) => name === contactName);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (findContactName(name)) {
      setName('');
      setNumber('');
      setAlert(true);
      setTimeout(() => setAlert(false), 2000);
      return;
    }
    addContact(name, number);
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <CSSTransition
        in={alert}
        appear
        timeout={500}
        classNames={styles}
        unmountOnExit
      >
        <Alert />
      </CSSTransition>
      <label className={styles.label}>
        Name
        <input
          className={styles.inputs}
          type="text"
          name="name"
          autoComplete="off"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          required
          value={name}
          onChange={getContactValue}
        />
      </label>
      <label className={styles.label}>
        Number
        <input
          className={styles.inputs}
          type="tel"
          name="number"
          autoComplete="off"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
          required
          value={number}
          onChange={getContactValue}
        />
      </label>
      <button type="submit" className={styles.button}>
        add contact
      </button>
    </form>
  );
};

export default Form;
