import React, { Component } from 'react';
import ActiveMonster from './player/ActiveMonster.jsx';
import Moves from './player/Moves.jsx';
import Bench from './player/Bench.jsx';

class Player extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div class="player">
        <ActiveMonster />
        <Moves />
        <Bench />
      </div>
    )
  }
}

export default Player;
