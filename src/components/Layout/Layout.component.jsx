import React, { useEffect, useState } from 'react';
import NavBar from './NavBar.component';
import { useGlobal } from '../../providers/GlobalContext/GlobalContext';

import './Layout.styles.css';

function Layout({ children }) {
  const globalContext = useGlobal();
  const [theme, setTheme] = useState('lightTheme');

  useEffect(() => {
    setTheme(globalContext.themeState);
  }, [globalContext.themeState]);

  return (
    <main className={`container ${theme}`}>
      <NavBar />
      {children}
    </main>
  );
}

export default Layout;
