import Navigation from '../Navigation';
import AuthNav from '../AuthNav';
import UserMenu from '../UserMenu';
import { useSelector } from 'react-redux';
import { getIsAuthenticated } from '../../redux/auth';

import { header, headerContainer } from './AppBar.module.scss';

const classes = `container ${headerContainer}`;

const AppBar = () => {
  const isAuthenticated = useSelector(getIsAuthenticated);
  return (
    <header className={header}>
      <div className={classes}>
        <Navigation />
        {isAuthenticated ? <UserMenu /> : <AuthNav />}
      </div>
    </header>
  );
};

export default AppBar;
