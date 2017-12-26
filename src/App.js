import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import {instanceOf} from 'prop-types';
import {withCookies, Cookies} from 'react-cookie';

// Components
import Battle from './Battle.jsx';
import Monsters from './Monsters.jsx';
import Monster from './Monster.jsx';
import Store from './Store.jsx';
import Login from './Login.jsx';
import Teams from './Teams.jsx';
import CreateBattle from './CreateBattle.jsx';

// Functions
import {postLogin, postRegister, setUserState} from './lib/user_auth.js';
import {postNewMonster} from './lib/store.js';

class App extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.purchaseEgg = this.purchaseEgg.bind(this);
    this.purchaseCrate = this.purchaseCrate.bind(this);
    this.fetchMonsters = this.fetchMonsters.bind(this);
    this.fetchTeams = this.fetchTeams.bind(this);
    this.loadApp = this.loadApp.bind(this);
    this.state = {
      id: '',
      loggedin: false,
      loaded: false,
      monsters: [],
      teams:null
    };
  }

  componentWillMount() {
    const {cookies} = this.props;
    if (cookies.get('id')) {
      this.setState({id: cookies.get('id'), loggedin: true});
    }
  }
  register(event) {
    event.preventDefault();
    postRegister(event).then(res => {
      setUserState(this, res);
    });
  }

  login(event) {
    event.preventDefault();
    postLogin(event).then(res => {
      setUserState(this, res);
    });
  }

  logout(event) {
    const {cookies} = this.props;
    cookies.remove('id');
    this.setState({id: null, loggedin: false, brouzoff: null});
  }
  // default load app.
  loadApp(){
    this.setState({loaded:true});
  }
  fetchMonsters(){
    fetch('/monsters', {credentials: 'same-origin'}).then(res => {
      res.json().then(data => {
        console.log(data);
        this.setState({monsters: data});
        this.loadApp();
      });
    });
  }
  fetchTeams(){
    fetch('/user/teams', {credentials: 'same-origin'}).then(data => {
      data.json().then(parsedData => {
        this.setState({teams:parsedData.teams});
        this.loadApp();
      });
    });
  }
  fetchNewMonster(creature) {
    postNewMonster(creature).then(res => {
      res.json().then(data => {
        this.setState({brouzoff: data.brouzoff});
        console.log(data.monster);
      });
    });
  }

  purchaseEgg(event) {
    event.preventDefault();
    this.fetchNewMonster('kaiju');
  }

  purchaseCrate(event) {
    event.preventDefault();
    this.fetchNewMonster('mecha');
  }

  render() {
    const {username} = this.state;
    if (this.state.loggedin) {
      return (<Router>
        <div hidden={!this.state.loaded}>
          <h1>{username}</h1>
          <nav>
            <span className='float-left'><Link className='nav-link' to="/">Monsters</Link></span>
            <span className='float-left'><Link className='nav-link' to="/store">Store</Link></span>
            <span className='float-left'><Link className='nav-link' to="/teams">Teams</Link></span>
            <span className='float-left'><Link className='nav-link' to="/create-battle">Create Battle</Link></span>
            <Link to="/">
              <button onClick={this.logout} className='button button-outline'>Log out</button>
            </Link>
          </nav>

          <Route exact path="/" render={() =>
            (<Monsters fetchMonsters={this.fetchMonsters} monsters={this.state.monsters} loaded={this.state.loaded} />)
          }/>
          <Route path="/monsters/:id" render={(props) =>
            (<Monster {...props} loadApp={this.loadApp}/>)
          }/>
          <Route path="/store" render={(props) =>
            (<Store {...props} brouzoff={this.state.brouzoff} purchaseEgg={this.purchaseEgg} purchaseCrate={this.purchaseCrate}/>)
          }/>
          <Route path="/teams" render={() =>
            (<Teams fetchMonsters={this.fetchMonsters} fetchTeams={this.fetchTeams} teams={this.state.teams} monsters={this.state.monsters}/>)
          }/>
          <Route path="/battle/:roomName" render={({match}) => (
            <Battle roomName={match.params.roomName} teams={this.state.teams} fetchTeams={this.fetchTeams}/>)
          }/>
          <Route path="/create-battle" render={() =>
            (<CreateBattle loadApp={this.loadApp} />)
          }/>
        </div>
      </Router>);
    } else {
      return(
        <div>
        <Login
          state = {this.state}
          login = {this.login}
          register = {this.register}
          hidden = {this.state.loggedin}
        />
        </div>);
    }
  }
}
export default withCookies(App);
