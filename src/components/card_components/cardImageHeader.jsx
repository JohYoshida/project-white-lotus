import React from 'react';


const cardImageHeader = (monster) => {
  return (
    <div className="card-image-header">
      <img src={monster.image_url} alt={monster.name} />
    </div>
  );
};

export default cardImageHeader;
