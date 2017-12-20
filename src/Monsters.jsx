import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class Monsters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      monsters: []
    };
  }

  componentDidMount() {
    // TODO: move to helper function
    fetch('/monsters', {credentials: 'same-origin'}).then(res => {
      res.json().then(data => {
        this.setState({monsters: data});
        this.setState({ready: true});
      });
    });
  }

  printMonsters() {
    const monsters = this.state.monsters;
    const monsterArray = [];
    for(let monster of monsters){
      monsterArray.push(
        <li key={monster.id}>
          <Link to={`/monsters/${monster.id}`}>
            <button onClick={this.showOne} id={monster.id}>
              {monster.name}
            </button>
          </Link>
          <p>{monster.creature}</p>
          <img src={monster.image_url} alt='monster icon' />
          <p>{monster.hp} HP</p>
          <p>Type: {monster.type.name}</p>
        </li>
      );
    }
    return monsterArray;
  }

  render() {
    return (
      <main>
        <h2>Monsters</h2>
        <ul>
          {this.state.ready && this.printMonsters()}
        </ul>
      </main>
    );
  }
}

export default Monsters;
