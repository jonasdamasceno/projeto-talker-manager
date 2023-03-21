const express = require('express');

const { loadTalkersData, writeTalkerToFile } = require('../utils/fs');

const serverRouter = express.Router();

serverRouter.use(express.json());

const tokenValid = (req, res, next) => {
  const { authorization } = req.headers;

  // const isValidLength = authorization.length !== 16;

  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (authorization.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }

  next();
};

const validateName = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }

  if (name.trim().length < 3) {
    return res
      .status(400)
      .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;

  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (typeof age !== 'number' || !Number.isInteger(age) || age < 18) {
    return res.status(400).json({
      message: 'O campo "age" deve ser um número inteiro igual ou maior que 18',
    });
  }

  next();
};

const validateDateInput = (watchedAt) => {
  if (!watchedAt) {
    throw new Error('O campo "watchedAt" é obrigatório');
  }
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(watchedAt)) {
    throw new Error('O campo "watchedAt" deve ter o formato "dd/mm/aaaa"');
  }
};

const validateRate = (rate) => {
  if (rate === undefined) {
    throw new Error('O campo "rate" é obrigatório');
  }
  if (!Number.isInteger(rate) || rate < 1 || rate > 5) {
    throw new Error('O campo "rate" deve ser um número inteiro entre 1 e 5');
  }
};

const talkValid = (req, res, next) => {
  const { talk } = req.body;

  try {
    if (!talk) {
      throw new Error('O campo "talk" é obrigatório');
    }

    validateDateInput(talk.watchedAt);
    validateRate(talk.rate);

    next();
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

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

serverRouter.post('/', tokenValid, validateName, validateAge, 
talkValid, async (req, res) => {
    const { name, age, talk } = req.body;

    const talkers = await loadTalkersData();

    const newTalker = { id: talkers.length + 1, name, age, talk };
    talkers.push(newTalker);
    await writeTalkerToFile(talkers);

    return res.status(201).json(newTalker); 
  });
module.exports = serverRouter;
