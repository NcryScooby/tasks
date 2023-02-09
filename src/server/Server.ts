import express from "express";

const server = express();

server.get("/", (req, res) => {
  res.send("Initial server response");
});

export { server };
