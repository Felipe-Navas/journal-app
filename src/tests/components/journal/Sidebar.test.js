import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { startLogout } from '../../../actions/auth'
import { startNewNote } from '../../../actions/notes'
import { Sidebar } from '../../../components/journal/Sidebar'

jest.mock('../../../actions/notes', () => ({
  startNewNote: jest.fn(),
}))

jest.mock('../../../actions/auth', () => ({
  startLogout: jest.fn(),
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
    active: null,
    notes: [],
  },
}

let store = mockStore(initState)

store.dispatch = jest.fn()

const wrapper = mount(
  <Provider store={store}>
    <Sidebar />
  </Provider>
)

describe('Testing the <Sidebar /> component', () => {
  test('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  test('should call the startLogout method', () => {
    wrapper.find('button').simulate('click')
    expect(startLogout).toHaveBeenCalled()
  })

  test('should call the startNewNote method', () => {
    wrapper.find('.journal__new-entry').simulate('click')
    expect(startNewNote).toHaveBeenCalled()
  })
})
