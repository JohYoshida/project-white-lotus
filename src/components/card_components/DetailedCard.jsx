import React, {Component} from 'react';
import cardImageHeader from './cardImageHeader.jsx';

class DetailedCard extends Component {
  constructor(props) {
    super(props);
  }
  attackDetails(monster){
    const attacks = [];
    for(const attackName in monster.attacks){
      const attack = monster.attacks[attackName];
      if(attack.isAlt){
        attacks.push(
          <div class="abilities-ability">
            <strong className="abilities-name"><span className="sword-ico">ATK: {attackName.replace('_', ' ')}</span></strong>
            <p>{attack.description}</p>
          </div>
        );
      } else {
        attacks.push(
          <div className="abilities-ability">
            <strong className="abilities-name"><span className="sword-ico"></span>ATK: {attackName.replace('_', ' ')}</strong>
            <p>{attack.description}</p>
          </div>
        );
      }
    }
    return attacks;
  }
  abilityDetails({ability}){
    if(!ability) return;
    return(
      <div className="abilities-ability">
        <strong className="abilities-name"><span className="sword-ico"></span>ABL: {ability.name.replace('_', ' ')}</strong>
        <p>{ability.description}</p>
      </div>
    );
  }
  render() {
    const {monster} = this.props;
    return (
      <div className={this.props.className}>
        <span class="card-hp">{monster.hp}</span>
        <span class="card-acc">{monster.accuracy_bonus}</span>
        {cardImageHeader(monster)}
        <h3>{monster.name}</h3>
        <div className="card-details">
          <div className="stats">
            <p><strong>Type:</strong> {monster.type.name}</p>
            <p><strong>Creature:</strong> {monster.creature}</p>
          </div>
          <div className="card-details-abilities">
            {this.attackDetails(monster)}
            {this.abilityDetails(monster)}
          </div>
        </div>
      </div>
    );
  }
}

export default DetailedCard;
