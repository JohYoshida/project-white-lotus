
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return Promise.all([
    knex('monsters').del(),
    knex('users').del(),
    knex('teams_monster').del(),
    knex('bodies').del(),
    knex('heads').del(),
    knex('arms').del(),
    knex('types').del(),
    knex('abilities').del(),
  ]).then(function () {
    // Inserts seed entries
    return Promise.all([
      knex('monsters').insert([
        {
          id: 1,
          name: 'Gojira',
          user_id: 1,
          body_id: 1,
          arm_id: 1,
          head_id: 1
        },
      ]),
      knex('bodies').insert([
        {
          id: 1,
          image_url:'https://api.adorable.io/avatars/285/gojira.png',
          hp: 10,
          current_hp: 10,
          type_id: 1,
          creature: 'kaiju'
        }
      ]),
      knex('heads').insert([
        {
          id: 1,
          image_url: null,
          attack_id: 1,
          ability_id: null,
          creature: 'kaiju'
        }
      ]),
      knex('arms').insert([
        {
          id: 1,
          image_url: null,
          attack_id: 1,
          creature: 'kaiju'
        }
      ]),
      knex('attacks').insert([
        {
          id: 1,
          name: 'scratch',
          type_id: 1
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
          id: 1,
          name: 'fire',
          weakness: 2,
        },
        {
          id: 2,
          name: 'water',
          weakness: 3,
        },
        {
          id: 3,
          name: 'earth',
          weakness: 1,
        }
      ]),
    ]);
  });
};
