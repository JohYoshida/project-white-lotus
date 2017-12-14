import React, { Component } from 'react';
import Opponent from './components/Opponent.jsx';
import Player from './components/Player.jsx';

class Battle extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <main>
        <Opponent />
        <Player />
      </main>
    )
  }
}

export default Battle
