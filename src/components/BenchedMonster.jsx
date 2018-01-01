import React, { Component } from 'react';
import cardImageHeader from './card_components/cardImageHeader.jsx';
import {toggleModalByIdButton} from '../lib/element_effect_helpers';

class BenchedMonster extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {monster} = this.props;
    const {player} = this.props;
    let canBench = true;
    if(player.activeMonster) canBench = player.activeMonster.canBench;
    return (
      <div data-id={monster.id} disabled={!this.props.player.turn} className="bench-monster">
        {cardImageHeader(monster, toggleModalByIdButton(`${monster.id}-modal`))}
        <span className="card-hp">{monster.hp}</span>
        <span className="card-acc">{monster.accuracy_bonus}</span>
        {this.props.isPlayer && <button data-id={monster.id} disabled={!player.turn || !canBench} onClick={this.props.unBench}>Ico</button>}
      </div>
    );
  }
}

export default BenchedMonster;
