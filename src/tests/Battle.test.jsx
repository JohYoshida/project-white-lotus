// configuration, could be in a seperate file in the future.
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

// Required for this test file
import React from 'react';
import Battle from '../Battle.jsx';

// extensions
import {mount} from 'enzyme';
import { Server } from 'mock-socket';

// Sample players array object containing just one player
const samplePlayersArr= [{'id':1,
  team:{
    '1':{'id':1,'name':'Gojira','creature':'kaiju','maxHp':10,'hp':10,'type':{'id':1,'name':'fire','weakness':2},'image_url':'https://api.adorable.io/avatars/285/gojira.png','bench':true,'passiveActive':true,'attack':[{}]},
    '2':{'id':2,'name':'Rhino','creature':'mecha','maxHp':5,'hp':5,'type':{'id':1,'name':'fire','weakness':2},'image_url':'https://api.adorable.io/avatars/285/rhino.png','bench':true,'passiveActive':true,'attack':[]},
    '3':{'id':3,'name':'Mecha Gojira','creature':'kaiju','maxHp':12,'hp':12,'type':{'id':2,'name':'water','weakness':3},'image_url':'https://api.adorable.io/avatars/285/mecha_gojira.png','bench':true,'passiveActive':true,'attack':[{}]}},'turn':false}
];

test('The battle should update the state with the new playerInfo', done => {
  const mockServer = new Server('ws://localhost:3001/battles/1');
  mockServer.on('message', () => {
    mockServer.send(JSON.stringify(samplePlayersArr));
  });
  const battle = mount(<Battle />);
  battle.find('button').simulate('click');

  // Wait a second to let the states update.
  setTimeout(() => {
    const ready = battle.state('ready');
    const players = battle.state('players');
    // A try/catch block is necessary when using a timeout with the done(); function. Otherwise thrown error goes no where.
    try {
      expect(ready).toBe(true);
      expect(players[0].id).toBe(1);
      done();
    } catch (error) {
      done.fail(error);
    }
  }, 1000);
});

test('The battle page should display a button that lets the player select the primary monster', done => {
  done();
});
