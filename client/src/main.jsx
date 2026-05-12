import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store'
import App from './App'
import './index.css'
import SmoothScroll from './components/SmoothScroll'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <SmoothScroll>
        <App />
      </SmoothScroll>
    </Provider>
  </React.StrictMode>,
)
