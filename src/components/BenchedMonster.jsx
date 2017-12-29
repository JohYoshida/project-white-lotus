import React, { Component } from 'react';
import {toggleModalByIdButton} from '../lib/element_effect_helpers';

class BenchedMonster extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {monster} = this.props;
    return (
      <div data-id={monster.id} disabled={!this.props.player.turn} className="bench-monster">
        <img onClick={toggleModalByIdButton(`${monster.id}-modal`)} src={monster.image_url} alt={monster.name} />
        <span className="card-hp">{monster.hp}</span>
        <span className="card-acc">{monster.accuracy_bonus || "+2"}</span>
        {this.props.isPlayer && <button data-id={monster.id} disabled={!this.props.player.turn} onClick={this.props.unBench}>s</button>}
      </div>
    );
  }
}

export default BenchedMonster;
