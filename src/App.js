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

// Functions
import {postLogin, postRegister, setUserState} from './helpers/user_auth.js';
import {postNewMonster} from './helpers/store.js';

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
    this.state = {
      id: '',
      loggedin: false
    };
  }

  componentDidMount() {
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

  fetchNewMonster(creature) {
    postNewMonster(creature).then(res => {
      res.json().then(data => {
        this.setState({brouzoff: data.brouzoff});
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
        <div>
          <h1>{email}</h1>
          <Link to="/">
            <button onClick={this.logout}>Log out</button>
          </Link>
          <div hidden={!this.state.loggedin}>
            <ul>
              <li>
                <Link to="/">Monsters</Link>
              </li>
              <li>
                <Link to="/store">Store</Link>
              </li>
              <li>
                <Link to="/teams">Teams</Link>
              </li>
              <li>
                <Link to="/battle">Battle</Link>
              </li>
            </ul>
            <hr/>
            <Route exact="exact" path="/" component={Monsters}/>
            <Route path="/monsters/:id" component={Monster}/>
            <Route path="/store" render={(props) => (<Store {...props} brouzoff={this.state.brouzoff} purchaseEgg={this.purchaseEgg} purchaseCrate={this.purchaseCrate}/>)}/>
            <Route path="/teams" component={Teams}/>
            <Route path="/battle" component={Battle}/>
          </div>
        </div>
      </Router>);
    } else {
      return (<Login state={this.state} login={this.login} register={this.register} hidden={this.state.loggedin}/>);
    }
  }
}

const Teams = () => (<div>
  <h2>Teams</h2>
</div>);

export default withCookies(App);
