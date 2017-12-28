import React, {Component} from 'react';
import cardImageHeader from './cardImageHeader.jsx';
import cardInfo from './cardInfo.jsx';

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
            <strong><span className="sword-ico"></span>{attackName}</strong>
            <p>{attack.description}</p>
          </div>
        );
      } else {
        attacks.push(
          <div className="abilities-ability">
            <strong><span className="sword-ico"></span>{attackName}</strong>
            <p>{attack.description}</p>
          </div>
        );
      }
    }
    /* @TODO sort it so that the primary ability is always first */
    return attacks;
  }
  render() {
    const {monster} = this.props;
    return (
      <div className="card-full">
        <span class="card-hp">{monster.hp}</span>
        <span class="card-acc">{monster.accuracy_bonus || '+2'}</span>
        {cardImageHeader(monster)}
        <h3>{monster.name}</h3>
        <div className="card-details">
          <div className="card-details-abilities">
            {this.attackDetails(monster)}
          </div>
        </div>
      </div>
    );
  }
}

export default DetailedCard;
