import React, { Component } from 'react';
// This will throw warning 'Route is defined but never used'
// but it's required for routing between monsters#index and monsters#show
import { BrowserRouter as Route, Link } from 'react-router-dom';

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
        <div className='monster' key={monster.id}>
          <Link to={`/monsters/${monster.id}`}>
            <button className='show-monster' id={monster.id}>
              {monster.name}
            </button>
          </Link>
          <p>{monster.creature}</p>
          <img src={monster.image_url} alt='monster icon' />
          <p>{monster.hp} HP</p>
          <p>Type: {monster.type.name}</p>
        </div>
      );
    }
    return monsterArray;
  }

  render() {
    if (this.state.monsters.length > 0) {
      return (
        <main>
          <h2>Monsters</h2>
          <div className='container'>
            {this.state.ready && this.printMonsters()}
          </div>
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
