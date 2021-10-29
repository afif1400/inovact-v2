import React, { useEffect, useState } from 'react'
import RequestProfile from './RequestProfile'
import ConnectionProfile from './ConnectionProfile'
import Spinner from '../../../Spinner'
import { useDispatch, useSelector } from 'react-redux'
import {
    updateConnectReqAcceptPending,
    updateMyConnections,
    updatePendingRequests,
    updateTotalNumberOfConnections,
} from 'redux/actions/connectionsAction'
import { userInfoConstants } from 'redux/actionTypes/userInfoConstants'
import { getFilteredPendingRequestsAndConnectedAccount } from './connectionsUtils'

function CenterRequests({ makeApiCall }: any) {
    const [showRequest, setShowRequest] = useState(true)
    const [showConnection, setShowConnection] = useState(false)
    const [pendingRequesLoad, setPendingRequestLoad] = useState<boolean>(true)
    const [myConnectionsLoad, setMyConnectionLoad] = useState<boolean>(true)

    const pendingRequests = useSelector(
        (state: any) => state.connections.pending_requests
    )
    const myConnections = useSelector(
        (state: any) => state.connections.my_connections
    )
    const dispatch = useDispatch()
    const connections = useSelector((state: any) => state.connections)

    useEffect(() => {
        console.log(connections)
    }, [connections])

    useEffect(() => {
        ;(async () => {
            const response = await makeApiCall('get', 'user')

            dispatch({
                type: userInfoConstants.UPDATE_WHOLE_PROFILE,
                payload: response.data.data.user[0],
            })
            const { id } = response.data.data.user[0]
            const ownId = id
            const dataFromConnectionApi = await makeApiCall(
                'get',
                'connections'
            )
            const allConnectionsFromApi =
                dataFromConnectionApi.data.data.connections

            const {
                filteredPendingRequest,
                filteredConnectedAccount,
                filteredConnectReqAcceptPending,
            } = getFilteredPendingRequestsAndConnectedAccount(
                allConnectionsFromApi,
                ownId
            )

            setPendingRequestLoad(false)
            setMyConnectionLoad(false)
            dispatch(updatePendingRequests(filteredPendingRequest))
            dispatch(updateMyConnections(filteredConnectedAccount))

            dispatch(
                updateTotalNumberOfConnections(filteredConnectedAccount.length)
            )
            dispatch(
                updateConnectReqAcceptPending(filteredConnectReqAcceptPending)
            )
        })()
    }, [])

    const handleRequestButton = (event: any) => {
        setShowRequest(true)
        setShowConnection(false)
    }
    const handleConnectionButton = (event: any) => {
        event.target.style.borderBottom = '2px solid blue'
        setShowRequest(false)
        setShowConnection(true)
    }

    const acceptConnectRequest = async (id: number, user: any) => {
        const filteredPendingRequests = pendingRequests.filter(
            (user: any) => user.id !== id
        )
        dispatch(updatePendingRequests(filteredPendingRequests))

        const response = await makeApiCall(
            'post',
            `connections/accept?user_id=${id}`
        )
        dispatch(updateMyConnections([...myConnections, user]))
        console.log(response)
    }

    const rejectConnectRequest = async (id: number) => {
        //call api to connect
        console.log(id)
        const filteredPendingRequest = pendingRequests.filter(
            (user: any) => user.id !== id
        )

        dispatch(updatePendingRequests(filteredPendingRequest))
        const response = await makeApiCall(
            'post',
            `connections/reject?user_id=${id}`
        )
        console.log(response)
    }

    const handleRemoveConnection = async (id: number) => {
        const filteredMyConnections = myConnections.filter(
            (user: any) => user.id !== id
        )
        dispatch(updateMyConnections(filteredMyConnections))
        const response = await makeApiCall(
            'post',
            `connections/remove?user_id=${id}`
        )
    }

    return (
        <div className="requests-connections">
            <div className="requests-connections-btn">
                <button
                    onClick={handleRequestButton}
                    style={{
                        borderBottom: showRequest
                            ? '5px solid #5579BD'
                            : 'none',
                    }}
                >
                    Requests ({pendingRequests.length})
                </button>
                <button
                    onClick={handleConnectionButton}
                    style={{
                        borderBottom: showConnection
                            ? '5px solid #5579BD'
                            : 'none',
                    }}
                >
                    My Connections ({myConnections.length})
                </button>
            </div>
            {showRequest && (
                <div className="requests-connections-profiles">
                    {pendingRequesLoad && <Spinner />}
                    {pendingRequests.length == 0 && !pendingRequesLoad && (
                        <span
                            style={{
                                marginTop: '10rem',
                            }}
                        >
                            Your pending requests will be shown here{' '}
                        </span>
                    )}
                    <div>
                        {!pendingRequesLoad &&
                            pendingRequests.length != 0 &&
                            pendingRequests.map((user: any) => (
                                <RequestProfile
                                    key={user.id}
                                    user={user}
                                    acceptConnectRequest={acceptConnectRequest}
                                    rejectConnectRequest={rejectConnectRequest}
                                />
                            ))}
                    </div>
                </div>
            )}
            {showConnection && (
                <div className="requests-connections-profiles">
                    {myConnectionsLoad && <Spinner />}
                    {!myConnectionsLoad && myConnections.length === 0 && (
                        <span
                            style={{
                                marginTop: '10rem',
                            }}
                        >
                            Your connections will be shown here{' '}
                        </span>
                    )}

                    <div>
                        {!myConnectionsLoad &&
                            myConnections.length !== 0 &&
                            myConnections.map((user: any, i: number) => (
                                <ConnectionProfile
                                    key={i}
                                    user={user}
                                    handleRemoveConnection={
                                        handleRemoveConnection
                                    }
                                />
                            ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default CenterRequests
