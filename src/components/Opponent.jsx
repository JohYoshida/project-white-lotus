import React, { Component } from 'react';

class Opponent extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className="opponent">
        <section className="active-monster">
          <div className="monster-icon"></div>
          <div className="monster-health">100 HP</div>
        </section>

        <section className="bench">
          <div className="bench-monster">
            <div className="monster-icon"></div>
            <div className="monster-health">100 HP</div>
          </div>
          <div className="bench-monster">
            <div className="monster-icon"></div>
            <div className="monster-health">100 HP</div>
          </div>
        </section>
      </div>
    )
  }
}

export default Opponent;
