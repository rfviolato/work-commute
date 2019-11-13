import { hot } from 'react-hot-loader/root';
import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [date, setDate] = React.useState(null);

  React.useEffect(() => {
    fetch('/api/date')
      .then(response => response.text())
      .then(text => setDate(text));
  }, [setDate]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Current date from API: {date}</p>
      </header>
    </div>
  );
}

export default process.env.NODE_ENV === 'development' ? hot(App) : App;
