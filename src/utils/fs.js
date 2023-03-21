const fs = require('fs/promises');

const loadTalkersData = async () => {
  try {
    return JSON.parse(await fs.readFile('./src/talker.json', 'utf8'));
  } catch (error) {
    return error.message;
  }
};

const writeTalkerToFile = async (talkers) => {
  try {
    await fs.writeFile('./src/talker.json', JSON.stringify(talkers));
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { loadTalkersData, writeTalkerToFile };
