import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Battle from './Battle.jsx';
// const monsterBuilder = require('./helpers/monster_builder');
const helpers = require('./helpers/helpers');

class App extends Component {
  constructor(props) {
    super(props);
    this.socket = new WebSocket('ws://localhost:3001');
    this.state = {};
  }

  componentDidMount() {
    let websocket = this.socket;
    websocket.addEventListener('open', event => {
      websocket.send('Hello!?');
    });

    helpers.getMonsters().then(monster => {
      console.log(monster);
    });

    // monsterBuilder(1).then(monster => {
    //   this.state.monster = monster;
    // });
    
    // fetch('/').then(res => {
    //   res.json().then(data => {
    //     console.log(data);
    //   });
    //   console.log(res);
    // });
  }

  render() {
    return (
      <Routes />
    )
  }
}

const Routes = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">Monsters</Link></li>
        <li><Link to="/store">Store</Link></li>
        <li><Link to="/teams">Teams</Link></li>
        <li><Link to="/battle">Battle</Link></li>
      </ul>

      <hr/>

      <Route exact path="/" component={Monsters}/>
      <Route path="/store" component={Store}/>
      <Route path="/teams" component={Teams}/>
      <Route path="/battle" component={Battle}/>
    </div>
  </Router>
)

const Monsters = ({ match }) => (
  <div>
    <h2>Monsters</h2>
    <ul>
      <li>
        <Link to={`${match.url}/monster`}>
          Monster
        </Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Monster}/>
    <Route exact path={match.url} render={() => (
      <h3>Please select a Monster.</h3>
    )}/>
  </div>
)

const Monster = ({ match }) => (
  <div>
    <h3>{match.params.monsterId}</h3>
  </div>
)

const Store = () => (
  <div>
    <h2>Store</h2>
  </div>
)

const Teams = () => (
  <div>
    <h2>Teams</h2>
  </div>
)

export default App;
