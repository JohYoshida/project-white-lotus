const uuidv1 = require('uuid/v1');

exports.seed = function(knex, Promise) {

  const user = 1;
  const bodies = Array(6).fill(uuidv1());
  const heads = Array(12).fill(uuidv1());
  const arms = Array(3).fill(uuidv1());
  const types = Array(3).fill(uuidv1());
  const weaknesses = Array(3).fill(uuidv1());
  const attacks = Array(3).fill(uuidv1());
  const abilities = Array(1).fill(uuidv1());

  // Deletes ALL existing entries
  return Promise.all([
    knex('monsters').del(),
    knex('teams_monster').del(),
    knex('bodies').del(),
    knex('heads').del(),
    knex('arms').del(),
    knex('types').del(),
    knex('abilities').del(),
    knex('attacks').del()
  ]).then(function () {
    // Inserts seed entries
    return Promise.all([
      knex('monsters').insert([
        {
          id: 1,
          name: 'Gojira',
          user_id: user,
          body_id: bodies[0],
          arm_id: arms[0],
          head_id: heads[0]
        },
        {
          id: 2,
          name: 'Rhino',
          user_id: user,
          body_id: bodies[1],
          arm_id: arms[1],
          head_id: heads[1]
        },
        {
          id: 3,
          name: 'Mecha Gojira',
          user_id: user,
          body_id: bodies[2],
          arm_id: arms[2],
          head_id: heads[2]
        },
      ]),
      knex('bodies').insert([
        {
          id: bodies[0],
          name: 'Blob',
          image_url:'https://api.adorable.io/avatars/285/blob.png',
          hp: 30,
          type_id: types[0],
          creature: 'kaiju'
        },
        {
          id: bodies[1],
          name: 'T-Wrex',
          image_url:'https://api.adorable.io/avatars/285/t-wrex.png',
          hp: 35,
          type_id: types[1],
          creature: 'mecha'
        },
        {
          id: bodies[2],
          name: 'C\'thulumonster',
          image_url:'https://api.adorable.io/avatars/285/cthulumonster.png',
          hp: 25,
          type_id: types[2],
          creature: 'kaiju'
        },
        {
          id: bodies[3],
          name: 'Shock Top',
          image_url:'https://api.adorable.io/avatars/285/shocktop.png',
          hp: 25,
          type_id: types[2],
          creature: 'mecha'
        },
        {
          id: bodies[4],
          name: 'Medi-o-cre',
          image_url:'https://api.adorable.io/avatars/285/medi-o-cre.png',
          hp: 20,
          type_id: types[0],
          creature: 'mecha'
        },
        {
          id: bodies[5],
          name: 'Red Knight',
          image_url:'https://api.adorable.io/avatars/285/red_knight.png',
          hp: 25,
          type_id: types[1],
          creature: 'mecha'
        }
      ]),
      knex('heads').insert([
        {
          id: heads[0],
          name: 'Blob Eye Stalk',
          image_url: null,
          attack_id: attacks[0],
          ability_id: null,
          creature: 'kaiju'
        },
        {
          id: heads[1],
          name: 'T-Wrex Head',
          image_url: null,
          attack_id: attacks[1],
          ability_id: null,
          creature: 'kaiju'
        },
        {
          id: heads[2],
          name: 'C\'thulu Head',
          image_url: null,
          attack_id: attacks[2],
          ability_id: null,
          creature: 'kaiju'
        },
        {
          id: heads[3],
          name: 'Shock Top Helm',
          image_url: null,
          attack_id: null,
          ability_id: abilities[0],
          creature: 'mecha'
        },
        {
          id: heads[4],
          name: 'Medipad',
          image_url: null,
          attack_id: null,
          ability_id: abilities[1],
          creature: 'mecha'
        },
        {
          id: heads[5],
          name: 'Red Knight Helm',
          image_url: null,
          attack_id: null,
          ability_id: abilities[2],
          creature: 'mecha'
        },
        {
          id: heads[6],
          name: 'Hydra Heads',
          image_url: null,
          attack_id: attacks[3],
          ability_id: null,
          creature: 'kaiju'
        },
        {
          id: heads[7],
          name: 'Spider Head',
          image_url: null,
          attack_id: attacks[4],
          ability_id: null,
          creature: 'kaiju'
        },
        {
          id: heads[8],
          name: 'Eye of the Void',
          image_url: null,
          attack_id: attacks[5],
          ability_id: null,
          creature: 'kaiju'
        },
        {
          id: heads[9],
          name: 'Cyclone Laser System',
          image_url: null,
          attack_id: null,
          ability_id: abilities[3],
          creature: 'mecha'
        },
        {
          id: heads[10],
          name: 'Hypermatter Generator',
          image_url: null,
          attack_id: null,
          ability_id: abilities[4],
          creature: 'mecha'
        },
        {
          id: heads[11],
          name: 'Missile Support Platform',
          image_url: null,
          attack_id: null,
          ability_id: abilities[5],
          creature: 'mecha'
        }
      ]),
      knex('arms').insert([
        {
          id: arms[0],
          image_url: null,
          attack_id: attacks[0],
          creature: 'kaiju'
        },
        {
          id: arms[1],
          image_url: null,
          attack_id: attacks[0],
          creature: 'mecha'
        },
        {
          id: arms[2],
          image_url: null,
          attack_id: attacks[0],
          creature: 'kaiju'
        }
      ]),
      knex('attacks').insert([
        {
          id: attacks[0],
          name: 'scratch',
          aoe:false,
          dot:false
        }
      ]),
      knex('abilities').insert([
        {
          id: 1,
          name: 'avoid'
        }
      ]),
      knex('types').insert([
        {
          id: types[0],
          name: 'absorb',
          weakness: types[1],
        },
        {
          id: types[1],
          name: 'harden',
          weakness: types[2],
        },
        {
          id: types[2],
          name: 'reflect',
          weakness: types[0],
        }
      ]),
    ]);
  });
};
