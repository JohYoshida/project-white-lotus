import React, { Component } from 'react';

class Opponent extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div class="opponent">
        <section class="active-monster">
          <div class="monster-icon"></div>
          <div class="monster-health">100 HP</div>
        </section>

        <section class="bench">
          <div class="bench-monster">
            <div class="monster-icon"></div>
            <div class="monster-health">100 HP</div>
          </div>
          <div class="bench-monster">
            <div class="monster-icon"></div>
            <div class="monster-health">100 HP</div>
          </div>
        </section>
      </div>
    )
  }
}

export default Opponent;
