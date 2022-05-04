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
    const initialState = {
      notes: [
        {
          id: '1',
          title: 'Title',
          content: 'Content',
          createdAt: '2020-01-01',
          updatedAt: '2020-01-01',
        },
        {
          id: '2',
          title: 'Title2',
          content: 'Content2',
          createdAt: '2020-01-02',
          updatedAt: '2020-01-02',
        },
      ],
      active: null,
    }
    const action = {
      type: types.notesUpdated,
      payload: {
        id: '2',
        note: {
          id: '2',
          title: 'TitleUpdated',
          content: 'Content2',
          createdAt: '2020-01-02',
          updatedAt: '2020-01-02',
        },
      },
    }
    const state = notesReducer(initialState, action)
    const expectedState = state.notes.find((note) => note.id === '2')
    expect(expectedState).toEqual({
      id: '2',
      title: 'TitleUpdated',
      content: 'Content2',
      createdAt: '2020-01-02',
      updatedAt: '2020-01-02',
    })
  })

  test('should delete the note', () => {
    const initialState = {
      notes: [
        {
          id: '1',
          title: 'Title',
          content: 'Content',
          createdAt: '2020-01-01',
          updatedAt: '2020-01-01',
        },
        {
          id: '2',
          title: 'Title2',
          content: 'Content2',
          createdAt: '2020-01-02',
          updatedAt: '2020-01-02',
        },
      ],
    }
    const action = {
      type: types.notesDelete,
      payload: '1',
    }
    const state = notesReducer(initialState, action)
    expect(state).toEqual({
      notes: [
        {
          id: '2',
          title: 'Title2',
          content: 'Content2',
          createdAt: '2020-01-02',
          updatedAt: '2020-01-02',
        },
      ],
      active: null,
    })
  })

  test('should clean the notes', () => {
    const initialState = {
      notes: [
        {
          id: '1',
          title: 'Title',
          content: 'Content',
          createdAt: '2020-01-01',
          updatedAt: '2020-01-01',
        },
      ],
    }
    const action = {
      type: types.notesLogoutCleaning,
    }
    const state = notesReducer(initialState, action)
    expect(state).toEqual({
      notes: [],
      active: null,
    })
  })

  test('should add a new note', () => {
    const initialState = {
      notes: [
        {
          id: '1',
          title: 'Title',
          content: 'Content',
          createdAt: '2020-01-01',
          updatedAt: '2020-01-01',
        },
      ],
    }
    const action = {
      type: types.notesAddNew,
      payload: {
        id: '2',
        title: 'Title2',
        content: 'Content2',
        createdAt: '2020-01-02',
        updatedAt: '2020-01-02',
      },
    }
    const state = notesReducer(initialState, action)
    expect(state.notes[0]).toEqual({
      id: '2',
      title: 'Title2',
      content: 'Content2',
      createdAt: '2020-01-02',
      updatedAt: '2020-01-02',
    })
  })

  test('should return the initialState when pass a not valid action', () => {
    const initialState = {
      notes: [
        {
          id: '1',
          title: 'Title',
          content: 'Content',
          createdAt: '2020-01-01',
          updatedAt: '2020-01-01',
        },
      ],
    }
    const action = {
      type: 'notValidAction',
      payload: {
        id: '2',
        title: 'Title2',
        content: 'Content2',
        createdAt: '2020-01-02',
        updatedAt: '2020-01-02',
      },
    }
    const state = notesReducer(initialState, action)
    expect(state).toEqual(initialState)
  })
})
