import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormModal";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AllSpots from "./components/AllSpots/allSpots";
import AddSpot from "./components/addSpot/addSpot";
import AllUserSpots from "./components/profilePage/userInfo";
import OneSpot from "./components/oneSpot/oneSpot";
import EditSpot from "./components/editSpot/editSpot";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <div className='app'>

        <Navigation isLoaded={isLoaded} />
        {isLoaded && (
          <Switch>
            <Route
              exact
              path='/'
            >
              <AllSpots />
            </Route>
            <Route
              exact
              path='/spots'
            >
              <AddSpot />
            </Route>
            <Route path='/spots/current'>
              <AllUserSpots />
            </Route>
            <Route path='/spots/:spotId/edit'>
              <EditSpot />
            </Route>
            <Route path='/spots/:spotId'>
              <OneSpot />
            </Route>
            <Route path='/signup'>
              <SignupFormPage />
            </Route>
          </Switch>
        )}
      </div>
    </>
  );
}

export default App;
