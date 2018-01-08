// simple function to delay without blocking execution
const delayFunction = (ms, callback) => {
  return new Promise(() => {
    setTimeout(callback, ms);
  });
};


/**
 * makeInfoSpan - creates a new span element
 *
 * @param {string/number} value  any value to be input as the content of the span.
 * @param {string} infoName  A class name to be added to the span
 * @returns {object} HTML element  An HTML element representing the info span.
 */

const makeInfoSpan = (value, infoName) => {
  const infoSpan = document.createElement('span');
  infoSpan.classList.add(infoName);
  infoSpan.innerText = value;
  return infoSpan;
};

// Takes in the monster to target, the damage to write.
// Also takes a playerId and a player (optional). These are just used to determine if it's a DOT effect.
const printInfo = (infoCollection, infoName, player) => {
  let delay = 0;
  for(const messageId in infoCollection){
    const {target, value, playerId} = infoCollection[messageId];
    if(target){
      let monsterContainer = document.querySelector(`.opponent-side #m-${target.id}`);
      console.log('playerId', playerId);
      console.log('player.id', player.id);
      if(playerId && playerId === player.id){
        monsterContainer = document.querySelector(`.player-side #m-${target.id}`);
      }
      if(monsterContainer){
        // set the delay only if there is a info span to create
        delay = 1000;
        const infoSpan = makeInfoSpan(value, infoName);
        monsterContainer.prepend(infoSpan);
        delayFunction(2000, () => {
          monsterContainer.removeChild(infoSpan);
        });
      }
    }
  }
  return delay;
};


/**
 * collectMessages - takes all messages sent down and funnels them into their appropriate message objects
 *
 * @param {array} messages  An array of messages. These can be strings or objects.
 * @return {object}  An object of all the filled collections
 */
const collectMessages = (messages) => {
  // initialize collections
  const healsCollection = {};
  const messagesCollection = [];
  const damagesCollection = {};
  messages.forEach(messageObject => {
    const {target, damage, amount, playerId, message} = messageObject;
    // If it's just a basic message, push it and return.
    if(!target){
      messagesCollection.push(messageObject);
      return;
    }
    // determine the type of message and use the appropriate value
    const messageCollection = amount ? healsCollection : damagesCollection;
    const value = amount || damage;
    const messageId = target.id + playerId;
    // messageCollection becomes the new container!
    if(messageCollection[messageId]){
      messageCollection[messageId].value += value;
    } else {
      messageCollection[messageId] = {
        target, value, playerId
      };
    }
    messagesCollection.push(message);
  });
  return {healsCollection, damagesCollection, messagesCollection};
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
      // Checks if there is no opponent already to add extra bug protection.
      if(pc.id !== battleComponent.state.battlerId && !opponent){
        opponent = pc;
      } else {
        player = pc;
      }
    });
    if(messages && messages.length > 0){
      const {healsCollection, damagesCollection, messagesCollection} = collectMessages(messages);
      messages = messagesCollection;
      let delay = printInfo(damagesCollection, 'damage', player);
      // delay heal messages from appearing showing
      delayFunction(delay, () => {
        delay = printInfo(healsCollection, 'heal', player);
      });
    }
    battleComponent.setState({game, messages: messages || [], player, opponent});
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

const joinGame = (battleComponent, team) => {
  const {roomName} = battleComponent.props;
  const socket = new WebSocket(`ws://localhost:3001/battles/${roomName}`);
  // Joining the game
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

export {joinGame, rejoinBattle};
