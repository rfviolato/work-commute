import React from 'react';
import { hot } from 'react-hot-loader/root';

const App: React.FC = () => {
  return <div>hell yea!</div>;
};

export default process.env.NODE_ENV === 'development' ? hot(App) : App;
