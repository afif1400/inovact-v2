import React from 'react'
import Toggle from '../Toggle/Toggle'
import { TeamsData } from './tempData'
interface teamSettings {
    deleteTeam(team: { _id: string; name: string }): void
}
const TeamSettings: React.FC<teamSettings> = ({ deleteTeam }) => {
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
        deleteTeam(team)
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
                    <Toggle
                        checked={true}
                        handleChecked={handleAllowOthersToViewTeam}
                    />
                </div>
                <div className={'teamset-select-item'}>
                    <div className="text-color--black">
                        Allow everyone to request to join
                    </div>
                    <Toggle
                        checked={true}
                        handleChecked={handleAllowOthersToRequestJoin}
                    />
                </div>
                <div className={'teamset-select-item'}>
                    <div className="text-color--black">
                        Allow all team memebers to send invitations
                    </div>
                    <Toggle
                        checked={true}
                        handleChecked={handleAllTeamMemberSendInvitation}
                    />
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
                {TeamsData.map((team, i) => (
                    <div className={'teamset-delete-team'} key={i}>
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
                        {/* <hr
                            style={{
                                border: 'none',
                                borderBottom: '1px solid black',
                            }}
                        /> */}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TeamSettings
