import React, { useState } from 'react'
import TeamMemberTag from './TeamMemberTag';

function TeamMembers() {
    const [teamMembers, setTeamMembers] = useState<Object[]>([]);
    const [currentName, setCurrentName] = useState("");
    const [currentRole, setCurrentRole] = useState("");

    const handleChangeName = (e: any)=>{
        setCurrentName(e.target.value)
    }

    const handleChangeRole = (e: any)=>{
        setCurrentRole(e.target.value);
    }
    const addTeamMember = (name: any, role: any)=>{
        if(currentName && currentRole){
            setCurrentName("");
            setCurrentRole("");
            setTeamMembers([...teamMembers, {name, role}]) 
        }
        
    }
    const removeTeamMember = (id: any)=>{
        setTeamMembers([...teamMembers.filter((ele: any,index: any)=>index!==id)]);
    }
    return (
        <div className="team-members">
            <span>Type the name of the members your would like to add your team</span>
            <div className="team-members-add">
                <input type="text" placeholder="Name" onChange={handleChangeName} value={currentName}/>
                <input type="text" placeholder="Role" onChange={handleChangeRole} value={currentRole}/>
                <button onClick={addTeamMember.bind(null, currentName, currentRole)} className="team-members-addbtn">+Add Member</button>
            </div>
            <div className="team-member-tags-container">
                {
                    teamMembers.map((ele: any, index: any)=>{
                        return (<TeamMemberTag name={ele.name} role={ele.role} removeTeamMember={removeTeamMember} id={index}/>);
                    })
                }
            </div>
        </div>
    )
}

export default TeamMembers;
