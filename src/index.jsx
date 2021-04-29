import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import './global.css';

const { worker } =
  process.env.NODE_ENV === 'development' ? require('./mocks/browser') : { worker: { start: () => {} }};

if (process.env.NODE_ENV === 'development') {
  worker.start();
}

ReactDOM.render(<App />, document.getElementById('root'));
