import React, { Component } from 'react';

class BenchedMonster extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {monster} = this.props;
    return (
      <div class="bench-monster">
        <img src={monster.image_url} alt={monster.name} />
        <div class="bench-monster-info">
          <span class="card-info-hp">HP: {monster.hp}</span>
        </div>
        {this.props.isPlayer &&
          <button data-id={monster.id} disabled={!this.props.player.turn} onClick={this.props.unBench}>Switch</button>}
      </div>
    );
  }
}

export default BenchedMonster;
