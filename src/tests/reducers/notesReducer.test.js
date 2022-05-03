import { notesReducer } from '../../reducers/notesReducer'
import { types } from '../../types/types'

describe('Testing the notesReducer', () => {
  test('should active the note', () => {
    const initialState = {
      notes: [],
      active: null,
    }
    const action = {
      type: types.notesActive,
      payload: {
        id: '1',
        title: 'Title',
        content: 'Content',
        createdAt: '2020-01-01',
        updatedAt: '2020-01-01',
      },
    }
    const state = notesReducer(initialState, action)
    expect(state).toEqual({
      notes: [],
      active: {
        id: '1',
        title: 'Title',
        content: 'Content',
        createdAt: '2020-01-01',
        updatedAt: '2020-01-01',
      },
    })
  })

  test('should load the notes', () => {
    const initialState = {
      notes: [],
      active: null,
    }

    const action = {
      type: types.notesLoad,
      payload: [
        {
          id: '1',
          title: 'Title',
          content: 'Content',
          createdAt: '2020-01-01',
          updatedAt: '2020-01-01',
        },
      ],
    }
    const state = notesReducer(initialState, action)
    expect(state).toEqual({
      notes: [
        {
          id: '1',
          title: 'Title',
          content: 'Content',
          createdAt: '2020-01-01',
          updatedAt: '2020-01-01',
        },
      ],
      active: null,
    })
  })

  test('should update the note', () => {
    //TODO: Add this test
  })

  test('should delete the note', () => {
    //TODO: Add this test
  })

  test('should clean the notes', () => {
    //TODO: Add this test
  })

  test('should add a new note', () => {
    //TODO: Add this test
  })

  test('should return the initialState when pass a not valid action', () => {
    //TODO: Add this test
  })
})
