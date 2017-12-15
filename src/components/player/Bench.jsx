import React, { Component } from 'react';

class Bench extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <aside className="bench">
        <section className="bench-monster">
          <div className="monster-icon"></div>
          <div className="monster-health">100 HP</div>
        </section>

        <section className="bench-monster">
          <div className="monster-icon"></div>
          <div className="monster-health">100 HP</div>
        </section>
      </aside>
    )
  }
}

export default Bench;
