// Takes in the monster to target, the damage to write.
// Also takes a playerId and a player (optional). These are just used to determine if it's a DOT effect.
const printDamage = (monster, damage, playerId, player) => {
  let monsterContainer = document.querySelector(`.opponent-side #m-${monster.id}`);
  if(playerId && playerId === player.id){
    monsterContainer = document.querySelector(`.player-side #m-${monster.id}`);
  }
  if(!monsterContainer) return;

  /* @TODO put this into it's own factory function */

  const damageSpan = document.createElement('span');
  damageSpan.classList.add('damage');
  damageSpan.innerText = damage;
  //
  monsterContainer.prepend(damageSpan);
  new Promise(() => {
    setTimeout(() => {
      monsterContainer.removeChild(damageSpan);
    }, 2000);
  });
};

const updateGame = (battleComponent) => {
  return (event) => {
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
      console.log(pc);
      pc.id ? player = pc : opponent = pc;
    });
    const damagesOnly = {};
    const messagesOnly = [];
    if(messages && messages.length > 0){
      /**
       * Loops over each messages and builds an object for the damages part of the messages
       * and an array for the message part of the of the messages.
       * This way, total damage will be shown to users as opposed to an individual damage.
       */
      messages.forEach(messageObject => {
        if(!messageObject.target){
          messagesOnly.push(messageObject);
          return;
        }
        const {target, damage, playerId, message} = messageObject;

        // OR short circuiting here in case playerID was not given in the message
        const damageId = target.id + playerId;
        if(damagesOnly[damageId]){
          damagesOnly[damageId].damage += damage;
        } else {
          damagesOnly[damageId] = {
            target, damage, playerId
          };
        }
        messagesOnly.push(message);
      });
      for(const damageId in damagesOnly){
        const damageMessage = damagesOnly[damageId];
        if(damageMessage.target){
          printDamage(damageMessage.target, damageMessage.damage, damageMessage.playerId, player);
        }
      }
    }
    battleComponent.setState({game, messages:messagesOnly, player, opponent});
  };
};

const rejoinBattle = (battleComponent) => {
  const {roomName} = battleComponent.props;
  const socket = new WebSocket(`ws://localhost:3001/battles/${roomName}`);
  socket.addEventListener('open', () => {
    socket.send(JSON.stringify({
      messageType: 'rejoin',
      battlerId: battleComponent.state.battlerId,
    }));
  });
  socket.addEventListener('message', updateGame(battleComponent));
  return socket;
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
  socket.addEventListener('message', updateGame(battleComponent));
  return socket;
};

export {generateBattleSocket, rejoinBattle};
