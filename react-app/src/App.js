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
import SessionProfile from './components/SessionProfile/SessionPreofile';
import { authenticate } from './store/session';
import GetAllListings from './components/Listings/GetListings/GetAllListings';
import CreateListing from './components/Listings/CreateListing/CreateListing';
import SplashPage from './components/SplashPage/SplashPage';
import ListingDetails from './components/Listings/ListingDetails/ListingDetails';
import Cart from './components/Cart/Cart.js/Cart';
import LeaveAReview from './components/Reviews/LeaveAReview/LeaveAReview';
import SearchedListings from './components/Search/SearchedListings';

function App() {
  const [loaded, setLoaded] = useState(false);
  const [length, setLength] = useState('')
  const [searchedList, setSearchedList] = useState('')
  // const [searchedListings, setSearchedListings] = useState([])
  const dispatch = useDispatch();

  const handelSearchListings = (list) => {
    if(!localStorage.getItem('searched')) {

      localStorage.setItem('searched', JSON.stringify(list))

    } else {


      localStorage.removeItem('searched')


      localStorage.setItem('searched', JSON.stringify(list))


    }
    setSearchedList(localStorage.getItem('searched'))
  }
     let searchedListings = localStorage.getItem('searched')
     searchedListings = JSON.parse(searchedListings)
    if(!searchedListings) searchedListings = []






  const numItemSetter = (num) => {
    setLength(num)
  }

  const url = window.location.href

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
      // const cartItems = Object.values(localStorage)
      // let cartItems = ''
      if(localStorage.getItem('searched')) {
            setLength(Object.values(localStorage).length - 1)
      } else {
           setLength(Object.values(localStorage).length)
      }
      // setLength(cartItems.length)
    })();
  }, [dispatch, url]);

  const user = useSelector(state => state.session.user)

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar length={length} user={user} numItemSetter={numItemSetter} handelSearchListings={handelSearchListings} />
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
          <Profile numItemSetter={numItemSetter} />
        </ProtectedRoute>
        <ProtectedRoute path='/user/profile'>
          <SessionProfile user={user} />
        </ProtectedRoute>
        <Route path='/' exact={true} >
          <SplashPage numItemSetter={numItemSetter} user={user} />
        </Route>
        <ProtectedRoute path='/users/:userId/records/sell-record'>
            <CreateListing user={user} />
        </ProtectedRoute>
        <ProtectedRoute path='/records/:recordId/edit-record'>
            <CreateListing user={user} />
        </ProtectedRoute>
        <Route path='/records/all'>
           <GetAllListings user={user} numItemSetter={numItemSetter} />
        </Route>
        <Route path='/records/:recordId/details'>
          <ListingDetails user={user} numItemSetter={numItemSetter} />
        </Route>
        <Route path='/cart'>
          <Cart user={user} numItemSetter={numItemSetter} />
        </Route>
        <ProtectedRoute path='/records/:recordId/review'>
            <LeaveAReview user={user} />
        </ProtectedRoute>
        <ProtectedRoute path='/reviews/:reviewId/edit-review'>
           <LeaveAReview user={user} />
        </ProtectedRoute>
        <Route exact={true} path='/records/searched'>
          <SearchedListings searchedListings={searchedListings} numItemSetter={numItemSetter} searchedList={searchedList} />
        </Route>
        <Route path='/'>
          <main className='page-not-found-container'>
          <h2 className='page-not-found'>Error 404: page not found!</h2>
          </main>
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
