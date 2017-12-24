import React, { Component } from 'react';
import AddTeamPane from './components/AddTeamPane.jsx';
import Modal from './components/Modal.jsx';
import {showElementById} from './lib/element_effect_helpers.js';

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
    event.stopPropagation();
    const teamList = document.querySelector('.add-team-new-team');
    const name = document.querySelector('#teamNameForm').elements['teamName'].value;
    if(name.length < 1){
      /* @TODO add flash message here */
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
        const {name, id, image} = teamMember;
        return (<span key={id} className='team-team-member' data-id={id}>{name}, </span>);
      };
      return teams.map(team => {
        console.log(team);
        return (
          <article key={team.id} data-id={team.id} className='team'>
            <h3>Name: {team.name}</h3>
            <p>Members: {team.teamMembers.map(getTeamMembers)}</p>
            <button onClick={this.deleteTeam}>Delete Team</button>
          </article>
        );
      });
    }
  }
  render() {
    const inputForm = () => {
      return (
        <form id="teamNameForm">
          <input type="text" name="teamName" placeholder="Team name" />
        </form>
      )
    };
    return (
      <section>
        <Modal id="submitName" header="Name your team" mainContent={inputForm()} footer={<button onClick={this.sendTeam}>Done</button>}/>
        <AddTeamPane sendTeam={showElementById('submitName')} monsters={this.props.monsters} />
        <h2>Your Teams</h2>
        <button onClick={showElementById('addTeamPane')}>Add a team</button>
        {this.printTeams()}
      </section>
    );
  }
}


export default Teams;
