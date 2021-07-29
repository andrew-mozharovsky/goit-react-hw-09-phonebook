import { useSelector, useDispatch } from 'react-redux';
import { getUserEmail, logOut } from '../../redux/auth';

import { button, user } from './UserMenu.module.scss';

const UserMenu = () => {
  const email = useSelector(getUserEmail);
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logOut());
  };

  return (
    <div>
      {/* <img src={avatar} alt="" width="32" /> */}
      <span>
        Welcome, <span className={user}>{email}</span>{' '}
      </span>
      <button className={button} type="button" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
};

export default UserMenu;
