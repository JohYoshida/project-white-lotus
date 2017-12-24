import React, { Component } from 'react';
import AddTeamPane from './components/AddTeamPane.jsx';
import Modal from './components/Modal.jsx';

class Teams extends Component {
  constructor(props) {
    super(props);
    this.sendTeam = this.sendTeam.bind(this);
  }
  componentDidMount(){
    this.props.fetchMonsters();
    this.props.fetchTeams();
  }
  sendTeam(event){
    event.stopPropagation();
    const teamList = document.querySelector('.add-team-new-team');
    const name = document.querySelector('#teamNameForm').elements["teamName"].value;
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
      window.location = '/teams'
    });
  }
  printTeams(){
    if(this.props.teams){
      const {teams} = this.props;
      const getTeamMembers = (teamMember) => {
        const {name, id, image} = teamMember;
        return (<span key={id} className='team-team-member' data-id={id}>{name} </span>);
      };
      return teams.map(team => {
        console.log(team);
        return (
          <article key={team.id} className='team'>
            <h3>Name: {team.name}</h3>
            {team.teamMembers.map(getTeamMembers)}
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
        <Modal className='hidden' header="Name your team" mainContent={inputForm()} footer={<button onClick={this.sendTeam}>Done</button>}/>
        <button onClick={this.addTeam}>Add a team</button>
        <AddTeamPane sendTeam={this.sendTeam} monsters={this.props.monsters} />
        <h2>Your Teams</h2>
        {this.printTeams()}
      </section>
    );
  }
}


export default Teams;
