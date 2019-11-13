import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [date, setDate] = useState(null);

  useEffect(() => {
    async function fetchDate() {
      const data = await fetch('http://localhost:3000/api/date');
      const result = await data.text();

      setDate(result);
    }

    fetchDate();
  }, []);
  return <div className="App">Hello World! {date}</div>;
}

export default App;
