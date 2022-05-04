/** * @jest-environment node */
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {
  startLoadingNotes,
  startNewNote,
  startSaveNote,
} from '../../actions/notes'
import { db } from '../../firebase/firebase-config'
import { types } from '../../types/types'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initState = {
  auth: {
    uid: 'testing',
  },
  notes: {
    active: {
      id: 'dqOQrIESvmwtnOmv79VQ',
      body: 'Some body',
      date: 158888888888,
      title: 'Some title',
    },
  },
}

let store = mockStore(initState)

describe('Testing the notes actions', () => {
  beforeEach(() => {
    store = mockStore(initState)
  })

  test('should create a new note with the method startNewNote', async () => {
    await store.dispatch(startNewNote())

    const noteCreated = {
      id: expect.any(String),
      body: '',
      date: expect.any(Number),
      title: '',
    }
    const actions = store.getActions()

    expect(actions[0]).toEqual({
      type: types.notesActive,
      payload: noteCreated,
    })
    expect(actions[1]).toEqual({
      type: types.notesAddNew,
      payload: noteCreated,
    })

    const docId = actions[0].payload.id
    await db.collection(`testing/journal/notes`).doc(docId).delete()
  })

  test('should load the notes with the method startLoadingNotes', async () => {
    await store.dispatch(startLoadingNotes('testing'))
    const actions = store.getActions()
    expect(actions[0]).toEqual({
      type: types.notesLoad,
      payload: expect.any(Array),
    })
    const expected = {
      id: expect.any(String),
      body: expect.any(String),
      date: expect.any(Number),
      title: expect.any(String),
    }

    expect(actions[0].payload[0]).toMatchObject(expected)
  })

  test('should save the note with the method startSaveNote', async () => {
    const note = {
      id: 'dqOQrIESvmwtnOmv79VQ',
      body: 'Body',
      title: 'Title',
      date: 158888888888,
    }

    await store.dispatch(startSaveNote(note))
    const actions = store.getActions()
    expect(actions[0].type).toBe(types.notesUpdated)

    const notesSnap = await db
      .doc(`testing/journal/notes/dqOQrIESvmwtnOmv79VQ`)
      .get()

    expect(notesSnap.data().title).toBe(note.title)
  })
})
