import React, { Component } from 'react';

// Header should be the titel
// main should be the main content
// Footer should be links out

class Modal extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <section className="modal">
        <div className='modal-container'>
          <header className="modal-header">
            <h3>{this.props.header}</h3>
          </header>
          <main classname="modal-main">
            {this.props.mainContent}
          </main>
          <footer classname="modal-footer">
            {this.props.footer}
          </footer>
        </div>
      </section>
    );
  }
}

export default Modal;
