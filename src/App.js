import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import {instanceOf} from 'prop-types';
import {withCookies, Cookies} from 'react-cookie';
import './App.css';

// Components
import Battle from './Battle.jsx';
import Monsters from './Monsters.jsx';
import Monster from './Monster.jsx';
import Store from './Store.jsx';
import Login from './Login.jsx';
import Teams from './Teams.jsx';

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
    this.state = {
      id: '',
      loggedin: false,
      loaded: false,
      monsters: []
    };
  }

  componentWillMount() {
    const {cookies} = this.props;
    if (cookies.get('id')) {
      this.setState({id: cookies.get('id'), loggedin: true});
    }
  }


  componentDidMount(){

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

  fetchMonsters(){
    fetch('/monsters', {credentials: 'same-origin'}).then(res => {
      res.json().then(data => {
        console.log(data);
        this.setState({monsters: data});
        this.setState({loaded: true});
      });
    });
  }

  fetchNewMonster(creature) {
    postNewMonster(creature).then(res => {
      res.json().then(data => {
        this.setState({brouzoff: data.brouzoff});
        // window.location = '/'
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
    const {email} = this.state;
    if (this.state.loggedin) {
      return (<Router>
        <div hidden={!this.state.loaded}>
          <h1>{email}</h1>
          <nav className='nav'>
            <span className='float-left'><Link className='nav-link' to="/">Monsters</Link></span>
            <span className='float-left'><Link className='nav-link' to="/store">Store</Link></span>
            <span className='float-left'><Link className='nav-link' to="/teams">Teams</Link></span>
            <span className='float-left'><Link className='nav-link' to="/battle">Battle</Link></span>
            <Link to="/">
              <button onClick={this.logout} className='button button-outline'>Log out</button>
            </Link>
          </nav>

          <hr/>

          <Route exact path="/" render={() => (<Monsters fetchMonsters={this.fetchMonsters} monsters={this.state.monsters} loaded={this.state.loaded} />)}/>
          <Route path="/monsters/:id" component={Monster}/>
          <Route path="/store" render={(props) => (<Store {...props} brouzoff={this.state.brouzoff} purchaseEgg={this.purchaseEgg} purchaseCrate={this.purchaseCrate}/>)}/>
          <Route path="/teams" render={() => (<Teams fetchMonsters={this.fetchMonsters} monsters={this.state.monsters} loaded={this.state.loaded}/>)} />
          <Route path="/battle" component={Battle}/>
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
