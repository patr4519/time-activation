import "./App.css";
import React from "react";
import { useState } from "react";
import axios from "axios";

function App() {
  const [activation, setActivations] = useState([]);

  React.useEffect(() => {
    axios
      .get("https://63de9e9ff1af41051b16642d.mockapi.io/activations")
      .then((res) => {
        setActivations(res.data);
      });
  }, []);

  return (
    <div className="App">
      <h1>Last activation(s)</h1>
      {activation.length > 0 ? (
        activation.map((item) => {
          return <Activation2 id={item.id} value={item.activationTime} key={item.activationTime}/>
        })
      ) : (
        'Loading...'
      )}
      <Activation />
    </div>
  );
}

function Activation() {
  const [state, setState] = useState();

  const handleClick = () => {
    setState(addCurrentDate);
  };

  const addCurrentDate = () => {
    axios.post("https://63de9e9ff1af41051b16642d.mockapi.io/activations", {
      activationTime: Date.now(),
    });

    return new Date().toString().slice(3, 25);
  };

  return (
    <div className="activation">
      <button onClick={handleClick}>Add new</button>
      <div>{state}</div>
    </div>
  );
}

function Activation2({ value, id }) {
  const timePassed = Date.now() - value;
  const activationTime = new Date(value).toString().slice(3, 25);

  const onRemoveId = (id) => {
    axios.delete(`https://63de9e9ff1af41051b16642d.mockapi.io/activations/${id}`)
  }

  return (
    <div className={`activation ${Math.floor(timePassed/1000/60) >= 1 ? 'true' : 'false'}`}>
      <div>Date activation: {activationTime}</div>
      <div>Time has passed: {Math.floor(timePassed/1000/60)} min</div>
      <button onClick={() => onRemoveId(id)}>delete</button>
    </div>
  );
}

export default App;
