import React, { Component } from 'react';
import AddTeamPane from './components/AddTeamPane.jsx';

class Teams extends Component {
  constructor(props) {
    super(props);
    this.state = {loaded:false};
  }
  componentDidMount(){
    fetch('/user/teams', {credentials: 'same-origin'}).then(data => {
      data.json().then(parsedData => {
        console.log('Load confirmed');
        this.setState({teams:parsedData.teams, loaded:true});
      });
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
      <section hidden={!this.state.loaded}>
        <button onClick={this.addTeam}>Add a team</button>
        <AddTeamPane monsters={this.props.monsters} />
        <h2>Your Teams</h2>
        {this.printTeams()}
      </section>
    );
  }
}


export default Teams;
