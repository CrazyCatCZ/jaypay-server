import express from "express";
import bodyParser from "body-parser";

import apiRoutes from "./routes/api.js";

const PORT = 5000;
const app = express();

// create application/json parser
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");

  next();
});

app.get("/", (req, res) => {
  res.send("APP IS RUNNING");
});

app.use("/api", apiRoutes);
