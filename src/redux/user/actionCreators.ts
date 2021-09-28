import { SET_USER_DATA } from './actionTypes'

export function setUserData(data: IUser) {
    const action: UserAction = {
        type: SET_USER_DATA,
        payload: data,
    }
    return action
}
