import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// fonts
import 'typeface-roboto';

if (!window.requestIdleCallback) {
  window.requestIdleCallback = (cb: Function) => setTimeout(cb, 100);
}

ReactDOM.render(<App />, document.getElementById('root'));
