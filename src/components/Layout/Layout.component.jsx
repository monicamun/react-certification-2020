import React from 'react';
import NavBar from './NavBar.component';

// import './Layout.styles.css';

function Layout({ children }) {
  return (
    <main className="container">
      <NavBar />
      {children}
    </main>
  );
}

export default Layout;
