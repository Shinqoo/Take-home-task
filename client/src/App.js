import React, { useState, useCallback } from 'react'
import './App.css';

function App() {
  const [backendData, setBackendData] = useState("");
  const [numbers, setNumber] = useState([]);
  const [current, setCurrent] = useState(null);

  const enqueue = (event) => {
    event.preventDefault(); 
    if(event.target[0].value){
      const value = event.target[0].value;
      setNumber(num => [...num, value]);
      if (numbers.length === 0) {
        setCurrent(value);
        getQuote();
      }
    }else{
      alert("please enter a number");
    }
  };

  const dequeue = () => {
    const newArray = numbers.slice(1);
    setNumber(newArray);
    setCurrent(newArray[0]);
    if(newArray.length === 0){
      setBackendData("");
    }else{
      getQuote();
    }
  }

  const getQuote = useCallback(() => {
    fetch("http://localhost:5000/api", { method: "GET" })
      .then(response => response.json())
      .then(data => {
        setBackendData(data[0].quote);
      })
      .catch(error => {
        console.log("this is the error: ", error);
      });
  }, []);

  return (
    <div>
      <div>
        <form onSubmit={enqueue}>
          <input type="number" name="queue" />
          <button type="submit">enqueue</button>
        </form>
        <button onClick={dequeue}>dequeue</button>
      </div>

      <div className='parent'>
        <div className='child'>
          <h1>Active number</h1>
          <h2>{current}</h2>
          <p>{backendData}</p>
        </div>
        <div className='child'>
          <h1>the Queue: </h1>
          <ul>
            {numbers.map((element, idx) => (
              <li key={idx}>{element}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
