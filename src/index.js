const express = require("express");
const dotenv = require('dotenv');
dotenv.config();
const Server = require("./bin/server");

const app = express();
const server = new Server(app);

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

server.start(PORT);