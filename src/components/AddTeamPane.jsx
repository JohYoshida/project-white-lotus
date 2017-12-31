import React, { Component } from 'react';
import Modal from './Modal.jsx'
import DetailedCard from './card_components/DetailedCard.jsx';

class AddTeamPane extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.addCreatureToTeam = this.addCreatureToTeam.bind(this);
  }
  addCreatureToTeam(event){
    event.stopPropagation();
    const teamList = document.querySelector('.addTeamPane-new-team');
    const monsterCard = event.target.parentNode;
    if(teamList.childNodes.length === 3){
      return;
    }
    teamList.appendChild(monsterCard);
    if(teamList.childNodes.length === 3){
      this.setState({readyToSend:true});
    }
  }
  showMonsters(){
    const {monsters} = this.props;
    return monsters.map(monster => {
      /* @TODO add a display creature feature (modal that appears) */
      return (
        <section key={monster.id} data-id={monster.id}>
          <DetailedCard className='card-full' monster={monster} />
          <button onClick={this.addCreatureToTeam}>Add to team</button>
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
