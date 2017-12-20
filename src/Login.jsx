import React, { Component } from 'react';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {register:false};
    this.toggle = this.toggle.bind(this);
  }
  toggle(event){
    if(this.state.register){
      this.setState({register:false, buttontxt:"Login"});
    }else{
      this.setState({register:true, buttontxt:"Sign up"});
    }
  }
  render() {
    return (
      <div>
        <div hidden={this.state.register}>
          <form id="loginForm">
            <h4>Login</h4>
            <label>Username</label>
            <input id='username' />
            <label>Password</label>
            <input id='password' type='password' />
            <button onClick={this.props.login}>Submit</button>
          </form>
          <p>Or <button onClick = {this.toggle}>Sign Up</button></p>
        </div>
        <div hidden={!this.state.register}>
          Please input your email and password
          <form id="registerForm">
            <h4>Login</h4>
            <label>Username</label>
            <input id='username' />
            <label>Password</label>
            <input id='password' type='password' />
            <button onClick={this.props.register}>Submit</button>
          </form>
        </div>
      </div>
    );
  }
}


export default Login;
