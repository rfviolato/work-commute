import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import '@rfviolato/private-registry/font-awesome-5/css/fontawesome.css';
import '@rfviolato/private-registry/font-awesome-5/css/solid.css';
import '@rfviolato/private-registry/font-awesome-5/css/regular.css';

// fonts
import 'typeface-roboto';

if (!window.requestIdleCallback) {
  window.requestIdleCallback = (callback: Function) => setTimeout(callback, 100);
}

ReactDOM.render(<App />, document.getElementById('root'));
