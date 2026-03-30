# Oil Shock Racing

## Overview

Oil Shock Racing is a full-stack simulation platform that models oil price shocks and their impact on financial markets. It combines economic modeling, real-time visualization, and a gamified decision-making system.

The platform allows users to simulate oil shocks, analyze market reactions, and make portfolio decisions based on changing conditions.

---

## Key Features

*  Oil shock simulation (Supply, Demand, Policy)
*  Real-time price and inflation updates
*  Interactive price trend visualization (charts)
*  Portfolio management system (Energy & Airline stocks)
*  Decision-based scoring system (gamified experience)
*  Leaderboard display

---

## How It Works

1. User clicks **Run Simulation**
2. Backend triggers Python simulation engine
3. Shock is generated (supply/demand/policy)
4. Market variables are calculated:

   * Oil price
   * Inflation
   * Sector impact
5. Frontend displays results and updates chart
6. User makes investment decisions
7. Score updates based on decision quality

---

## System Architecture

Frontend (React.js)
⬇
Backend API (Node.js + Express)
⬇
Python Simulation Engine

---

## Tech Stack

* **Frontend:** React.js, Axios, Recharts
* **Backend:** Node.js, Express.js
* **Simulation Engine:** Python
* **Tools:** VS Code, PowerShell

---

## Project Structure

```
project-root/
├── backend/
│   └── server.js
├── frontend/
│   └── src/
├── python/
│   └── simulation.py
├── docs/
└── README.md
```

---

## How to Run the Project

### 1) Start Backend

```bash
cd backend
node server.js
```

Server runs at:

```
http://localhost:5000
```

---

### 2) Start Frontend

```bash
cd frontend
npm install
npm start
```

App runs at:

```
http://localhost:3000
```

---

### 3)  Run Simulation

* Click **Run Simulation**
* Buy stocks (Energy / Airline)
* Click **Respond to Shock**
* Observe score + chart updates

---

## 4) API Endpoint

### GET /api/simulate

Returns:

* Shock type
* Impact
* Oil price
* Inflation
* Sector performance

---

##  Game Logic

* Supply Shock → Energy performs better
* Demand Shock → Airline performs better
* Policy Shock → Moderate impact

 Goal: Maximize score by making correct decisions

---

## Limitations

* Uses simplified economic assumptions
* No real-time market data
* Basic scoring model

---

## Future Enhancements

* Real-time oil price API integration
* Advanced economic modeling
* Machine learning predictions
* Improved UI/UX
* Multiplayer leaderboard

---

## Conclusion

Oil Shock Racing demonstrates how oil price shocks affect financial markets using simulation and visualization. It combines data analysis, full-stack development, and gamification to create an interactive learning experience.

---

## Acknowledgment

This project was developed as part of a simulation-based learning initiative to understand real-world market dynamics and improve problem-solving skills.

---
