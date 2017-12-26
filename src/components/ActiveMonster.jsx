import React, { Component } from 'react';
import cardImageHeader from './card_components/cardImageHeader.jsx';
import cardInfo from './card_components/cardInfo.jsx';

class ActiveMonster extends Component {
  constructor(props) {
    super(props);
  }
  showAttacks(){
    const {monster, sendAttack} = this.props;
    const attacks = [];
    for(let attackName in monster.attacks){
      const attack = monster.attacks[attackName];
      attacks.push(<button disabled={!this.props.player.turn} className='button' key={attack.id} onClick={sendAttack} data-name={attack.name}>{attack.name}</button>);
    }
    return (
      <section className="Attacks">
        {attacks}
      </section>
    );
  }
  render() {
    const {monster} = this.props;
    const renderButtons = (monster) => {
      return monster.bench ? <button disabled={!this.props.player.turn} onClick={this.props.unBench} className='button button-outline' data-id={monster.id}>Unbench</button> : this.showAttacks();
    };
    return (
      <div class="battlefield-active-battler" id={monster.id}>
        <div class="active-monster-stats">
          {cardImageHeader(monster)}
          {cardInfo(monster)}
        </div>
        <div class="active-battler-actions">
          <div class="active-battler-actions-buttons">
            {this.props.isPlayer && renderButtons(monster)}
          </div>
        </div>
      </div>
    );
  }
}

export default ActiveMonster;
