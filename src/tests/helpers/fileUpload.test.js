import { fileUpload } from '../../helpers/fileUpload'

describe('Testing the fileUpload', () => {
  test('should upload a file and return the url', async () => {
    const resp = await fetch(
      'https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__340.jpg'
    )
    const blob = await resp.blob()

    const file = new File([blob], 'picture.png')

    const url = await fileUpload(file)

    expect(typeof url).toBe('string')
    //TODO: delete the file uploaded to cloudinary
  })

  test('should return an error', async () => {
    const file = new File([], 'picture.png')

    const url = await fileUpload(file)

    expect(url).toBe(null)
  })
})
