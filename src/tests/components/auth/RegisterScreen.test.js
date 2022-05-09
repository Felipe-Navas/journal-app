import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { MemoryRouter } from 'react-router-dom'
import { RegisterScreen } from '../../../components/auth/RegisterScreen'
import { types } from '../../../types/types'

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

let wrapper = mount(
  <Provider store={store}>
    <MemoryRouter>
      <RegisterScreen />
    </MemoryRouter>
  </Provider>
)

describe('Testing the <RegisterScreen /> component', () => {
  beforeEach(() => {
    store = mockStore(initState)
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <RegisterScreen />
        </MemoryRouter>
      </Provider>
    )
  })
  test('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  test('should fail submitting the form for empty email', () => {
    const emailField = wrapper.find('input[name="email"]')
    emailField.simulate('change', {
      target: {
        name: 'email',
        value: '',
      },
    })

    wrapper.find('form').simulate('submit', {
      preventDefault: () => {},
    })
    const actions = store.getActions()
    expect(actions[0]).toEqual({
      type: types.uiSetError,
      payload: 'Email is not valid',
    })
  })

  test('should fail submitting the form for empty name', () => {
    const nameField = wrapper.find('input[name="name"]')
    nameField.simulate('change', {
      target: {
        name: 'name',
        value: '',
      },
    })

    wrapper.find('form').simulate('submit', {
      preventDefault: () => {},
    })
    const actions = store.getActions()
    expect(actions[0]).toEqual({
      type: types.uiSetError,
      payload: 'Name is required',
    })
  })

  test('should show the error in the screen', () => {
    const initState = {
      auth: {},
      ui: {
        loading: false,
        msgError: 'Email is not valid',
      },
    }

    const store = mockStore(initState)

    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <RegisterScreen />
        </MemoryRouter>
      </Provider>
    )
    expect(wrapper.find('.auth__alert-error').exists()).toBe(true)
    expect(wrapper.find('.auth__alert-error').text().trim()).toBe(
      'Email is not valid'
    )
  })
})
