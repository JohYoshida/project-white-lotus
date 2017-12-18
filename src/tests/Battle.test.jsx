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

// Sample players array object containing both players
const samplePlayersArr= {players: [{'id':1,'team':{'1':{'id':1,'name':'Gojira','creature':'kaiju','maxHp':10,'hp':10,'type':{'id':1,'name':'fire','weakness':2},'image_url':'https://api.adorable.io/avatars/285/gojira.png','bench':true,'passiveActive':true,'dot':[],'attacks':[{'id':1,'name':'scratch','description':'Attack 1 description'}]},'2':{'id':2,'name':'Rhino','creature':'mecha','maxHp':5,'hp':5,'type':{'id':1,'name':'fire','weakness':2},'image_url':'https://api.adorable.io/avatars/285/rhino.png','bench':true,'passiveActive':true,'dot':[],'attacks':[{'id':1,'name':'scratch','description':'Attack 1 description'}]},'3':{'id':3,'name':'Mecha Gojira','creature':'kaiju','maxHp':12,'hp':12,'type':{'id':2,'name':'water','weakness':3},'image_url':'https://api.adorable.io/avatars/285/mecha_gojira.png','bench':true,'passiveActive':true,'dot':[],'attacks':[{'id':1,'name':'scratch','description':'Attack 1 description'}]}},'turn':false},
{'id':2,'team':{'1':{'id':1,'name':'Gojira','creature':'kaiju','maxHp':10,'hp':10,'type':{'id':1,'name':'fire','weakness':2},'image_url':'https://api.adorable.io/avatars/285/gojira.png','bench':true,'passiveActive':true,'dot':[],'attacks':[{'id':1,'name':'scratch','description':'Attack 1 description'}]},'2':{'id':2,'name':'Rhino','creature':'mecha','maxHp':5,'hp':5,'type':{'id':1,'name':'fire','weakness':2},'image_url':'https://api.adorable.io/avatars/285/rhino.png','bench':true,'passiveActive':true,'dot':[],'attacks':[{'id':1,'name':'scratch','description':'Attack 1 description'}]},'3':{'id':3,'name':'Mecha Gojira','creature':'kaiju','maxHp':12,'hp':12,'type':{'id':2,'name':'water','weakness':3},'image_url':'https://api.adorable.io/avatars/285/mecha_gojira.png','bench':true,'passiveActive':true,'dot':[],'attacks':[{'id':1,'name':'scratch','description':'Attack 1 description'}]}},'turn':false}], message: "test"};

let battle = undefined;

beforeAll(() => {
  const mockServer = new Server('ws://localhost:3001/battles/1');
  mockServer.on('message', () => {
    mockServer.send(JSON.stringify(samplePlayersArr));
  });
  battle = mount(<Battle />);
});

test('The battle should update the state with the new playerInfo', done => {
  battle.first('button').simulate('click');
  setTimeout(() => {
    // A try/catch block is necessary when using a timeout with the done(); function. Otherwise thrown error goes no where.
    try {
      const ready = battle.state('ready');
      const players = battle.state('players');
      expect(ready).toBe(true);
      expect(players[0].id).toBe(1);
      done();
    } catch (error) {
      done.fail(error);
    }
  }, 1000);
});

test('The battle page should display a button for each monster that lets the player select the primary monster', done => {
  battle.first('button').simulate('click');
  setTimeout(() => {
    try {
      expect(battle.find('.selectMonster').length).toBe(3);
      done();
    } catch (error) {
      done.fail(error);
    }
  }, 2000);
});
