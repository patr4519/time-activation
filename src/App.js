import "./App.scss";
import React from "react";
import { useState } from "react";
import axios from "axios";
import Skeleton from "./components/Skeleton";
import Plug from "./components/Plug";

function App() {
  const [activation, setActivations] = useState([]);
  const [requestToServer, setRequestToServer] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [plug, setPlug] = useState(false);

  React.useEffect(() => {
    axios
      .get("https://63de9e9ff1af41051b16642d.mockapi.io/activations")
      .then((res) => {
        setActivations(res.data);
      })
      .then(() => setIsLoading(false))
      .catch((error) => {
        console.log(error.message);
      });

    setTimeout(() => {
      setRequestToServer((prev) => prev + 1);
    }, 60000);
  }, [requestToServer]);

  const addDateToServer = async () => {
    setPlug(true);
    try {
      const { data } = await axios.post(
        "https://63de9e9ff1af41051b16642d.mockapi.io/activations",
        {
          activationTime: Date.now(),
          userName: inputValue ? inputValue : 'unknown',
        }
      );

      setActivations((prev) => [...prev, data]);
      setInputValue('');
      setPlug(false);
    } catch (error) {
      alert("Не удалось добавить пользователя");
    }
  };

  const onRemoveId = async (id) => {
    let userAnswer = window.confirm("Are you sure?");

    if (userAnswer) {
      try {
        const { data } = await axios.delete(
          `https://63de9e9ff1af41051b16642d.mockapi.io/activations/${id}`
        );

        setActivations((prev) => prev.filter((item) => item.id !== data.id));
      } catch (error) {
        alert("Не удалось удалить пользователя");
      }
    }
  };

  const onInputChange = (e) => {
    setInputValue(e.target.value)
  };

  return (
        <div className="App">
          <h1>Last activation(s)</h1>
          {isLoading ? (
            <Skeleton />
          ) : (
            activation.length >= 0 &&
            activation.map((item) => {
              return (
                <Items
                  id={item.id}
                  userName={item.userName}
                  value={item.activationTime}
                  onRemoveId={onRemoveId}
                  key={item.activationTime}
                />
              );
            })
          )}
          {
            plug && <Plug />
          }
          {activation.length < 5 && (
            <>
              <input placeholder="User name..." value={inputValue} onChange={(e) => onInputChange(e)}/>
              <button className="addBtn" onClick={addDateToServer}>
                Add new
              </button>
            </>
          )}
        </div>
  );
}

function Items({ value, id, onRemoveId, userName }) {
  const timePassed = Math.floor((Date.now() - value) / 1000 / 60 / 60); // прошло полных часов с момента активации
  const activationTime = new Date(value).toString().slice(3, 25); // время активации (с сервера)
  const waitTime = 24 - timePassed;

  return (
    <div
      className={`activation ${timePassed >= 24 ? "avalible" : "notAvalible"}`}
    >
      <div>Date activation: {activationTime}</div>
      <div>Time has passed: {timePassed} hours</div>
      {waitTime >= 0 ? (
        <div>Waiting time: {waitTime} hour(s).</div>
      ) : (
        <div>Activation is avalible</div>
      )}
      <div>User name: {userName}</div>
      <button onClick={() => onRemoveId(id)}>Delete</button>
    </div>
  );
}

// let msUTC = Date.parse('2023-02-19T14:00:00.000Z'); // Местное время 11:00 ?

export default App;
