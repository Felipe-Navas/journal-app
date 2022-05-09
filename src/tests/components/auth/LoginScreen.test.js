import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { MemoryRouter } from 'react-router-dom'
import { LoginScreen } from '../../../components/auth/LoginScreen'
import {
  startGoogleLogin,
  startLoginEmailPassword,
} from '../../../actions/auth'

jest.mock('../../../actions/auth', () => ({
  startGoogleLogin: jest.fn(),
  startLoginEmailPassword: jest.fn(),
}))

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initState = {
  auth: {},
  ui: {
    loading: false,
    msgError: null,
  },
}

let store = mockStore(initState)

store.dispatch = jest.fn()

const wrapper = mount(
  <Provider store={store}>
    <MemoryRouter>
      <LoginScreen />
    </MemoryRouter>
  </Provider>
)

describe('Testing the LoginScreen component', () => {
  beforeEach(() => {
    store = mockStore(initState)
    jest.clearAllMocks()
  })

  test('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  test('should call the startGoogleLogin action', () => {
    wrapper.find('.google-btn').simulate('click')
    expect(startGoogleLogin).toHaveBeenCalled()
  })

  test('should call the startLogin action', () => {
    wrapper.find('form').simulate('submit', {
      preventDefault: () => {},
    })

    expect(startLoginEmailPassword).toHaveBeenCalled()
    expect(startLoginEmailPassword).toHaveBeenCalledWith(
      'felipe@gmail.com',
      '123456'
    )
  })
})
