import React, { useReducer, createContext } from 'react';

const GlobalContext = createContext();

export function GlobalContextProvider({ children }) {
  const searchTextReducer = (state, action) => {
    switch (action.type) {
      case 'set':
        return action.payload;
      default:
        return state;
    }
  };

  // const lightTheme = {
  //   bg: 'white',
  //   text: 'black',
  // };

  // const darkTheme = {
  //   bg: '#303030',
  //   text: 'white',
  // };

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

  const [searchState, searchTextDispatch] = useReducer(searchTextReducer, 'wizeline');
  const [themeState, themeDispatch] = useReducer(themeReducer, 'lightTheme');

  return (
    <GlobalContext.Provider
      value={{ searchState, searchTextDispatch, themeState, themeDispatch }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export const useGlobal = () => React.useContext(GlobalContext);
