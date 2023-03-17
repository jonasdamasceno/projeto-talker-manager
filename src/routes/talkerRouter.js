const express = require('express');

const { loadTalkersData } = require('../utils/fs');

const serverRouter = express.Router();

serverRouter.use(express.json());

serverRouter.get('/', async (_req, res) =>
  res.status(200).json(await loadTalkersData()));

module.exports = serverRouter;
