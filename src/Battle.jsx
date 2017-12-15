import React, { Component } from 'react';
import Opponent from './components/Opponent.jsx';
import Player from './components/Player.jsx';

class Battle extends Component {
  constructor(props) {
    super(props);
    this.state = {choosing:true};
    // when a team is selected, the player's can be made
    this.makePlayer = (event) =>{
      const team = event.target.dataset.monsterids;
      // the "team" needs to be a string of 3 ids.
      fetch(`/battle/1?monsters=${team}`).then(res => {
        return res.json();
      }).then(data => {
        this.setState({player:data, choosing:false});
      });
    };
  }
  render() {
    const chooseableTeams = [
      <button key="1" data-monsterids="123" onClick={this.makePlayer}>Gojira, Rhino, Mecha Gojira</button>
    ];
    return (
      <main>
        {this.state.choosing && <h1>Choose your team</h1>}
        {this.state.choosing && chooseableTeams}
        <Player playerData={this.state.player}/>
      </main>
    );
  }
}

export default Battle;
