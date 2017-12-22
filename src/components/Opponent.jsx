import React, { Component } from 'react';

class Opponent extends Component {
  constructor(props) {
    super(props);
  }
  generateUserCards(){
    const {player} = this.props;
    if(!player) return;
    let cards = [];
    for(const monsterid in player.team){
      const monster = player.team[monsterid];
      cards.push(
        <article key={monster.id} className='user-card'>
          <h3>{monster.name}</h3>
          <p>{monster.hp}HP</p>
        </article>
      );
    }
    return cards;
  }

  render() {
    return (
      <section className="opponent">
        {this.generateUserCards()}
      </section>
    );
  }
}

export default Opponent;
