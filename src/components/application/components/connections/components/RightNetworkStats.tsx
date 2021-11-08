import { TryRounded } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

function RightNetworkStats() {
    const userInfo = useSelector((state: any) => state.userInfo)
    const [totalConnections, setTotalConnections] = useState<number>(0)
    const [NoOfmentors, setNoOfMentors] = useState<number>(0)
    const [lastWeeksConnections, setLastWeeksConnections] = useState<number>(0)
    const my_connections = useSelector(
        (state: any) => state.connections.my_connections
    )
    const my_connnections_complete = useSelector(
        (state: any) => state.connections.my_connnections_complete
    )

    useEffect(() => {
        setTotalConnections(my_connections.length)
        const mentorsCount = my_connections.filter(
            (user: any) => user.role === 'mentor'
        ).length
        setNoOfMentors(mentorsCount)
    }, [my_connections])

    useEffect(() => {
        const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24
        const TODAYS_DATE: Date = new Date()
        const lastWeekConnections = my_connnections_complete.filter(
            (connection: any) => {
                if (connection.status == 'connected') {
                    const created_at: string = connection.created_at
                    const cretedDate = new Date(created_at)
                    const dateDifferenceInMs = Math.abs(
                        TODAYS_DATE.valueOf() - cretedDate.valueOf()
                    )
                    const dateDifference: number =
                        dateDifferenceInMs / ONE_DAY_IN_MS
                    return dateDifference < 7
                }
            }
        ).length
        setLastWeeksConnections(lastWeekConnections)
    }, [my_connnections_complete])

    return (
        <div className="right-network-stats">
            <div
                className="right-network-stats--img-container"
                style={{ margin: 'auto' }}
            >
                <img
                    src={userInfo.avatar}
                    className="right-network-stats--img"
                />
                <span>{userInfo.first_name + ' ' + userInfo.last_name}</span>
                <h5>Your Network Stats</h5>
            </div>
            <div className="right-network-stats--content">
                <div className="right-network-stats--content-titles">
                    <p>
                        <span>Total connections</span>
                        <span>{totalConnections}</span>
                    </p>
                    <p>
                        <span>Last week's connections</span>
                        <span>{lastWeeksConnections}</span>
                    </p>
                    <p>
                        <span>Your mentors</span>
                        <span>{NoOfmentors}</span>
                    </p>
                    <p>
                        <span>Appearances in People you may know</span>
                        <span>26</span>
                    </p>
                    <p>
                        <span>Percentage Growth</span>
                        <span style={{ color: '#07d400' }}>+3.95%</span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default RightNetworkStats
