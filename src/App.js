import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Battle from './Battle.jsx';
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

    // Get everything from monsters table and add to state
    fetch('/monsters').then(res => {
      res.json().then(data => {
        this.setState((monsters) => {
          return {monsters: data};
        });
      });
    });
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

      <Route exact path="/" component={Monsters} />
      <Route path="/store" component={Store} />
      <Route path="/teams" component={Teams} />
      <Route path="/battle" component={Battle} />
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

    <Route path={`${match.url}/:topicId`} component={Monster} />
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
