import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { JournalEntry } from '../../../components/journal/JournalEntry'
import { activeNote } from '../../../actions/notes'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initState = {}

let store = mockStore(initState)

store.dispatch = jest.fn()

const note = {
  id: 1,
  date: '2020-01-01',
  title: 'Title',
  body: 'Body',
  url: 'https://www.google.com',
}

const wrapper = mount(
  <Provider store={store}>
    <JournalEntry {...note} />
  </Provider>
)

describe('Testing the <JournalEntry /> component', () => {
  test('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })
  test('should call the activeNote', () => {
    wrapper.find('.journal__entry').simulate('click')
    expect(store.dispatch).toHaveBeenLastCalledWith(activeNote(1, { ...note }))
  })
})
