import React, { Component } from 'react';
// This will throw warning 'Route is defined but never used'
// but it's required for routing between monsters#index and monsters#show
import { BrowserRouter as Route, Link } from 'react-router-dom';

class Monsters extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  printMonsters() {
    const monsters = this.props.monsters;
    const monsterArray = [];
    for(let monster of monsters){
      monsterArray.push(
        <li key={monster.id}>
          <Link to={`/monsters/${monster.id}`}>
            <button id={monster.id}>
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
    if (this.props.monsters.length > 0) {
      return (
        <main>
          <h2>Monsters</h2>
          <ul>
            {this.props.loaded && this.printMonsters()}
          </ul>
        </main>
      );
    } else {
      return (
        <main>
          <h2>Monsters</h2>
          <p>You don't have any monsters yet!</p>
          <Link to='/store'>Store</Link>
        </main>
      );
    }
  }
}

export default Monsters;
