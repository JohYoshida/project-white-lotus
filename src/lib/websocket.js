
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
    // Try block to make sure things don't break if something that isn't JSON is sent down.
    try{
      const {game, messages} = JSON.parse(event.data);
      const messagesInState = battleComponent.state.messages;
      if(messages){
        messages.forEach(message => messagesInState.push(message));
        while(messagesInState.length > 3){
          console.log('removing');
          messagesInState.shift();
        }
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
