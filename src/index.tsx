import React from 'react'
import ReactDOM from 'react-dom'
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import App from 'App'
import './index.css'

// Redux
import thunk from 'redux-thunk'
import reducer from './redux/user/reducer'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore, Store } from 'redux'

// Store
const store: Store<UserState, UserAction> & {
    dispatch: DispatchType
} = createStore(reducer, applyMiddleware(thunk))

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
)
