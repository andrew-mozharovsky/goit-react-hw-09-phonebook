import React, { Suspense, lazy, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import AppBar from './components/AppBar/AppBar';
import routes from './routes';

import { getCurrentUser } from './redux/auth';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import { Spinner } from './components/Loader';

const HomeView = lazy(() => import('./views/HomeView/HomeView'));
const ContactsViews = lazy(() => import('./views/ContactsViews/ContactsViews'));
const RegisterView = lazy(() => import('./views/RegisterView'));
const LoginView = lazy(() => import('./views/LoginView'));

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <>
      <AppBar />
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route exact path={routes.home} component={HomeView} />
          <PrivateRoute
            path={routes.contacts}
            component={ContactsViews}
            redirectTo={routes.login}
          />
          <PublicRoute
            redirectTo={routes.contacts}
            restricted
            path={routes.register}
            component={RegisterView}
          />
          <PublicRoute
            redirectTo={routes.contacts}
            restricted
            path={routes.login}
            component={LoginView}
          />
        </Switch>
      </Suspense>
    </>
  );
};

export default App;
