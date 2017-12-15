import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


class Monsters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      monsters: []
    };
  }

  componentDidMount() {
    // TODO: move to helper function

    // Get monsters from server and add to state
    fetch('/monsters').then(res => {
      res.json().then(data => {
        for (let index in data) {
          let monsters = this.state.monsters;
          monsters.push({monster: data[index]});
          this.setState({monsters: monsters});
        }
      });
    });

    // Get monster bodiess from server and add to state
    fetch('/monsters/bodies').then(res => {
      res.json().then(data => {
        let monsters = this.state.monsters;
        for (let index in monsters) {
          monsters[index].body = data[monsters[index].monster.body_id - 1];
        }
      });
    });
  }

  render() {
    return (
      <div>
        <h2>Monsters</h2>
      </div>
    )
  }
}

export default Monsters
