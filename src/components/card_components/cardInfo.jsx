import React from 'react';

const cardInfo = (monster) => {
  return (
    <div class="active-monster-info">
      <span class="info-hp">HP: {monster.hp}</span>
      <span class="info-acc">ACC: {monster.accuracy_bonus || '+2'}</span>
    </div>
  );
};

export default cardInfo;
