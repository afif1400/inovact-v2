import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from 'redux/reducers/index';

export const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware,
    )
);