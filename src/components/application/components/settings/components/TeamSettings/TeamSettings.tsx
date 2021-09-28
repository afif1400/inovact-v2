import React from 'react'
import Toggle from '../Toggle/Toggle'
import { TeamsData } from './tempData'
const TeamSettings: React.FC = () => {
    const handleAllowOthersToViewTeam = (checked: boolean) => {
        console.log('handleAllowOthersToViewTeam', checked)
    }
    const handleAllowOthersToRequestJoin = (checked: boolean) => {
        console.log('handleAllowOthersToRequestJoin', checked)
    }
    const handleAllTeamMemberSendInvitation = (checked: boolean) => {
        console.log('handleAllTeamMemberSendInvitation', checked)
    }
    const handleDeleteTeam = (team: { _id: string; name: string }) => {
        console.log(team)
    }
    return (
        <div className={'teamset'}>
            <div
                className={
                    'teamset-head paragraph-primary text-style--bold text-color--black'
                }
            >
                General Team Settings
            </div>
            <div className={'teamset-select'}>
                <div className={'teamset-select-item'}>
                    <div className="text-color--black">
                        Allow other users to view your teams
                    </div>
                    <Toggle handleChecked={handleAllowOthersToViewTeam} />
                </div>
                <div className={'teamset-select-item'}>
                    <div className="text-color--black">
                        Allow everyone to request to join
                    </div>
                    <Toggle handleChecked={handleAllowOthersToRequestJoin} />
                </div>
                <div className={'teamset-select-item'}>
                    <div className="text-color--black">
                        Allow all team memebers to send invitations
                    </div>
                    <Toggle handleChecked={handleAllTeamMemberSendInvitation} />
                </div>
            </div>
            <div
                className={
                    'teamset-head paragraph-primary text-style--bold text-color--black'
                }
            >
                Delete a team
            </div>
            <div className={'teamset-delete'}>
                {TeamsData.map((team) => (
                    <>
                        <div className={'teamset-delete-team'}>
                            <div className="teamset-delete-team-left">
                                <img src={team.avatar} alt={team.name}></img>
                                <div className="teamset-delete-team-left-name text-style--bold text-color--black">
                                    {team.name}
                                </div>
                            </div>
                            <div
                                onClick={() => handleDeleteTeam(team)}
                                className={
                                    'teamset-delete-team-left-deleteTeam text-style--bold'
                                }
                            >
                                Delete team
                            </div>
                        </div>
                        <hr
                            style={{
                                border: 'none',
                                borderBottom: '1px solid black',
                            }}
                        />
                    </>
                ))}
            </div>
        </div>
    )
}

export default TeamSettings
