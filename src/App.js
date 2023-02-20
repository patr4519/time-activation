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
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);

  const addDateToServer = async () => {
    try {
      const { data } = await axios.post(
        "https://63de9e9ff1af41051b16642d.mockapi.io/activations",
        {
          activationTime: Date.now(),
        }
      );

      setActivations((prev) => [...prev, data]);
    } catch (error) {
      alert("Не удалось добавить элемент");
    }
  };

  const onRemoveId = async (id) => {
    try {
      const { data } = await axios.delete(
        `https://63de9e9ff1af41051b16642d.mockapi.io/activations/${id}`
      );

      setActivations((prev) => prev.filter((item) => item.id !== data.id));
    } catch (error) {
      alert("Не удалось удалить элемент");
    }
  };

  return (
    <div className="App">
      <h1>Last activation(s)</h1>
      {activation.length > 0
        ? activation.map((item) => {
            return (
              <Items
                id={item.id}
                value={item.activationTime}
                onRemoveId={onRemoveId}
                key={item.activationTime}
              />
            );
          })
        : ""}
      <div className="activation">
        <button onClick={addDateToServer}>Add new</button>
      </div>
    </div>
  );
}

function Items({ value, id, onRemoveId }) {
  const timePassed = Date.now() - value;
  const activationTime = new Date(value).toString().slice(3, 25);

  return (
    <div
      className={`activation ${
        Math.floor(timePassed / 1000 / 60) >= 1 ? "true" : "false"
      }`}
    >
      <div>Date activation: {activationTime}</div>
      <div>Time has passed: {Math.floor(timePassed / 1000 / 60)} min</div>
      <button onClick={() => onRemoveId(id)}>delete</button>
    </div>
  );
}

export default App;