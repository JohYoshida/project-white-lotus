import React, { Component } from 'react';
import cardImageHeader from './card_components/cardImageHeader.jsx';
import cardInfo from './card_components/cardInfo.jsx';
import {toggleModalByIdButton} from '../lib/element_effect_helpers';

class ActiveMonster extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {monster} = this.props;
    return (
      <div class="battlefield-active-battler" id={monster.id}>
        <span class="card-hp">{monster.hp}</span>
        <span class="card-acc">{monster.accuracy_bonus || '+2'}</span>
        <div class="active-monster-stats">
          {cardImageHeader(monster, toggleModalByIdButton(`${monster.id}-modal`))}
        </div>
      </div>
    );
  }
}

export default ActiveMonster;
