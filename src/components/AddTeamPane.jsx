import React, { Component } from 'react';
import Modal from './Modal.jsx'

class AddTeamPane extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.addCreatureToTeam = this.addCreatureToTeam.bind(this);
  }
  addCreatureToTeam(event){
    event.stopPropagation();
    const teamList = document.querySelector('.add-team-new-team');
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
        <article onClick={this.displayCreature} key={monster.id} data-id={monster.id}>
          <h3>{monster.name}</h3>
          <img src={monster.image_url} />
          <button onClick={this.addCreatureToTeam}>Add to team</button>
        </article>
      );
    });
  }
  render() {
    return (
      <section className='add-team'>
        <section className='add-team-new-team'>
        </section>
        {this.state.readyToSend && <button onClick={this.props.sendTeam}>Submit team</button>}
        <hr/>
        {this.showMonsters()}
      </section>
    );
  }
}

export default AddTeamPane;
