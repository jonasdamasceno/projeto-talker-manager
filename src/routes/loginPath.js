const express = require('express');

const randomToken = require('../utils/randomToken');

const serverRouter = express.Router();

serverRouter.use(express.json());

serverRouter.post('/', (_req, res) => {
    const token = randomToken();
    return res.status(200).json({ token });
});

module.exports = serverRouter;
