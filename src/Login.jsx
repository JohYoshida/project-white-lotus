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
          <h4>Login</h4>
          <p>Or <button onClick = {this.toggle}>Sign Up</button></p>
          <form id="loginForm">
            <label>Username</label>
            <input id='username' type='text'/>
            <label>Password</label>
            <input id='password' type='password' />
            <button onClick={this.props.login}>Submit</button>
          </form>
        </div>
        <div hidden={!this.state.register}>
          <h4>Register</h4>
          <p>Or <button onClick = {this.toggle}>Login</button></p>
          <form id="registerForm">
            <label>Username</label>
            <input id='username' type='text'/>
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
