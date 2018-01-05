const printDamage = (monster, damage) => {
  /* @TODO add functionality for determining if it's opponent damage or not, e.g. for DOT */

  const monsterContainer = document.querySelector(`.opponent-side #m-${monster.id}`);

  /* @TODO put this into it's own factory function */

  const damageSpan = document.createElement('span');
  damageSpan.classList.add('damage');
  damageSpan.innerText = damage;
  //
  monsterContainer.prepend(damageSpan);
  new Promise(() => {
    setTimeout(() => {
      console.log(damageSpan, 'deleted');
      monsterContainer.removeChild(damageSpan);
    }, 2000);
  });
};

const generateBattleSocket = (battleComponent, team) => {
  const {roomName} = battleComponent.props;
  // Joining the game
  const socket = new WebSocket(`ws://localhost:3001/battles/${roomName}`);
  socket.addEventListener('open', () => {
    socket.send(JSON.stringify({
      messageType: 'join',
      team,
      battlerId: battleComponent.state.battlerId,
      name: battleComponent.props.username
    }));
  });
  // When game updates are sent
  socket.addEventListener('message', (event) => {
    let player = null;
    let opponent = null;
    let messages = null;
    let game = null;
    // try block to make sure things don't break if something that isn't JSON is sent down.
    try{
      const gameData = JSON.parse(event.data);
      messages = gameData.messages;
      game = gameData.game;
    } catch(e) {
      console.log(e);
    }
    game.players.forEach(pc => {
      pc.id ? player = pc : opponent = pc;
    });
    if(messages){
      /* @TODO implement functionality for adding up total damages. */
      for(const message of messages){
        if(message.target){
          printDamage(message.target, message.damage);
        }
      }
    }
    /* @TODO reimplement messages */
    battleComponent.setState({game, messages:[], player, opponent});
  });
  return socket;
};

module.exports = generateBattleSocket;
