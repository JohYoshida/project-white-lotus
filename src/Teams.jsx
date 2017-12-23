import React, { Component } from 'react';
import AddTeamPane from './components/AddTeamPane.jsx';

class Teams extends Component {
  constructor(props) {
    super(props);
    this.sendTeam = this.sendTeam.bind(this);
  }
  componentDidMount(){
    this.props.fetchMonsters();
    fetch('/user/teams', {credentials: 'same-origin'}).then(data => {
      data.json().then(parsedData => {
        this.setState({teams:parsedData.teams});
      });
    });
  }
  sendTeam(event){
    event.stopPropagation();
    const teamList = document.querySelector('.add-team-new-team');
    console.log(teamList);
    if(teamList.childNodes.length < 3){
      return;
    }
    const body = [];
    for(let monsterCard of teamList.childNodes){
      body.push(monsterCard.getAttribute('data-id'));
    }
    fetch('/user/teams', {
      credentials: 'same-origin',
      method:'POST',
      headers: {
        'content-type' : 'application/json'
      },
      body: JSON.stringify({members: body})
    }).then(() => {
      teamList.childNodes.forEach(node => teamList.remove(node));
      window.location = '/teams'
    });
  }
  printTeams(){
    if(this.state.teams){
      const {teams} = this.state;
      console.log(teams);
      const getTeamMembers = (teamMember) => {
        const {name, id, image} = teamMember;
        return (<span key={id} className='team-team-member' data-id={id}>{name} </span>);
      };
      return teams.map(team => {
        return (
          <article key={team.id} className='team'>
            {team.teamMembers.map(getTeamMembers)}
          </article>
        );
      });
    }
  }
  render() {
    return (
      <section>
        <button onClick={this.addTeam}>Add a team</button>
        <AddTeamPane sendTeam={this.sendTeam} monsters={this.props.monsters} />
        <h2>Your Teams</h2>
        {this.printTeams()}
      </section>
    );
  }
}


export default Teams;
