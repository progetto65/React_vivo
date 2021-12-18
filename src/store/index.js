import {createStore,applyMiddleware,compose} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk'

import reducer from './reducers'


// const enhancer = applyMiddleware(thunk)

// 当存在多个中间件时，需要使用redux提供的compose合并成一个中间件
// let enhancer = compose(applyMiddleware(thunk),composeWithDevTools())
let enhancer = composeWithDevTools(applyMiddleware(thunk))


// reducer: 修改state的方法(Function)
// state: 初始状态(Object)
// enhancer：中间件(Function)
const store = createStore(reducer,enhancer);// 等效于createStore(reducer,undefined,enhancer)

console.log('state',store.getState())


export default store;