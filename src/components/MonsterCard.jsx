import React, { Component } from 'react';

class Modal extends Component {
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
            <p>{attack.descriptiona}</p>
          </div>
        );
      }
    };
    const {monster} = this.props;
    return (
      <div class="card">
        <div class="card-image-header">
          <img src={monster.image_url} alt={monster.name} />
        </div>
        <div class="card-info">
          <span class="card-info-hp">{monster.hp}</span>
          <span class="card-info-acc">{monster.accuracy_bonus}</span>
        </div>
        <div class="card-body">
          <div class="card-details">
            <h3>{monster.name}</h3>
            {renderAttacks(monster.attacks)}
          </div>

        </div>
      </div>
    );
  }
}

export default Modal;
