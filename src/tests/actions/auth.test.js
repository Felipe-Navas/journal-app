import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {
  login,
  logout,
  startLoginEmailPassword,
  startLogout,
} from '../../actions/auth'
import { types } from '../../types/types'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initState = {}

let store = mockStore(initState)

describe('Testing the auth actions', () => {
  beforeEach(() => {
    store = mockStore(initState)
  })

  test('should create the actions', () => {
    const uid = 'some-uid'
    const displayName = 'some-display-name'

    const expectedAction = {
      type: types.login,
      payload: {
        uid,
        displayName,
      },
    }

    expect(login(uid, displayName)).toEqual(expectedAction)

    expect(logout()).toEqual({
      type: types.logout,
    })
  })

  test('should startLogout correctly', async () => {
    await store.dispatch(startLogout())
    const actions = store.getActions()
    expect(actions[0]).toEqual({
      type: types.logout,
    })
    expect(actions[1]).toEqual({
      type: types.notesLogoutCleaning,
    })
  })

  test('should startLoginEmailPassword correctly', async () => {
    await store.dispatch(startLoginEmailPassword('test@testing.com', '123456'))
    const actions = store.getActions()
    expect(actions[1]).toEqual({
      type: types.login,
      payload: {
        uid: 'PI56djgHXvYUm8gMWMskvaVul5b2',
        displayName: null,
      },
    })
  })
})
