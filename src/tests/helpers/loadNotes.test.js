import { db } from '../../firebase/firebase-config'
import { loadNotes } from '../../helpers/loadNotes'

jest.mock('../../firebase/firebase-config', () => {
  const response = ['1', 'active']
  return {
    db: { collection: jest.fn(() => response) },
  }
})

describe('Testing the loadNotes helper', () => {
  test('should return an array of notes', async () => {
    const response = await loadNotes('1')
    // TODO: fix this test
    console.log(response)
  })
})
