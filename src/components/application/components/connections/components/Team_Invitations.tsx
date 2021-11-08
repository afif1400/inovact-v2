import Spinner from 'components/application/Spinner'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { makeApiCall } from './connectionsUtils'

const Buttons = (props: any) => {
    const [isAcceptShow, setisAcceptShow] = useState<boolean>(true)
    const [isRejectShow, setisRejectShow] = useState<boolean>(true)
    const acceptTeamInvi = async (id: number) => {
        setisAcceptShow(true)
        setisRejectShow(false)
        props.acceptTeamInvitation(id)
    }

    const rejectTeamInvi = async (id: number) => {
        setisAcceptShow(false)
        setisRejectShow(true)
        props.rejectTeamInvitation(id)
    }

    return (
        <div
            style={{
                margin: 'auto',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
            }}
        >
            {isAcceptShow && (
                <button
                    className="connect-button"
                    onClick={() => acceptTeamInvi(props.invitation.id)}
                >
                    {isAcceptShow && isRejectShow && 'Accept'}
                    {isAcceptShow && !isRejectShow && 'Accepted'}
                </button>
            )}
            {isRejectShow && (
                <button
                    className="connect-button"
                    onClick={() => rejectTeamInvi(props.invitation.id)}
                >
                    {isAcceptShow && isRejectShow && 'Reject'}
                    {!isAcceptShow && isRejectShow && 'Rejected'}
                </button>
            )}
        </div>
    )
}
//used predefined styles
const Team_Invitations = () => {
    const [isLoad, setIsload] = useState<boolean>(true)
    const [allInvitations, setAllInvitations] = useState<any>([])
    const history = useHistory()

    const goToTeam = (teamid: string, userId: string) => {
        console.log('teamid:', teamid, 'userId:', userId)
        localStorage.setItem('other-user-selected-team-id', teamid)
        localStorage.setItem('other-user', userId)

        history.push('/app/otherteams')
    }
    const acceptTeamInvitation = async (id: number) => {
        const response = await makeApiCall('post', `team/invite/accept`, {
            invitation_id: id,
        })
        console.log(response)
        setTimeout(() => {
            setAllInvitations(
                allInvitations.filter((invitation: any) => invitation.id != id)
            )
        }, 1000)
    }

    const rejectTeamInvitation = async (id: number) => {
        const response = await makeApiCall('post', `team/invite/reject`, {
            invitation_id: id,
        })
        console.log(response)
        setTimeout(() => {
            setAllInvitations(
                allInvitations.filter((invitation: any) => invitation.id != id)
            )
        }, 1000)
    }
    useEffect(() => {
        ;(async () => {
            const res = await makeApiCall('get', 'notifications')
            const notificationDataFromAPi = res.data.data.user[0]
            const teamInvitations = notificationDataFromAPi['team_invitations']
            console.log(teamInvitations)
            setIsload(false)
            setAllInvitations(teamInvitations)
        })()
    }, [])
    return (
        <div className="team_invitation">
            <h6 className="team_invitation__title">Team Invitations</h6>
            <div className="team_invitation__body">
                {isLoad && <Spinner />}
                {!isLoad && allInvitations.length === 0 && (
                    <div className="text-align--center">
                        No Team Invitations
                    </div>
                )}
                {!isLoad &&
                    allInvitations.length !== 0 &&
                    allInvitations.map((invitation: any) => {
                        return (
                            <div
                                className="team_invitation__row"
                                key={Number(Math.random() * 1000)}
                            >
                                <div
                                    style={{
                                        width: '100%',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <div
                                        className="team_invitation__row__rowInfo"
                                        onClick={() =>
                                            goToTeam(
                                                invitation.team.id,
                                                invitation.team.team_members[0]
                                                    .user.id
                                            )
                                        }
                                    >
                                        <img
                                            src={
                                                invitation.team.img
                                                    ? invitation.team.img
                                                    : 'image'
                                            }
                                            alt="Team Image"
                                        />

                                        <div className="team_invitation__row__text">
                                            <h5 className="text-style--bold text-align--left text-size--big">
                                                {invitation.team.name}
                                            </h5>
                                            <p className="text-style--light text-align--left text-size--small"></p>
                                        </div>
                                    </div>
                                </div>
                                <Buttons
                                    invitation={invitation}
                                    acceptTeamInvitation={acceptTeamInvitation}
                                    rejectTeamInvitation={rejectTeamInvitation}
                                />
                            </div>
                        )
                    })}
            </div>
        </div>
    )
}

export default Team_Invitations
