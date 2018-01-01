import React, { Component } from 'react';
// This will throw warning 'Route is defined but never used'
// but it's required for routing between monsters#index and monsters#show
import { BrowserRouter as Route, Link } from 'react-router-dom';
import MonsterInfo from './components/MonsterInfo';

class Monster extends Component {
  constructor(props) {
    super(props);
  }
  generateMonsterStats(player){
    const {team, activeMonster} = player;
    const stats = [];
    // add benched monsters
    for(const monsterId in team){
      const curMonster = team[monsterId];
      if(activeMonster && monsterId === activeMonster.id){
        stats.push(<span className="activeMonster-stats">{curMonster.name}: HP:{curMonster.hp}, ACC: {curMonster.accuracy_bonus}</span>);
        continue;
      }
      stats.push(<span>{curMonster.name}: HP:{curMonster.hp}, ACC: {curMonster.accuracy_bonus}</span>);
    }
    return stats;
  }
  // Places monster images on the battlefield. Prefix is either player or opponent as a string.
  generateMonsterImages(player, prefix){
    const {team, activeMonster} = player;
    const monsters = [];
    // add benched monsters
    for(const monsterId in team){
      if(activeMonster && monsterId === activeMonster.id) continue;
      const curMonster = team[monsterId];
      monsters.push(<img className={`${prefix}-monster-bench-${monsters.length + 1}`} src={curMonster.image_url} alt={curMonster.name}/>);
    }
    if(activeMonster) monsters.push(<img className={`${prefix}-monster-active`} src={activeMonster.image_url} alt={activeMonster.name} />);
    return monsters;
  }
  render() {
    const {player, opponent} = this.props;
    return (
      <section className="battlefield-visual">
        <div className="player-side">
          <div className="player-stats">
            {this.generateMonsterStats(player)}
          </div>
          {this.generateMonsterImages(player, 'player')}
        </div>
        <div className="opponent-side">
          <div className="opponent-stats">
            {this.generateMonsterStats(opponent)}
          </div>
          {this.generateMonsterImages(opponent, 'opponent')}
        </div>
      </section>
    );
  }
}

export default Monster;
