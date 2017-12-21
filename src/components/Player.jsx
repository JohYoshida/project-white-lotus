import React, { Component } from 'react';

class Player extends Component {
  constructor(props) {
    super(props);
    this.sendAttack = this.sendAttack.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.unBench = this.unBench.bind(this);
  }
  generateUserCards(){
    let cards = [];
    const {player} = this.props;
    if(!player.team) return (<p>Waiting for other player.</p>);
    console.log(player);
    for(const monsterid in player.team){
      const monster = player.team[monsterid];
      let action = <p></p>;
      if(player.turn){
        action = monster.bench ? <button onClick={this.unBench} data-id={monster.id} className="selectMonster">Unbench</button> : this.showAttacks(monster);
      }
      cards.push(
        <article key={monster.id} className='user-card'>
          <h3>{monster.name}</h3>
          <p>{monster.hp}HP</p>
          {action}
        </article>
      );
    }
    return cards;
  }
  showAttacks(monster){
    const attacks = [];
    for(const attackName in monster.attacks){
      const attack = monster.attacks[attackName];
      attacks.push(<button key={attack.id} onClick={this.sendAttack} data-name={attack.name} title={attack.description}>{attack.name}</button>);
    }
    return (
      <section className="Attacks">
        {attacks}
      </section>
    );
  }
  unBench(event){
    this.sendMessage({messageType: 'action', action: 'activate', monsterId: event.target.getAttribute('data-id')});
  }
  sendMessage(message){
    this.props.socket.send(JSON.stringify(message));
  }
  sendAttack(event){
    const attackName = event.target.getAttribute('data-name');
    this.sendMessage({messageType: 'action', action: 'attack', 'name': attackName, options: null});
  }
  render() {
    return (
      <div className="player">
        {this.generateUserCards()}
      </div>
    );
  }
}

export default Player;
