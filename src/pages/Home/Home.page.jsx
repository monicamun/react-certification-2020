import React, { useRef } from 'react';
// import { useHistory } from 'react-router-dom';
import Content from '../../components/Content';

// import { useAuth } from '../../providers/Auth';
import './Home.styles.css';

function HomePage() {
  const sectionRef = useRef(null);
  return (
    <section className="homepage" ref={sectionRef}>
      <Content />
    </section>
  );
}

export default HomePage;
