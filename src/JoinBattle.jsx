import React, { Component } from 'react';
import {toggleElementById} from './lib/element_effect_helpers';
class CreateBattle extends Component {
  constructor(props) {
    super(props);
    this.state = {roomLink: null};
  }
  componentDidMount(){
    this.props.loadApp();
    this.findRoom = this.findRoom.bind(this);
  }
  findRoom(event){
    event.preventDefault();
    const form = event.target;
    const roomName = encodeURI(form.elements.roomName.value);
    if(roomName.length === 0){
      this.props.showFlashMessage('Room name must be given.');
      return;
    }
    fetch(`/battle/${roomName}`).then(res => {
      res.json().then(() => {
        this.setState({roomLink: roomName});
      }).catch(() => {
        this.props.showFlashMessage(<span>Room does not exist. <a href="/create-battle">Create it!</a></span>);
      });
    });
  }
  render() {
    return (
      <main>
        <h2>Join a Battle</h2>
        <form onSubmit={this.findRoom}>
          <label>Room name</label>
          <input name="roomName" type="text"></input>
          {!this.state.roomLink && <button>Find Battle</button>}
          {this.state.roomLink && <a className="button" href={`battle/${this.state.roomLink}`}>Join Battle</a>}
        </form>
      </main>
    );
  }
}

export default CreateBattle;
