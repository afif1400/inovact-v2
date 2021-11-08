import TeamTag from './TeamTag'
import React, { useState, useEffect } from 'react'
import AddCircleSharp from '@material-ui/icons/AddCircleSharp'
import { useSelector } from 'react-redux'
import axios from 'axios'
import Spinner from 'components/application/Spinner'
import { useHistory } from 'react-router'

function TeamsPartOf(props: any) {
    const [myTeams, setMyTeams] = useState([])
    const history = useHistory()

    const userInfo = useSelector((state: any) => state.otherUser)

    const getTheUserTeam = async () => {
        const userId = localStorage.getItem('other-user')
        console.log('userId', userId)
        await axios({
            method: 'get',
            url: `https://cg2nx999xa.execute-api.ap-south-1.amazonaws.com/dev/user/team?user_id=${userId}`,
            headers: {
                Authorization: localStorage.getItem('user'),
            },
        })
            .then((resp: any) => {
                console.log('TeamsPartOf other user id', userId)
                console.log(
                    ' TeamsPartOf result of api call',
                    resp.data.data.team
                )
                setMyTeams(resp.data.data.team)
            })
            .then(() => {
                // history.push("/app/otherteams");
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        ;(async () => {
            await getTheUserTeam()
        })()
    }, [userInfo.id])

    const goToOtherTeam = () => {
        history.push('/app/otherteams')
    }
    return (
        <div className="dashboard-main">
            <div className="teams-part-of">
                <div className="teams-part-of-heading">
                    <p>{userInfo.first_name}'s Team</p>
                </div>

                {myTeams.length !== 0 ? (
                    <div className="teams-part-of-all-teams">
                        {' '}
                        {myTeams.slice(0, 3).map((team: any, i: number) => {
                            return (
                                <TeamTag
                                    key={i}
                                    img={team.avatar}
                                    teamName={team.name}
                                    membersCount={team.team_members.length}
                                />
                            )
                        })}
                        <button
                            className="teams-part-of-view-all-btn"
                            onClick={() => goToOtherTeam()}
                        >
                            View All
                        </button>
                    </div>
                ) : (
                    <div className="text-align--center">
                        {userInfo.first_name} is not a part of any team yet{' '}
                    </div>
                )}
            </div>
        </div>
    )
}
export default TeamsPartOf
