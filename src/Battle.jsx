import React, { Component } from 'react';
import Opponent from './components/Opponent.jsx';
import Player from './components/Player.jsx';

class Battle extends Component {
  constructor(props) {
    super(props);
    this.state = {ready: false, id:1}
    this.joinGame = () =>{
      fetch(`/battle/1?team=123&userid=${this.state.id}`).then(data => {
        data.json().then(players => {
          this.setState({players: [players], ready:true});
        });
      });
    };
  }
  render() {
    return (
      <main>
        {!this.state.ready && <button onClick={this.joinGame}>Join</button>}
        {this.state.ready && <p>Done loading</p>}
      </main>
    );
  }
}

export default Battle;
