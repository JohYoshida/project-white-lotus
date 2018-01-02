import React, { Component } from 'react';
import Modal from './Modal.jsx'
import DetailedCard from './card_components/DetailedCard.jsx';
import {toggleHiddenElements} from '../lib/element_effect_helpers.js';


class AddTeamPane extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.addCreatureToTeam = this.addCreatureToTeam.bind(this);
    this.removeCreatureFromTeam = this.removeCreatureFromTeam.bind(this);
  }
  addCreatureToTeam(event){
    event.stopPropagation();
    const teamList = document.querySelector('.addTeamPane-new-team');
    const monsterCard = event.target.parentNode;
    const button = event.currentTarget;
    if(teamList.childNodes.length === 3){
      return;
    }
    toggleHiddenElements(monsterCard);
    button.classList.add('hidden');
    teamList.appendChild(monsterCard);
    if(teamList.childNodes.length === 3){
      this.setState({readyToSend:true});
    } else {
      this.setState({readyToSend:false});
    }
  }
  removeCreatureFromTeam(event){
    event.stopPropagation();
    const teamList = document.querySelector('.addTeamPane-new-team');
    const monsterList = document.querySelector('.addTeamPane-container');
    const monsterCard = event.target.parentNode;
    const button = event.currentTarget;
    toggleHiddenElements(monsterCard);
    button.classList.add('hidden');
    monsterList.appendChild(monsterCard);
    if(teamList.childNodes.length < 3){
      this.setState({readyToSend:false});
    }
  }
  showMonsters(){
    const {monsters} = this.props;
    return monsters.map(monster => {
      return (
        <section key={monster.id} data-id={monster.id} className="monster-card">
          <DetailedCard className='card-full' monster={monster} />
          <button className='add' onClick={this.addCreatureToTeam}>Add to team</button>
          <button className='remove hidden' onClick={this.removeCreatureFromTeam}>Remove from Team</button>
        </section>
      );
    });
  }
  render() {
    return (
      <section id="addTeamPane" className='add-team hidden'>
        <h2>Create a new team!</h2>
        <section className='addTeamPane-new-team'>
        </section>
        {this.state.readyToSend && <button onClick={this.props.sendTeam}>Submit team</button>}
        <hr/>
        <div className='addTeamPane-container'>{this.showMonsters()}</div>
      </section>
    );
  }
}

export default AddTeamPane;
