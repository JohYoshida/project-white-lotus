import React, { Component } from 'react';
// This will throw warning 'Route is defined but never used'
// but it's required for routing between monsters#index and monsters#show
import { BrowserRouter as Route, Link } from 'react-router-dom';
import MonsterInfo from './components/MonsterInfo';
import {toggleModalByIdButton} from './lib/element_effect_helpers';

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
        stats.push(<span className="activeMonster-stats">{curMonster.name}<br/> HP:{curMonster.hp}, ACC: {curMonster.accuracy_bonus}</span>);
        continue;
      }
      stats.push(<span>{curMonster.name}<br/> HP:{curMonster.hp} ACC: {curMonster.accuracy_bonus}</span>);
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
      monsters.push(
        <div className={`${prefix}-monster-bench-${monsters.length + 1}`} onClick={toggleModalByIdButton(`${curMonster.id}-modal`)}>
          <span className='monster-hp'>HP:{curMonster.hp}</span>
          <img src={curMonster.image_url} alt={curMonster.name}/>
        </div>
      );
    }
    if(activeMonster) {
      monsters.push(
        <div className={`${prefix}-monster-active`} onClick={toggleModalByIdButton(`${activeMonster.id}-modal`)}>
          <span className='monster-hp'>HP:{activeMonster.hp}</span>
          <img src={activeMonster.image_url} alt={activeMonster.name} />
        </div>
      );
    }
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
