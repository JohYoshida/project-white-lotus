
const generateBattleSocket = (battleComponent) => {
  const {roomName} = battleComponent.props;
  const socket = new WebSocket(`ws://localhost:3001/battles/${roomName}`);
  socket.addEventListener('open', () => {
    /* @TODO: Make this.state.id a prop passed down from app. */
    socket.send(JSON.stringify({messageType: 'join', team:'1,2,3', battlerId: battleComponent.state.battlerId}));
  });
  socket.addEventListener('message', (event) => {
    try{
      const {game, messages} = JSON.parse(event.data);
      const messagesInState = battleComponent.state.messages;
      if(messages){
        messages.forEach(message => messagesInState.push(message));
      }
      let player = null;
      let opponent = null;
      game.players.forEach(pc => {
        pc.id ? player = pc : opponent = pc;
      });
      battleComponent.setState({game, messages: messagesInState, player, opponent});
    } catch(e) {
      console.log(e);
    }
  });
  return socket;
};

module.exports = generateBattleSocket;
