import {
  finishLoading,
  removeError,
  setError,
  startLoading,
} from '../../actions/ui'
import { types } from '../../types/types'

describe('Testing the ui actions', () => {
  test('should works correctly', () => {
    const action = setError('Error')
    expect(action).toEqual({
      type: types.uiSetError,
      payload: 'Error',
    })

    const removeErrorAction = removeError()
    expect(removeErrorAction).toEqual({
      type: types.uiRemoveError,
    })

    const startLoadingAction = startLoading()
    expect(startLoadingAction).toEqual({
      type: types.uiStartLoading,
    })

    const finishLoadingAction = finishLoading()
    expect(finishLoadingAction).toEqual({
      type: types.uiFinishLoading,
    })
  })
})
