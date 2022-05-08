/** * @jest-environment node */
import { db } from '../../firebase/firebase-config'
import { loadNotes } from '../../helpers/loadNotes'


describe('Testing the loadNotes helper', () => {
  test('should return an array of notes', async () => {
    const response = await loadNotes('testing')
    expect(Array.isArray(response)).toBe(true)
    expect(response[0]).toEqual({
      id: expect.any(String),
      body: expect.any(String),
      date: expect.any(Number),
      title: expect.any(String),
    })
  })

  test('should return an empty array when pass an invalid uid', async () => {
    const response = await loadNotes('testing1')
    expect(response).toEqual([])
   })
})
