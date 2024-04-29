const express = require("express"),
  dotenv = require("dotenv"),
  walletRouter = require("./routes/wallet"),
  statsRouter = require("./routes/stats");

dotenv.config();

const app = express(),
  port = Number(process.env.PORT) || 3000;

const server = app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/wallet", walletRouter);
app.use("/stats", statsRouter);

process.on("SIGINT", () => {
  server.close();
  console.log("\nServer closed; database disconnected");
  process.exit(0);
});
