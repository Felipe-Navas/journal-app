import { authReducer } from '../../reducers/authReducer'
import { types } from '../../types/types'

describe('Testing the authReducer', () => {
  test('should login', () => {
    const initialState = {}
    const action = {
      type: types.login,
      payload: {
        uid: '123',
        displayName: 'John Doe',
      },
    }
    const state = authReducer(initialState, action)
    expect(state).toEqual({ uid: '123', name: 'John Doe' })
  })

  test('should logout', () => {
    const initialState = { uid: '121231233', name: 'John Doe' }
    const action = {
      type: types.logout,
    }
    const state = authReducer(initialState, action)
    expect(state).toEqual({})
  })

  test('should return the initialState when pass a not valid action', () => {
    const initialState = { uid: '121231233', name: 'John Doe' }
    const action = {
      type: 'not-valid-action',
    }
    const state = authReducer(initialState, action)
    expect(state).toEqual(initialState)
  })
})
