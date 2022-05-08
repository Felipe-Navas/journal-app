import { uiReducer } from '../../reducers/uiReducer'
import { types } from '../../types/types'

describe('Testing the uiReducer', () => {
  test('should return the msgError with the uiSetError action', () => {
    const initialState = {
      isLoading: false,
      msgError: null,
    }
    const msgError = 'Some message error'
    const action = {
      type: types.uiSetError,
      payload: msgError,
    }
    const state = uiReducer(initialState, action)
    expect(state).toEqual({ isLoading: false, msgError })
  })

  test('should remove the msgError with the uiRemoveError action', () => {
    const initialState = {
      isLoading: false,
      msgError: null,
    }
    const action = {
      type: types.uiRemoveError,
    }
    const state = uiReducer(initialState, action)
    expect(state).toEqual({ isLoading: false, msgError: null })
  })

  test('should set the isLoading to true with the uiStartLoading action', () => {
    const initialState = {
      isLoading: false,
      msgError: null,
    }
    const action = {
      type: types.uiStartLoading,
    }
    const state = uiReducer(initialState, action)
    expect(state).toEqual({ isLoading: true, msgError: null })
  })

  test('should set the isLoading to false with the uiFinishLoading action', () => {
    const initialState = {
      isLoading: true,
      msgError: null,
    }
    const action = {
      type: types.uiFinishLoading,
    }
    const state = uiReducer(initialState, action)
    expect(state).toEqual({ isLoading: false, msgError: null })
  })

  test('should return the initialState when pass a not valid action', () => {
    const initialState = {
      isLoading: false,
      msgError: null,
    }
    const action = {
      type: 'not-valid-action',
      payload: 'not-valid-payload',
    }
    const state = uiReducer(initialState, action)
    expect(state).toEqual(initialState)
  })
})
