import React,{useState} from 'react'
import {
    MDBTabsContent,
    MDBTabsPane,
  } from 'mdb-react-ui-kit';

//components
import UserTeam from 'components/application/components/teams/components/left/userTeams/UserTeamsList'

//icons
import MenuIcon from '@material-ui/icons/Menu';
import pdf from 'images/teams/pdf.svg'
import back from 'images/teams/back.svg'
import add from 'images/teams/add.svg'
//schema
import {teamData }from 'components/application/components/teams/teamData';

function Messages() {
    const [teams,setTeams] =useState<teamData[]>([
      {
        id: 1,
        teamname: 'Team Name',
        title: 'React Web dev',
        description: 'rLorem ipsum dolor sit amet consectetu adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborunumquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium',
        tags: [
            'OOPS',
            'JavaScript',
            'HTML',
            'CSS',
            'ReactJS',
            'NodeJS',
            'MongoDB',
        ],
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?    ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
        members: [
            {
            id:"1",
            role:'student',
            name:'Jane Doe',
            designation:'Designation'
          },
          {
            id:"2",
            role:'student',
            name:'Jane Doe',
            designation:'Designation'
          },
        ],
        documents: [pdf,pdf],
        requests: [
            {
            id:"1",
            role:'student',
            name:'Jane Doe',
            designation:'Designation'
          },
          {
            id:"2",
            role:'student',
            name:'Jane Doe',
            designation:'Designation'
          },
        ],
        projects:[
          {
            title:'Projevct Title',
            status :true
          },
          {
            title:'Projevct Title',
            status :true
          },
          {
            title:'Projevct Title',
            status :true
          },
        ],
        ideas :[
          {
            title:'Idea Title',
          },
          {
            title:'Idea Title',
          },
           ]
    },
   
    ])
    const [verticalActive, setVerticalActive] = useState(1);
    const handleVerticalClick = (value: number) => {
      if (value === verticalActive) {
        return;
      }
      setVerticalActive(value);
    };

    return (

      <div>    
      Messages
    </div>
    )
}

export default Messages
