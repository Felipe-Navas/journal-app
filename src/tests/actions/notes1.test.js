import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { startUploading } from '../../actions/notes'
import { db } from '../../firebase/firebase-config'

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

global.scrollTo = jest.fn()

jest.mock('../../helpers/fileUpload', () => ({
  fileUpload: jest.fn(() => Promise.resolve('https://some-url.com/foto.jpg')),
}))

describe('Testing the notes actions 1', () => {
  test('should update the note url with the method startUploading', async () => {
    //TODO: fix this test
    // const file = new File([], 'foto.jpg')

    // await store.dispatch(startUploading(file))

    // const docRef = await db.doc('testing/journal/notes/dqOQrIESvmwtnOmv79VQ').get()
    // expect(docRef.data().url).toBe('https://some-url.com/foto.jpg')
  })
})
