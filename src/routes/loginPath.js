const express = require('express');
const randomToken = require('../utils/randomToken');

const serverRouter = express.Router();
serverRouter.use(express.json());

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const loginValidation = (req, res, next) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!validateEmail(email)) {
    return res
      .status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) {
    return res
      .status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res
      .status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

serverRouter.post('/', loginValidation, (_req, res) => {
  const token = randomToken();
  return res.status(200).json({ token });
});

module.exports = serverRouter;
