import React, { Component } from 'react';
import cardImageHeader from './card_components/cardImageHeader.jsx';
import cardInfo from './card_components/cardInfo.jsx';

class ActiveMonster extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {monster} = this.props;
    const renderButtons = (monster) => {
      return monster.bench ? <button disabled={!this.props.player.turn} onClick={this.props.unBench} className='button button-outline' data-id={monster.id}>Unbench</button> : this.showAttacks();
    };
    return (
      <div class="battlefield-active-battler" id={monster.id}>
        <span class="card-hp">{monster.hp}</span>
        <span class="card-acc">{monster.accuracy_bonus || '+2'}</span>
        <div class="active-monster-stats">
          {cardImageHeader(monster)}
        </div>
      </div>
    );
  }
}

export default ActiveMonster;
