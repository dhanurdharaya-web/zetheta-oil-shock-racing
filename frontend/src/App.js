import React, { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

function App() {
  const [data, setData] = useState(null);
  const [history, setHistory] = useState([]);

  const [portfolio, setPortfolio] = useState({
    cash: 10000,
    energy: 0,
    airline: 0
  });

  const [score, setScore] = useState(0);

  // Fetch simulation
  const fetchSimulation = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:5000/api/simulate");

      setData(res.data);

      setHistory((prev) => [
        ...prev,
        { time: prev.length + 1, price: res.data.price }
      ]);
    } catch (err) {
      console.error("API error:", err);
    }
  };

  useEffect(() => {
    fetchSimulation();
  }, []);

  // GAME LOGIC
  const handleDecision = () => {
    if (!data) return;

    let change = 0;

    if (data.shock.type === "supply") {
      change += portfolio.energy * 10;
      change -= portfolio.airline * 5;
    }

    if (data.shock.type === "demand") {
      change -= portfolio.energy * 5;
      change += portfolio.airline * 10;
    }

    if (data.shock.type === "policy") {
      change += portfolio.energy * 3;
    }

    setScore((prev) => prev + change);
  };

  // Leaderboard
  const leaderboard = [
    { name: "Top Player", score: 150 },
    { name: "You", score: score }
  ];

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Oil Shock Racing</h1>

      <button onClick={fetchSimulation}>Run Simulation</button>

      {/* DATA DISPLAY */}
      {data ? (
        <div style={{ marginTop: "20px" }}>
          <h2>Shock: {data.shock.type}</h2>
          <p><b>Impact:</b> {data.shock.impact}</p>
          <p><b>Price:</b> {data.price}</p>
          <p><b>Inflation:</b> {data.inflation}</p>
          <p><b>Energy Sector:</b> {data.energy_sector}</p>
          <p><b>Airline Sector:</b> {data.airline_sector}</p>
        </div>
      ) : (
        <p>Loading simulation...</p>
      )}

      {/* CHART */}
      <h2>Price Trend</h2>
      <LineChart width={600} height={300} data={history}>
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="price" stroke="#8884d8" />
      </LineChart>

      {/* PORTFOLIO */}
      <h2>Portfolio</h2>
      <p>Cash: {portfolio.cash.toFixed(2)}</p>
      <p>Energy Stocks: {portfolio.energy}</p>
      <p>Airline Stocks: {portfolio.airline}</p>

      {/* BUY BUTTONS */}
      {data && (
        <>
          <button
            onClick={() => {
              if (portfolio.cash >= data.price) {
                setPortfolio((prev) => ({
                  ...prev,
                  energy: prev.energy + 1,
                  cash: prev.cash - data.price
                }));
              }
            }}
          >
            Buy Energy
          </button>

          <button
            onClick={() => {
              if (portfolio.cash >= data.price) {
                setPortfolio((prev) => ({
                  ...prev,
                  airline: prev.airline + 1,
                  cash: prev.cash - data.price
                }));
              }
            }}
          >
            Buy Airline
          </button>
        </>
      )}

      {/* GAME ACTION */}
      <br /><br />
      {data && (
        <button onClick={handleDecision}>
          Respond to Shock
        </button>
      )}

      <h2>Score: {score}</h2>

      {/* LEADERBOARD */}
      <h2>Leaderboard</h2>
      {leaderboard.map((player, index) => (
        <p key={index}>
          {player.name}: {player.score}
        </p>
      ))}

      {/* RESET */}
      <button
        onClick={() => {
          setPortfolio({ cash: 10000, energy: 0, airline: 0 });
          setScore(0);
          setHistory([]);
          setData(null);
        }}
      >
        Reset Game
      </button>
    </div>
  );
}

export default App;