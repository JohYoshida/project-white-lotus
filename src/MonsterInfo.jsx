import React from 'react';

const MonsterInfo = ({monster}) => {
  const attacks = monster.attacks;
  const attacksArray = [];
  for (let attack in attacks) {
    let attackName = attacks[attack].name.replace('_', ' ');
    attacksArray.push(
      <p key={attack}>{attackName}</p>
    );
  }

  return (
    <div className='monster-show'>
      <img src={monster.image} alt='monster icon' />
      <h3>{monster.name}</h3>
      <p>{monster.creature}</p>
      <p>{monster.hp} HP</p>
      <p>Type: {monster.type.name}</p>
      <div>
        <h4>Attacks</h4>
        {attacksArray}
      </div>
    </div>
  );
};

export default MonsterInfo;
