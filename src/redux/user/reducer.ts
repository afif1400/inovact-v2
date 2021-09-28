import { SET_USER_DATA } from './actionTypes'

const initialState: UserState = {
    user: {},
}

const reducer = (
    state: UserState = initialState,
    action: UserAction
): UserState => {
    switch (action.type) {
        case SET_USER_DATA:
            return { ...state }
    }
    return state
}

export default reducer
