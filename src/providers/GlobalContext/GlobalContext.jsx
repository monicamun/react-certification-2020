import React, { useReducer, createContext, useState, useEffect } from 'react';

const GlobalContext = createContext();

export function GlobalContextProvider({ children }) {
  const { localStorage } = window;
  const { sessionStorage } = window;

  const searchTextReducer = (state, action) => {
    switch (action.type) {
      case 'set':
        return action.payload;
      default:
        return state;
    }
  };

  const themeReducer = (state, action) => {
    switch (action.type) {
      case 'setLightTheme':
        return 'lightTheme';
      case 'setDarkTheme':
        return 'darkTheme';
      default:
        return state;
    }
  };

  const favoritesReducer = (state, action) => {
    switch (action.type) {
      case 'add':
        return [...state, action.payload];
      case 'remove':
        return state.filter((v) => v.videoId !== action.payload);
      default:
        throw new Error('Invalid favoritesReducer action type');
    }
  };

  const [searchState, searchTextDispatch] = useReducer(searchTextReducer, 'wizeline');
  const [themeState, themeDispatch] = useReducer(themeReducer, 'lightTheme');
  const [openLogin, setOpenLogin] = useState(false);
  const initialUser = JSON.parse(sessionStorage.getItem('user'));
  const [user, setUser] = useState(initialUser);
  const initialFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const [favorites, favoritesDispatch] = useReducer(favoritesReducer, initialFavorites);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [localStorage, favorites]);

  useEffect(() => {
    sessionStorage.setItem('user', JSON.stringify(user));
  }, [sessionStorage, user]);

  return (
    <GlobalContext.Provider
      value={{
        searchState,
        searchTextDispatch,
        themeState,
        themeDispatch,
        openLogin,
        setOpenLogin,
        user,
        setUser,
        favorites,
        favoritesDispatch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export const useGlobal = () => React.useContext(GlobalContext);
