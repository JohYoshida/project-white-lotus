import React, { Component } from 'react';
// import ActiveMonster from './player/ActiveMonster.jsx';
// import Moves from './player/Moves.jsx';
// import Bench from './player/Bench.jsx';

class Player extends Component {
  constructor(props) {
    super(props);

    this.active = (event) => {
      // @TODO: Make this function alter the "bench" property through the websocket (the source of truth.)
    };
  }
  render() {
    const team = [];
    if (this.props.playerData){
      for(const monster of this.props.playerData.team){
        team.push(
          <article key={monster.id}>
            <h2>{monster.name}</h2>
            <img src={monster.image_url} alt={monster.name}/>
            {monster.bench && <button onClick={this.activate}>Activate</button>}
          </article>
        );
      }
    }
    return (
      <div className="player">
        {team}
      </div>
    );
  }
}

export default Player;
