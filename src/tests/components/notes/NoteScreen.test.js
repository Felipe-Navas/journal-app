import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { activeNote } from '../../../actions/notes'
import { NoteScreen } from '../../../components/notes/NoteScreen'

jest.mock('../../../actions/notes', () => ({
  activeNote: jest.fn(),
}))

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initState = {
  auth: {
    uid: '123',
    name: 'John',
  },
  ui: {
    loading: false,
    msgError: null,
  },
  notes: {
    active: {
      id: '123456',
      title: 'Some title',
      body: 'Some body',
      url: 'http://google.com',
      date: 123,
    },
    notes: [],
  },
}

let store = mockStore(initState)

store.dispatch = jest.fn()

const wrapper = mount(
  <Provider store={store}>
    <NoteScreen />
  </Provider>
)

describe('Testing the <NoteScreen /> component', () => {
  test('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  test('should call the activeNote', () => {
    wrapper.find('input[name="title"]').simulate('change', {
      target: {
        name: 'title',
        value: 'Modified title',
      },
    })
    expect(activeNote).toHaveBeenLastCalledWith('123456', {
      body: 'Some body',
      title: 'Modified title',
      id: '123456',
      url: 'http://google.com',
      date: 123,
    })
  })
})
