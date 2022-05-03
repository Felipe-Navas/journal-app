import 'setimmediate'
import cloudinary from 'cloudinary'
import { fileUpload } from '../../helpers/fileUpload'

cloudinary.config({
  cloud_name: 'dt4qruz8v',
  api_key: '837221484537449',
  api_secret: 'ctHppgXlmusdWGo83NRKOxxyOz0',
  secure: true,
})

jest.setTimeout(10000)

describe('Testing the fileUpload', () => {
  test('should upload a file and return the url', async () => {
    const resp = await fetch(
      'https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__340.jpg'
    )
    const blob = await resp.blob()

    const file = new File([blob], 'picture.jpg')

    const url = await fileUpload(file)

    expect(typeof url).toBe('string')

    const segments = url.split('/')
    const imageId = segments[segments.length - 1].replace('.jpg', '')
    await cloudinary.v2.api.delete_resources(imageId, {}, () => {
      return
    })
  })

  test('should return an error', async () => {
    const file = new File([], 'picture.png')

    const url = await fileUpload(file)

    expect(url).toBe(null)
  })
})
