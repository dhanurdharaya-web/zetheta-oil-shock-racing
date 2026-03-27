const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");

const app = express();
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("API running");
});

// Simulation route
app.get("/api/simulate", (req, res) => {
  exec("python ../python/simulation.py", (error, stdout, stderr) => {
    if (error) {
      console.error(error);
      return res.status(500).send("Python error");
    }

    try {
      const data = JSON.parse(stdout);
      res.json(data);
    } catch (err) {
      res.status(500).send("JSON parse error");
    }
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
