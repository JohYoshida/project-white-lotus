import React, { Component } from 'react';


class Battle extends Component {
  constructor(props) {
    super(props);
    this.state = {ready: false, id:1, players:[], messages: []};
    this.joinGame = this.joinGame.bind(this);
    this.sendAttack = this.sendAttack.bind(this);
    this.generateUserCards = this.generateUserCards.bind(this);
    this.generateOpponentCards = this.generateOpponentCards .bind(this);
    this.unBench = this.unBench.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }
  joinGame(){
    const battleComponent = this;
    this.socket = new WebSocket('ws://localhost:3001/battles/1');
    this.socket.addEventListener('open', () => {
      /* @TODO: Make this.state.id a prop passed down from app. */
      this.socket.send(JSON.stringify({team:'1,2,3', userid: this.state.id}));
    });
    this.socket.addEventListener('message', (event) => {
      // test if the message is json
      let isJSON = true;
      try{
        JSON.parse(event.data);
      } catch(_) {
        isJSON = false;
      }
      if(isJSON){
        const parsedMessage = JSON.parse(event.data);
        const {players, msg} = parsedMessage;
        battleComponent.setState({players});
        battleComponent.state.messages.push(msg);
        battleComponent.state.ready || battleComponent.setState({ready:true});
        return;
      }
    });
  }
  generateUserCards(){
    if(this.state.players.length !== 2){
      return (<p>Waiting for other player</p>);
    }
    let user = undefined;
    let cards = [];
    // compile attacks into buttons for display
    const showAttacks = (monster) => {
      const attacks = [];
      for(const attack of monster.attacks){
        attacks.push(<button key={attack.id} onClick={this.sendAttack} data-name={attack.name} title={attack.description}>{attack.name}</button>);
      }
      return (
        <section className="Attacks">
          {attacks}
        </section>
      );
    };
    for(let player of this.state.players){
      if(player.id === this.state.id) user = player;
    }
    for(const monsterid in user.team){
      const monster = user.team[monsterid];
      cards.push(
        <article key={monster.id} className='user-card'>
          <h3>{monster.name}</h3>
          {monster.bench ? <button onClick={this.unBench} data-id={monster.id} className="selectMonster">Unbench</button> : {showAttacks}}
        </article>
      );
    }
    return cards;
  }
  generateOpponentCards(){
    if(this.state.players.length !== 2){
      return;
    }
    let opponent = undefined;
    let cards = [];
    // compile attacks into buttons for display
    for(let player of this.state.players){
      if(player.id !== this.state.id) opponent = player;
    }
    for(const monsterid in opponent.team){
      const monster = opponent.team[monsterid];
      cards.push(
        <article key={monster.id} className='user-card'>
          <h3>{monster.name}</h3>
        </article>
      );
    }
    return cards;
  }
  unBench(event){
    this.sendMessage(JSON.stringify({action:'activate', monsterId: event.target.dataset.id}));
  }
  sendMessage(message){
    this.socket.send(JSON.stringify(message));
  }
  sendAttack(event){
    const attackName = event.target.dataset.name;
    this.sendMessage({action:'attack', 'name':attackName, options:null});
  }
  render() {
    return (
      <main>
        {!this.state.ready && <button onClick={this.joinGame}>Join</button>}
        {this.state.ready && this.generateUserCards()}
        {this.state.ready && this.generateOpponentCards()}
      </main>
    );
  }
}

export default Battle;
