const express = require('express');

const { loadTalkersData } = require('../utils/fs');

const serverRouter = express.Router();

serverRouter.use(express.json());

serverRouter.get('/', async (_req, res) =>
  res.status(200).json(await loadTalkersData()));

serverRouter.get('/:id', async (req, res) => {
  const { id } = req.params;

    const talkers = await loadTalkersData();
    const talker = talkers.find((t) => t.id === +id);
    if (!talker) {
      return res
        .status(404)
        .json({ message: 'Pessoa palestrante não encontrada' });
    }
    return res.status(200).json(talker);
});
module.exports = serverRouter;
