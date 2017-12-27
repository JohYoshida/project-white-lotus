import React, { Component } from 'react';
import ActiveMonster from './ActiveMonster.jsx';
import BenchedMonster from './BenchedMonster.jsx';

class Opponent extends Component {
  constructor(props) {
    super(props);
  }
  generateActiveMonster(){
    const {player} = this.props;
    if(!player.team) return (<p>Waiting for other player.</p>);

    if(player.activeMonster){
      const monster = player.activeMonster;
      return (<ActiveMonster player={player} monster={monster} sendAttack={this.sendAttack} />);
    }
  }

  generateBenchedMonster(){
    let cards = [];
    const {player} = this.props;
    if(!player.team) return;
    for(const monsterid in player.team){
      const monster = player.team[monsterid];
      if(monster.bench){
        cards.push(<BenchedMonster player={player} monster={monster} unBench={this.unBench} />);
      }
    }
    return cards;
  }
  render() {
    return (
      <section className="opponent">
        <div class="battlefield-onBench">
        {this.generateBenchedMonster()}
        </div>
        {this.generateActiveMonster()}
      </section>
    );
  }
}

export default Opponent;
