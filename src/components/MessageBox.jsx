import React, { Component } from 'react';
import './MessageBox.css';

class MessageBox extends Component {
  renderMessages(){
    const messages = [];
    this.props.messages.forEach((message, i) => {
      messages.unshift(<p className='message' key={i}>{message}</p>);
    });
    return messages;
  }
  render() {
    return (
      <section className="Messages">
        {this.renderMessages()}
      </section>
    )
  }
}

export default MessageBox;
