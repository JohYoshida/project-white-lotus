import React, { Component } from 'react';
import uuid from 'uuid';
import MessageBox from './components/MessageBox.jsx';
import Modal from './components/Modal.jsx';
import Opponent from './components/Opponent.jsx';
import Player from './components/Player.jsx';
import generateBattleSocket from './lib/websocket.js';
import editBrouzoff from './lib/editBrouzoff.js';

class Battle extends Component {
  constructor(props) {
    super(props);
    this.state = {ready:false, game:{}, messages: [], player:{}, opponent:{}};
    this.joinGame = this.joinGame.bind(this);
  }
  // Handles sending join game requests.
  joinGame(event){
    this.state.ready || this.setState({ready:true});
    this.setState({battlerId:uuid()});
    const button = event.target;
    // build the WebSocket.
    this.socket = generateBattleSocket(this);
  }

  isWinner(){
    const {gameOver} = this.state.game;
    if(gameOver.winner.id === this.state.id){
      editBrouzoff(this.state.game, 500);
      return (<p>You won!</p>);
    }
    editBrouzoff(this.state.game, 250);
    return(<p>You lost!</p>);
  }

  render() {
    return (
      <main id="battlefield">
        {this.state.game.gameOver && <Modal header="Game over" mainContent={this.isWinner()} footer={<a className="button" href="/">Done</a>} />}
        <button onClick={this.joinGame}>2</button>
        <p>{this.state.game.idlePlayer && this.state.game.idlePlayer.id}</p>
        {this.state.ready && <Opponent className='opponent' player={this.state.opponent} curUserId={this.state.id} /> }
        <p>{this.state.game.activePlayer && this.state.game.activePlayer.id}</p>
        {this.state.ready && <Player className='player' player={this.state.player} socket={this.socket} curUserId={this.state.id} />}

        {this.state.ready && <MessageBox className='message-box' messages={this.state.messages} />}
      </main>
    );
  }
}

export default Battle;
