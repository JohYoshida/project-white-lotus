import React, { Component } from 'react';

class Player extends Component {
  constructor(props) {
    super(props);

    this.sendAttack = this.sendAttack.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.unBench = this.unBench.bind(this);
  }
  generateUserCards(){
    const {players} = this.props.game;
    if(!players){
      return (<p>Waiting for other player</p>);
    }
    let cards = [];
    // compile attacks into buttons for display, takes a monster argument as a function
    for(let player of players){
      if(player.id === this.props.curUserId){
        for(const monsterid in player.team){
          const monster = player.team[monsterid];
          /* @TODO: Add unbenchning functionality */
          cards.push(
            <article key={monster.id} className='user-card'>
              <h3>{monster.name}</h3>
              {monster.bench ? <button onClick={this.unBench} data-id={monster.id} className="selectMonster">Unbench</button> : this.showAttacks(monster)}
            </article>
          );
        }
        return cards;
      }
    }
  }
  showAttacks(monster){
    const attacks = [];
    for(const attack of monster.attacks){
      attacks.push(<button key={attack.id} onClick={this.sendAttack} data-name={attack.name} title={attack.description}>{attack.name}</button>);
    }
    return (
      <section className="Attacks">
        {attacks}
      </section>
    );
  }
  unBench(event){
    this.sendMessage({messageType: 'action', action: 'activate', monsterId: event.target.dataset.id});
  }
  sendMessage(message){
    this.props.socket.send(JSON.stringify(message));
  }
  sendAttack(event){
    const attackName = event.target.dataset.name;
    this.sendMessage({messageType: 'action', action: 'attack', 'name': attackName, options: null});
  }
  render() {
    const team = [];
    if (this.props.playerData){
      for(const monster of this.props.playerData.team){
        team.push(
          <article key={monster.id}>
            <h2>{monster.name}</h2>
            <img src={monster.image_url} alt={monster.name}/>
            {monster.bench && <button onClick={this.activate}>Activate</button>}
          </article>
        );
      }
    }
    return (
      <div className="player">
        {this.generateUserCards()}
      </div>
    );
  }
}

export default Player;
