import React, { Component } from 'react';
import uuid from 'uuid';
import MessageBox from './components/MessageBox.jsx';
import CardModal from './components/CardModal.jsx';
import Modal from './components/Modal.jsx';
import BattleField from './BattleField.jsx';
import Player from './components/Player.jsx';
import generateBattleSocket from './lib/websocket.js';
import editBrouzoff from './lib/editBrouzoff.js';
import {toggleModalById} from './lib/element_effect_helpers';

class Battle extends Component {
  constructor(props) {
    super(props);
    this.state = {ready:false, game:{}, messages: [], player:{}, opponent:{}};
    this.joinGame = this.joinGame.bind(this);
    this.renderTeam = this.renderTeam.bind(this);
  }
  componentDidMount(){
    this.props.fetchTeams();
  }
  // Handles sending join game requests.
  joinGame(event){
    this.state.ready || this.setState({ready:true});
    this.setState({battlerId:uuid()});
    const team = [];
    const button = event.currentTarget;
    for(const child of button.children){
      if(!child.dataset.id) continue;
      team.push(child.dataset.id);
    }
    this.socket = generateBattleSocket(this, team.join(','));
    document.querySelector('.battlefield-teams').remove();
    document.querySelector('nav').remove();
    document.querySelector('#battlefield').classList.remove('hidden');
  }
  isWinner(){
    const {gameOver} = this.state.game;
    if(!gameOver) return;
    toggleModalById('gameOverModal');
    if(gameOver.winner.id === this.state.battlerId){
      editBrouzoff(this.state.game, 500);
      return (<p>You won!</p>);
    }
    editBrouzoff(this.state.game, 250);
    return(<p>You lost!</p>);
  }
  renderTeam(team){
    // right now we're showing the button, but we could render anything with it (icon images, etc)
    const {teamMembers} = team;
    const getTeamMembers = (teamMember) => {
      const {name, id, image} = teamMember;
      return (<span key={id} className='team-team-member' data-id={id}>{name}</span>);
    };
    return(
      <div onClick={this.joinGame} key={team.id}>
        <h3>{team.name}</h3>
        {teamMembers.map(getTeamMembers)}
      </div>
    );
  }
  generateModals({players}){
    const modals = [];
    players.forEach(player => {
      const {team} = player;
      for(let monsterId in team){
        const monster = team[monsterId];
        modals.push(<CardModal id={`${monster.id}-modal`} monster={monster}/>);
      }
    });
    return modals;
  }
  render() {
    return (
      <main>
        <div className="battlefield-teams">
          {this.props.teams && this.props.teams.map(this.renderTeam)}
        </div>
        <div id="battlefield" className='hidden'>
          {this.state.game.players && <BattleField player={this.state.player} opponent={this.state.opponent} battlerId={this.state.battlerId} /> }
          {this.state.ready && <MessageBox className='messages row' messages={this.state.messages} />}
          {this.state.ready && <Player className='player row' player={this.state.player} socket={this.socket} curUserId={this.state.id} />}
          {this.state.ready && <section><span><a className='nav-link leave-game' href="/">Leave Game</a></span></section>}
        </div>
        <Modal id="gameOverModal" header="Game over" mainContent={this.isWinner()} footer={<a className="button" href="/">Done</a>} />
        {this.state.game.players && this.generateModals(this.state.game)}
      </main>
    );
  }
}

export default Battle;
