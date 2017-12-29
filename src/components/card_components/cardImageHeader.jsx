import React from 'react';


const cardImageHeader = (monster, clickFunction) => {
  return (
    <div className="card-image-header">
      <img src={monster.image_url} onClick={clickFunction} alt={monster.name} />
    </div>
  );
};

export default cardImageHeader;
