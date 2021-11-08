import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

const SuggestionInvitation = (props: any) => {
    const [currentTeam, setCurrTeam] = useState<any>()
    useEffect(() => {
        setCurrTeam(props.active_team)
    }, [props.active_team])
    const history = useHistory()
    const goToProfile = (id: string) => {
        localStorage.setItem('other-user', id)
        console.log('ConnectionProfile', id)
        history.push('/app/otherprofile')
    }
    return (
        <div className="suggestions">
            <h6 className="suggestions__title">Team Invitation</h6>
            {currentTeam && currentTeam.team_invitations == 0 ? (
                <div className="text-align--center">
                    You haven't Invited anyone yet{' '}
                </div>
            ) : null}
            {currentTeam &&
                currentTeam.team_invitations.map((team: any, key: any) => {
                    return (
                        <div className="suggestions__row">
                            <div
                                className="suggestions__row__rowInfo"
                                onClick={() => goToProfile(team.user.id)}
                            >
                                <img src={team.user.avatar} alt="" />

                                <div className="suggestions__row__text">
                                    <h5 className="text-style--bold text-align--left text-size--big">
                                        {team.user.first_name}
                                    </h5>
                                    <p className="text-style--light text-align--left text-size--small">
                                        {/* { new Date(team.invited_at).toUTCString() } */}
                                    </p>
                                </div>
                            </div>
                            <div className="suggestions__row__buttons">
                                <div className="text-color--grey text-style--italic">
                                    Pending
                                </div>
                            </div>
                        </div>
                    )
                })}
        </div>
    )
}
export default SuggestionInvitation
