import React, { ReactElement, ReactNode } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { createSerializer } from '@emotion/jest'
import { render } from '@testing-library/react'

import store from 'store/index'
import { authApi, chatApi } from 'store/server'

import '@testing-library/jest-dom'

global.React = React
global.customRender = (ui: ReactElement, options = {}) =>
  render(ui, {
    wrapper: ({ children }: { children: ReactNode }) => (
      <Provider store={store}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    ),
    ...options
  })

// Adds emotion snapshot serializer for deterministic tests
expect.addSnapshotSerializer(createSerializer({ includeStyles: false }))

beforeAll(() => {})

beforeEach(() => {
  store.dispatch(authApi.util.resetApiState())
  store.dispatch(chatApi.util.resetApiState())
})

afterAll(() => {})

afterEach(() => {})
