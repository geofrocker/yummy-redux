import * as registerActions from '../actions/registerActions';
import * as loginActions from '../actions/loginActions';
import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import * as types from '../actions/actionTypes';
import expect from 'expect';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Async Actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should create BEGIN_AJAX_CALL and REGISTER_SUCCESS when registering', (done) => {
    done();
    nock('https://yummy-api.herokuapp.com/auth/register').post('', {}).reply(201, { Message: '' });
    const expectedActions = [
      { type: types.BEGIN_AJAX_CALL },
      { type: types.REGISTER_SUCCESS, body: { message: 'You are now registered' } },
    ];

    const store = mockStore({ message: '' }, expectedActions);
    store.dispatch(registerActions.register()).then(() => {
      const actions = store.getActions();
      expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
      done();
    });
  });

  it('should create BEGIN_AJAX_CALL and LOGIN_SUCCESS when login', (done) => {
    done();
    nock('https://yummy-api.herokuapp.com/auth/login').post('', {}).reply(200, { Message: '' });
    const expectedActions = [
      { type: types.BEGIN_AJAX_CALL },
      { type: types.LOGIN_SUCCESS, body: { message: 'You are now logged in' } },
    ];

    const expectedActions2 = [
      { type: types.BEGIN_AJAX_CALL },
      { type: types.LOGIN_FAIL, body: { message: 'Invalid Credentials' } },
    ];

    const store = mockStore({ message: '' }, expectedActions);
    store.dispatch(loginActions.login()).then(() => {
      const actions = store.getActions();
      expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
    });
  });
});
