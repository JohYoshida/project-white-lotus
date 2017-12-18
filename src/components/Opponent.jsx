import React, { Component } from 'react';

class Opponent extends Component {
  constructor(props) {
    super(props);
  }
  generateUserCards(){
    const {players} = this.props.game;
    if(!players){
      return;
    }
    let cards = [];
    // compile attacks into buttons for display
    for(let player of players){
      // If the player in list players is not the currently logged in user.
      if(player.id !== this.props.curUserId){
        for(const monsterid in player.team){
          const monster = player.team[monsterid];
          cards.push(
            <article key={monster.id} className='user-card'>
              <h3>{monster.name}</h3>
            </article>
          );
        }
        return cards;
      }
    }
  }

  render() {
    return (
      <section className="opponent">
        {this.generateUserCards()}
      </section>
    )
  }
}

export default Opponent;
