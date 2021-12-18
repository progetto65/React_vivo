import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, BrowserRouter } from 'react-router-dom'
import {Provider} from 'react-redux'
// const context = React.createContext()

import store from './store'

import App from './App'

const Router = process.env.NODE_ENV === 'production' ? BrowserRouter : HashRouter
ReactDOM.render(
    // <context.Provider value=""></context.Provider>
    <Provider store={store}>
        <Router>
            <App />
            {/* <Route path="/" component={App} /> */}
        </Router>
    </Provider>
    ,
    document.querySelector('#app')
)