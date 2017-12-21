import React, { Component } from 'react';
import uuid from 'uuid';
import MessageBox from './components/MessageBox.jsx';
import Modal from './components/Modal.jsx';
import Opponent from './components/Opponent.jsx';
import Player from './components/Player.jsx';
import generateBattleSocket from './lib/websocket.js';

class Battle extends Component {
  constructor(props) {
    super(props);
    this.state = {ready: false, game:{}, messages: [], player:{}, opponent:{}};
    this.joinGame = this.joinGame.bind(this);
  }
  // Handles sending join game requests.
  joinGame(event){
    this.state.ready || this.setState({ready:true});
    this.setState({battlerId:uuid()})
    const button = event.target;
    // build the WebSocket.
    this.socket = generateBattleSocket(this)
  }
  isWinner(){
    const {gameOver} = this.state.game;
    if(gameOver.winner.id === this.state.id){
      /* @TODO award money here through a PUT to /users/:id */
      return (<p>You won!</p>);
    }
    return(<p>You lost!</p>);
  }
  render() {
    return (
      <main>
        {this.state.game.gameOver && <Modal header="Game over" mainContent={this.isWinner()} footer={<a href="/">Done</a>} />}
        {!this.state.ready && <button onClick={this.joinGame}>1</button>}
        {!this.state.ready && <button onClick={this.joinGame}>2</button>}
        <h2>Player</h2>
        {this.state.ready && <Player player={this.state.player} socket={this.socket} curUserId={this.state.id} />}

        <h2>Opponent</h2>
        <Opponent player={this.state.opponent} curUserId={this.state.id} />
        <h3>Messages</h3>
        <MessageBox messages={this.state.messages} />
      </main>
    );
  }
}

export default Battle;
