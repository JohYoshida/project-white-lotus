// configuration, could be in a seperate file in the future.
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

// Required for this test file
import React from 'react';
import Battle from '../Battle.jsx';
import sampleObjs from './sample_game_start_obj'

const {sampleGameStartObj, sampleAttackObj, sampleUnbenchObj, sampleGameOverObj} = sampleObjs;

// extensions
import {mount} from 'enzyme';
import { WebSocket, Server } from 'mock-socket';
let battle = undefined;
let mockServer = undefined;

beforeAll(() => {
  mockServer = new Server('ws://localhost:3001/battles/1');
  battle = mount(<Battle />);
});

test('The battle should update the state with the unbench buttons', done => {
  mockServer.on('message', () => {
    mockServer.send(JSON.stringify(sampleGameStartObj));
  });
  battle.find('button').first().simulate('click');
  setTimeout(() => {
    try {
      battle.update();
      expect(battle.find('button').length).toBe(3);
      done();
    } catch (error) {
      done.fail(error);
    }
  }, 1000);
});

test('Click the attack button should cause damage to occur', done => {
  mockServer.on('message', () => {
    mockServer.send(JSON.stringify(sampleAttackObj));
  });
  battle.setState({game:sampleUnbenchObj.game});
  expect(battle.state('game').idlePlayer.activeMonster.hp).toBe(11);
  battle.update();
  battle.find('button').first().simulate('click');
  battle.update();
  expect(battle.state('game').activePlayer.activeMonster.hp).toBe(10);
  done();
});

test('When the game is over, a modal should appear.', done => {
  battle.setState({game:sampleGameOverObj.game});
  battle.update();
  expect(battle.state('game').gameOver).toBeTruthy;
  expect(battle.find('.modal').length).toBe(1);
  done();
});
