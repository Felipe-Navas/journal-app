import React from 'react'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import '@testing-library/jest-dom'
import { act } from '@testing-library/react'

import { MemoryRouter } from 'react-router-dom'
import { login } from '../../actions/auth'
import { AppRouter } from '../../routers/AppRouter'
import Swall from 'sweetalert2'

import { firebase } from '../../firebase/firebase-config'

jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}))

jest.mock('../../actions/auth', () => ({
  login: jest.fn(),
}))

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initState = {
  auth: {},
  ui: {
    loading: false,
    msgError: null,
  },
  notes: {
    active: {
      id: 'abc',
    },
    notes: [],
  },
}

let store = mockStore(initState)

store.dispatch = jest.fn()

describe('Testing the AppRouter', () => {
  test('should call the login method if i am authenticated', async () => {
    let user

    // TODO: fix this test
    // await act(async () => {
    //   const userCred = await firebase
    //     .auth()
    //     .signInWithEmailAndPassword('test@testing.com', '123456')

    //   const wrapper = mount(
    //     <Provider store={store}>
    //       <MemoryRouter>
    //         <AppRouter />
    //       </MemoryRouter>
    //     </Provider>
    //   )
    //   user = userCred.user
    // })

    // expect(login).toHaveBeenCalled()
    // expect(Swall).toHaveBeenCalled()
    // expect(login).toHaveBeenCalledWith(user.uid, user.displayName)
  })
})
