import React, { Component } from 'react';
import ActiveMonster from './ActiveMonster.jsx';
import BenchedMonster from './BenchedMonster.jsx';

class Player extends Component {
  constructor(props) {
    super(props);
    this.sendAttack = this.sendAttack.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.unBench = this.unBench.bind(this);
  }
  unBench(event){
    let id = event.target.dataset.id;
    this.sendMessage({messageType: 'action', action: 'activate', monsterId: id});
  }
  sendMessage(message){
    this.props.socket.send(JSON.stringify(message));
  }
  sendAttack(event){
    const attackName = event.target.getAttribute('data-name');
    this.sendMessage({messageType: 'action', action: 'attack', 'name': attackName, options: null});
  }
  generateActiveMonster(){
    const {player} = this.props;
    if(!player.team) return (<p>Waiting for other player.</p>);

    if(player.activeMonster){
      const monster = player.activeMonster;
      return (<ActiveMonster key={monster.id} isPlayer={true} player={player} monster={monster} sendAttack={this.sendAttack} />);
    }
  }
  showAttacks(){
    const monster = this.props.player.activeMonster;
    if(!monster) return;
    const attacks = [];
    for(let attackName in monster.attacks){
      const attack = monster.attacks[attackName];
      attacks.push(<button disabled={!this.props.player.turn} key={attack.id} onClick={this.sendAttack} data-name={attack.name}>{attack.name}</button>);
    }
    return (
      <section className="abilities">
        <h4>Actions</h4>
        <section className="abilities-actions">
          {attacks}
        </section>
      </section>
    );
  }
  generateBenchedMonster(){
    let cards = [];
    const {player} = this.props;
    if(!player.team) return;
    for(const monsterid in player.team){
      const monster = player.team[monsterid];
      if(monster.bench){
        cards.push(
          <BenchedMonster key={monster.id} isPlayer={true} player={player} monster={monster} unBench={this.unBench} />
        );
      }
    }
    return cards;
  }
  render() {
    const {player} = this.props;
    return (
      <section className={this.props.className}>
        <div className="column">
          <h4>Benched Monsters</h4>
          <div className="battlefield-onBench">
            {this.generateBenchedMonster()}
          </div>
        </div>
        <div className="battlefield-active column column-40">
          <h4>Active Monster</h4>
          <div className="battlefield-activeMonster">
            {this.generateActiveMonster()}
          </div>
          {this.showAttacks()}
        </div>
      </section>
    );
  }
}

export default Player;
