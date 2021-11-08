import axios from 'axios'
import { userInfoConstants } from 'redux/actionTypes/userInfoConstants'
import { store } from 'redux/helpers/store'

const findTimeDiffString = (connectedDateString: string) => {
    const ONE_SECONDS_IN_MS = 1000
    const ONE_MINUTE = ONE_SECONDS_IN_MS * 60
    const ONE_HOUR = ONE_MINUTE * 60
    const ONE_DAY = ONE_HOUR * 24
    const ONE_MONTH = ONE_DAY * 30
    const ONE_YEAR = ONE_MONTH * 12

    const todaysDate = new Date().getTime()
    const connectedDate = new Date(connectedDateString).getTime()
    const time_difference_in_ms = Math.abs(todaysDate - connectedDate)

    const years = Math.round(time_difference_in_ms / ONE_YEAR)
    const months = Math.round(time_difference_in_ms / ONE_MONTH)
    const days = Math.round(time_difference_in_ms / ONE_DAY)
    const hours = Math.round(time_difference_in_ms / ONE_HOUR) - 1
    const minutes = Math.round(time_difference_in_ms / ONE_MINUTE)

    if (years) return `${years} year`
    if (months) return `${months} months`
    if (days) return `${days} day`
    if (hours) return `${hours} hour`

    return `${minutes} minute`
}

const getFilteredPendingRequestsAndConnectedAccount = (
    allConnectionsFromApi: any,
    ownId: number
) => {
    let filteredPendingRequest: any = []
    let filteredConnectedAccount: any = []
    let filteredConnectReqAcceptPending: any = []
    let filteredConnectedAccountComplete: any = []
    let filteredConnectionId: number[] = []
    allConnectionsFromApi.forEach((connection: any) => {
        console.log('ownId', ownId)

        const otherUser =
            connection.user1 === ownId
                ? connection['userByUser2']
                : connection['user']
        const otherUserDisplayData = {
            id: otherUser.id,
            name: `${otherUser.first_name} ${otherUser.last_name}`,
            avatar: otherUser.avatar,
            designation: 'inovact', //otherUser.designation,
            connected_at: connection.created_at,
            connected_at_in_words: findTimeDiffString(connection.created_at),
            role: otherUser.role,
        }
        if (otherUser.id !== ownId) {
            //user1 is connection sender user2 is receiver
            if (connection.status === 'pending' && connection.user2 === ownId) {
                filteredPendingRequest.push(otherUserDisplayData)
            } else if (
                connection.status === 'pending' &&
                connection.user1 === ownId
            ) {
                filteredConnectReqAcceptPending.push(otherUserDisplayData)
            } else {
                filteredConnectedAccount.push(otherUserDisplayData)
                filteredConnectedAccountComplete.push(connection)
                filteredConnectionId.push(otherUser.id)
            }
        }
    })

    filteredPendingRequest = filteredPendingRequest.reverse()
    filteredConnectedAccount = filteredConnectedAccount.reverse()
    filteredConnectReqAcceptPending = filteredConnectReqAcceptPending.reverse()
    return {
        filteredPendingRequest,
        filteredConnectedAccount,
        filteredConnectReqAcceptPending,
        filteredConnectedAccountComplete,
        filteredConnectionId,
    }
}
const makeApiCall = async (method: any, route: string, data = {}) => {
    console.log('method : ', method, ' ', 'route :', route)

    const response = await axios({
        method: method,
        url: `https://cg2nx999xa.execute-api.ap-south-1.amazonaws.com/dev/${route}`,
        data: data,
        headers: {
            Authorization: localStorage.getItem('user'),
            'Content-Type': 'application/json',
        },
    })

    return response
}

const getConnectionsAllData = async (user_id: any) => {
    if (user_id === null || user_id === undefined) {
        try {
            const response = await makeApiCall('get', 'user')
            store.dispatch({
                type: userInfoConstants.UPDATE_WHOLE_PROFILE,
                payload: response.data.data.user[0],
            })
            user_id = response.data.data.user[0].id
        } catch (err) {
            console.log(err)
        }
    }

    const ownId = user_id
    const dataFromConnectionApi = await makeApiCall('get', 'connections')
    console.log(dataFromConnectionApi)
    const all_connection_data = dataFromConnectionApi.data.data.connections

    const {
        filteredPendingRequest,
        filteredConnectedAccount,
        filteredConnectReqAcceptPending,
        filteredConnectedAccountComplete,
        filteredConnectionId,
    } = getFilteredPendingRequestsAndConnectedAccount(
        all_connection_data,
        ownId
    )
    console.log(filteredConnectedAccountComplete)
    return {
        filteredPendingRequest,
        filteredConnectedAccount,
        filteredConnectReqAcceptPending,
        filteredConnectedAccountComplete,
        filteredConnectionId,
    }
}
export {
    getFilteredPendingRequestsAndConnectedAccount,
    findTimeDiffString,
    makeApiCall,
    getConnectionsAllData,
}
