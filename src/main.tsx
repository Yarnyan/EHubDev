import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './app/App.tsx'
import { Provider } from 'react-redux'
import { setupStore } from './store/store'
import { BrowserRouter } from 'react-router-dom'

const store = setupStore()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)