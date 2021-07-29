import React, { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { contact_filter, getFilter } from '../../redux/phonebook';

import styles from './Filter.module.scss';

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);

  const onChange = useCallback(
    e => dispatch(contact_filter(e.target.value)),
    [dispatch],
  );

  return (
    <label className={styles.label}>
      Find contacts by name
      <input
        className={styles.input}
        type="text"
        name="filter"
        onChange={onChange}
        value={filter}
        autoComplete="off"
      />
    </label>
  );
};

export default Filter;
