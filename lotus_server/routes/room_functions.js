const generatePlayer = require('../lib/generate_player');
const Game = require('../lib/generate_game');

const messages = {
  joinMessage: player => `${player.name} has joined the room.`
};

module.exports = (socketRouter, id) => {
  const setupRoom = (msg) => {
    const playerInfo = JSON.parse(msg);
    socketRouter.rooms[`battle_${id}`] = {};
    let room = socketRouter.rooms[`battle_${id}`];
    return generatePlayer(playerInfo.userid, playerInfo.team.split(',')).then(player => {
      room['players'] = [player];
    });
  };

  const startGame = (msg) => {
    const room = socketRouter.rooms[`battle_${id}`];
    const playerInfo = JSON.parse(msg);
    return generatePlayer(playerInfo.userid, playerInfo.team.split(',')).then(player => {
      room.players.push(player);
      return new Game(room.players);
    })
  };
  return {
    setupRoom,
    startGame
  };
};
