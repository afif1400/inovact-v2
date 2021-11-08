import React, { useEffect, useState } from 'react'
import RequestProfile from './RequestProfile'
import ConnectionProfile from './ConnectionProfile'
import Spinner from '../../../Spinner'
import { useDispatch, useSelector } from 'react-redux'
import {
    updateConnectedAccountId,
    updateConnectionComplete,
    updateConnectReqAcceptPending,
    updateMyConnections,
    updatePendingRequests,
} from 'redux/actions/connectionsAction'
import { userInfoConstants } from 'redux/actionTypes/userInfoConstants'
import {
    getConnectionsAllData,
    getFilteredPendingRequestsAndConnectedAccount,
    makeApiCall,
} from './connectionsUtils'

function CenterRequests() {
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
    const user_id = useSelector((state: any) => state.userInfo.id)

    useEffect(() => {
        ;(async () => {
            const {
                filteredPendingRequest,
                filteredConnectedAccount,
                filteredConnectReqAcceptPending,
                filteredConnectedAccountComplete,
                filteredConnectionId,
            } = await getConnectionsAllData(user_id)

            setPendingRequestLoad(false)
            setMyConnectionLoad(false)
            dispatch(updatePendingRequests(filteredPendingRequest))
            dispatch(updateMyConnections(filteredConnectedAccount))
            dispatch(updateConnectionComplete(filteredConnectedAccountComplete))
            dispatch(
                updateConnectReqAcceptPending(filteredConnectReqAcceptPending)
            )
            dispatch(updateConnectedAccountId(filteredConnectionId))
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
        dispatch(updateMyConnections([...myConnections, user]))

        const response = await makeApiCall(
            'post',
            `connections/accept?user_id=${id}`
        )
    }

    const rejectConnectRequest = async (id: number) => {
        //call api to connect
        const filteredPendingRequest = pendingRequests.filter(
            (user: any) => user.id !== id
        )

        dispatch(updatePendingRequests(filteredPendingRequest))
        const response = await makeApiCall(
            'post',
            `connections/reject?user_id=${id}`
        )
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
