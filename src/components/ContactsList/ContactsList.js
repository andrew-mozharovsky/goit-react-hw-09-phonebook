import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import {
  phonebookOperations,
  getFilteredContacts,
  getLoading,
  getError,
} from '../../redux/phonebook';
import { Error } from '../Error';
import { Spinner } from '../Loader';

import styles from './ContactsList.module.scss';

// const mapStateToProps = state => {
//   return {
//     contacts: getFilteredContacts(state),

//   };
// };

// const mapDispatchToProps = dispatch => ({
//   deleteContact: id => dispatch(phonebookOperations.deleteContact(id)),
//   fetchContacts: () => dispatch(phonebookOperations.fetchContacts()),
// });

//  componentDidMount() {
//     this.props.fetchContacts();
//   }

// const { contacts, deleteContact, isLoading, isError } = this.props;

const ContactsList = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getLoading);
  const isError = useSelector(getError);
  const contacts = useSelector(getFilteredContacts);
  const deleteContact = useCallback(
    id => dispatch(phonebookOperations.deleteContact(id)),
    [dispatch],
  );

  useEffect(() => {
    dispatch(phonebookOperations.fetchContacts());
  }, [dispatch]);

  return (
    <>
      {isLoading && <Spinner />}
      {isError && <Error />}
      <TransitionGroup component="ul" className={styles.list}>
        {contacts.map(({ name, id, number }) => (
          <CSSTransition key={id} timeout={500} classNames={styles}>
            <li key={id} className={styles.item}>
              <span className={styles.item_name}>{name}</span>
              <span className={styles.item_number}>{number}</span>

              <button
                className={styles.button}
                type="button"
                onClick={() => deleteContact(id)}
              >
                Delete
              </button>
            </li>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </>
  );
};

export default ContactsList;
