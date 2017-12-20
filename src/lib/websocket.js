
const generateBattleSocket = (battleComponent) => {
  const socket = new WebSocket('ws://localhost:3001/battles/1');
  socket.addEventListener('open', () => {
    /* @TODO: Make this.state.id a prop passed down from app. */
    socket.send(JSON.stringify({messageType: 'team', team:'1,2,3', battlerId: battleComponent.state.battlerId}));
  });
  socket.addEventListener('message', (event) => {
    try{
      const {game, messages} = JSON.parse(event.data);
      const messagesInState = battleComponent.state.messages;
      // put new messages in the state
      if(messages){
        messages.forEach(message => messagesInState.push(message));
      }
      battleComponent.setState({game, messages: messagesInState});
    } catch(e) {
      console.log(e);
    }
  });
  return socket;
};

module.exports = generateBattleSocket;
