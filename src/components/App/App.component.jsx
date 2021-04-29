import React, { useLayoutEffect } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import AuthProvider from '../../providers/Auth';
import HomePage from '../../pages/Home';
import LoginPage from '../../pages/Login';
import NotFound from '../../pages/NotFound';
import Layout from '../Layout';
import { random } from '../../utils/fns';
import { GlobalContextProvider } from '../../providers/GlobalContext/GlobalContext';
import VideoDetails from '../VideoDetails/VideoDetails.component';
import Favorites from '../Favorites/Favorites.component';
import PrivateComponent from '../PrivateComponent/Private.component';

function App() {
  useLayoutEffect(() => {
    const { body } = document;

    function rotateBackground() {
      const xPercent = random(100);
      const yPercent = random(100);
      body.style.setProperty('--bg-position', `${xPercent}% ${yPercent}%`);
    }

    const intervalId = setInterval(rotateBackground, 3000);
    body.addEventListener('click', rotateBackground);

    return () => {
      clearInterval(intervalId);
      body.removeEventListener('click', rotateBackground);
    };
  }, []);

  return (
    <Router>
      <AuthProvider>
        <GlobalContextProvider>
          <Layout>
            <Switch>
              <Route exact path="/">
                <HomePage />
              </Route>
              <Route exact path="/login">
                <LoginPage />
              </Route>
              <Route exact path="/favorites/:videoId">
                <PrivateComponent>
                  <VideoDetails />
                </PrivateComponent>
              </Route>
              <Route exact path="/favorites">
                <PrivateComponent>
                  <Favorites />
                </PrivateComponent>
              </Route>
              <Route exact path="/:videoId">
                <VideoDetails />
              </Route>
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
          </Layout>
        </GlobalContextProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
