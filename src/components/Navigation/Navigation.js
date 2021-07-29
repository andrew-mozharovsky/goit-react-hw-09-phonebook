import { NavLink } from 'react-router-dom';
import { link, activeLink } from './Navigation.module.scss';
import { useSelector } from 'react-redux';
import { getIsAuthenticated } from '../../redux/auth';

const Navigation = () => {
  const isAuthenticated = useSelector(getIsAuthenticated);
  return (
    <nav>
      <NavLink to="/" exact className={link} activeClassName={activeLink}>
        Главная
      </NavLink>
      {isAuthenticated && (
        <NavLink
          to="/contacts"
          exact
          className={link}
          activeClassName={activeLink}
        >
          Контакты
        </NavLink>
      )}
    </nav>
  );
};

export default Navigation;
