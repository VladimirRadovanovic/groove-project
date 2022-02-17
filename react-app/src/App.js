import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import Footer from './components/Footer/Footer';
import NavBar from './components/NavBar/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import Profile from './components/Profile/Profile';
import { authenticate } from './store/session';
import GetAllListings from './components/Listings/GetListings/GetAllListings';
import CreateListing from './components/Listings/CreateListing/CreateListing';
import SplashPage from './components/SplashPage/SplashPage';
import ListingDetails from './components/Listings/ListingDetails/ListingDetails';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  const url = window.location.href

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch, url]);

  const user = useSelector(state => state.session.user)

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId/profile' exact={true} >
          <Profile />
        </ProtectedRoute>
        <Route path='/' exact={true} >
          <SplashPage user={user} />
        </Route>
        <ProtectedRoute path='/users/:userId/records/sell-record'>
            <CreateListing user={user} />
        </ProtectedRoute>
        <ProtectedRoute path='/records/:recordId/edit-record'>
            <CreateListing user={user} />
        </ProtectedRoute>
        <Route path='/records/all'>
           <GetAllListings user={user} />
        </Route>
        <Route path='/records/:recordId/details'>
          <ListingDetails user={user}/>
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
