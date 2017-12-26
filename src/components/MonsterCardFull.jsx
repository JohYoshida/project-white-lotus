import React, { Component } from 'react';
import cardImageHeader from './card_components/cardImageHeader.jsx';
import cardInfo from './card_components/cardInfo.jsx';

class MonsterCardFull extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const renderAttacks = (attacks) => {
      for(const attackName in attacks){
        const attack = attacks[attackName];
        return (
          <div class="card-details-attribute">
            <strong>{attack.name}</strong>
            <p>{attack.description}</p>
          </div>
        );
      }
    };
    const {monster} = this.props;
    return (
      <div id={monster.id} class="card" data-active="false" id={monster.id}>
        {cardImageHeader(monster)}
        <div class="card-body">
          <div class="card-details">
            <h3>{monster.name}</h3>
            {renderAttacks(monster.attacks)}
            {cardInfo(monster)}
          </div>
        </div>
      </div>
    );
  }
}

export default MonsterCardFull;
