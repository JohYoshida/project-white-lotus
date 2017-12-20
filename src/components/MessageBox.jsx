import React, { Component } from 'react';

class MessageBox extends Component {
  renderMessages(){
    const messages = [];
    this.props.messages.forEach((message, i) => {
      messages.push(<p key={i}>{message}</p>);
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
