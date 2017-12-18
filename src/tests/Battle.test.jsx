// configuration, could be in a seperate file in the future.
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

// Required for this test file
import React from 'react';
import Battle from '../Battle.jsx';
import sampleGameStartObj from './sample_game_start_obj'

// extensions
import {mount} from 'enzyme';
import { Server } from 'mock-socket';

let battle = undefined;
let mockServer = undefined;

beforeEach(() => {
  mockServer = new Server('ws://localhost:3001/battles/1');
  mockServer.on('message', () => {
    mockServer.send(JSON.stringify(sampleGameStartObj));
  });
  battle = mount(<Battle />);
});

test('The battle should update the state with the new playerInfo', done => {
  battle.find('button').first().simulate('click');
  setTimeout(() => {
    // A try/catch block is necessary when using a timeout with the done(); function. Otherwise thrown error goes no where.
    try {
      const ready = battle.state('ready');
      const game = battle.state('game');
      expect(ready).toBe(true);
      expect(game.players[0].id).toBe('1');
      mockServer.stop(done);
    } catch (error) {
      done.fail(error);
    }
  }, 1000);
});
