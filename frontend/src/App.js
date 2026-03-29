import React, { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

function App() {
  const [data, setData] = useState(null);
  const [history, setHistory] = useState([]);

  const fetchSimulation = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/simulate");

      setData(res.data);

      setHistory((prev) => [
        ...prev,
        {
          time: prev.length + 1,
          price: res.data.price
        }
      ]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSimulation();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Oil Shock Dashboard</h1>

      <button onClick={fetchSimulation}>
        Run Simulation
      </button>

      {data && (
        <div style={{ marginTop: "20px" }}>
          <h2>Shock Type: {data.shock.type}</h2>
          <p><b>Impact:</b> {data.shock.impact}</p>
          <p><b>Price:</b> {data.price}</p>
          <p><b>Inflation:</b> {data.inflation}</p>
          <p><b>Energy Sector:</b> {data.energy_sector}</p>
          <p><b>Airline Sector:</b> {data.airline_sector}</p>
        </div>
      )}

      <h2>Price Trend</h2>

      <LineChart width={600} height={300} data={history}>
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="price" />
      </LineChart>
    </div>
  );
}

export default App;