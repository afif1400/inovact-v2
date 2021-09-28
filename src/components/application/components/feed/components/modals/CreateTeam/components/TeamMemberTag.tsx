import React from 'react'

function TeamMemberTag(props: any) {
    return (
        <div className="team-member-tag">
            <span className="team-member-tag-email">{props.name}</span>
            <span className="team-member-tag-role">: {props.role}</span>
            <span className="team-member-tag-button" onClick={props.removeTeamMember.bind(null,props.id)}><button >&times;</button></span>
        </div>
    )
}

export default TeamMemberTag;
