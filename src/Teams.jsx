
import React, { Component } from 'react';
import AddTeamPane from './components/AddTeamPane.jsx';
import Modal from './components/Modal.jsx';
import DetailedCard from './components/card_components/DetailedCard.jsx';
import {toggleElementByIdButton, toggleElementById, toggleModalByIdButton, toggleModalById} from './lib/element_effect_helpers.js';

class Teams extends Component {
  constructor(props) {
    super(props);
    this.sendTeam = this.sendTeam.bind(this);
    this.deleteTeam = this.deleteTeam.bind(this);
  }
  componentDidMount(){
    this.props.fetchMonsters();
    this.props.fetchTeams();
  }
  sendTeam(event){
    event.preventDefault();
    event.stopPropagation();
    const teamList = document.querySelector('.addTeamPane-new-team');
    const name = document.querySelector('#teamNameForm').elements['teamName'].value;
    if(name.length < 1){
      return;
    }
    if(teamList.childNodes.length < 3){
      /* @TODO add flash message here */
      return;
    }
    const members = [];
    for(let monsterCard of teamList.childNodes){
      members.push(monsterCard.getAttribute('data-id'));
    }
    fetch('/user/teams', {
      credentials: 'same-origin',
      method:'POST',
      headers: {
        'content-type' : 'application/json'
      },
      body: JSON.stringify({name, members})
    }).then(() => {
      teamList.childNodes.forEach(node => teamList.remove(node));
      // update team's list.
      toggleModalById('submitName');
      this.props.fetchTeams();
    });
  }
  deleteTeam(event){
    const teamId = event.target.parentNode.dataset.id;
    const body = {teamId};
    fetch('/user/teams', {
      credentials: 'same-origin',
      method: 'DELETE',
      headers: {
        'content-type' : 'application/json'
      },
      body: JSON.stringify(body)
    }).then(response => {
      response.json().then(() => {
        this.props.fetchTeams();
      });
    });
  }
  printTeams(){
    if(this.props.teams){
      const {teams} = this.props;
      const getTeamMembers = (teamMember) => {
        return (<DetailedCard className='card-full' monster={teamMember} />);
      };
      return teams.map(team => {
        return (
          <article key={team.id} data-id={team.id} className='team'>
            <h3>Name: {team.name}</h3>
            <p>Members:</p>
            {team.teamMembers.map(getTeamMembers)}
            <button onClick={this.deleteTeam}>Delete Team</button>
          </article>
        );
      });
    }
  }
  toggleTeamPane(event){
    const button = event.currentTarget;
    button.innerHTML === 'Close' ? button.innerHTML = 'Add a Team' : button.innerHTML = 'Close';
    toggleElementById('addTeamPane');
    toggleElementById('your-teams');
  }
  render() {
    const inputForm = () => {
      return (
        <form id="teamNameForm" onSubmit={this.sendTeam}>
          <input type="text" name="teamName" placeholder="Team name" />
        </form>
      );
    };
    return (
      <section className="teams-list">
        <h2>Teams</h2>
        <button className="add-a-team" onClick={this.toggleTeamPane}>Add a Team</button>
        <AddTeamPane sendTeam={toggleModalByIdButton('submitName')} monsters={this.props.monsters} />
        <section id="your-teams">
          <h3>Your Teams</h3>
          {this.printTeams()}
        </section>
        <Modal id="submitName" header="Name your team" mainContent={inputForm()} footer={<button onClick={this.sendTeam}>Done</button>}/>
      </section>
    );
  }
}


export default Teams;
