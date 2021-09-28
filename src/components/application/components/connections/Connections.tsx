import React,{useState} from 'react'
import NavBar from 'components/application/components/NavBar'
import RightNetworkStats from './components/RightNetworkStats';
import CenterRequests from './components/CenterRequests';
import PeopleYouMayKnow from './components/PeopleYouMayKnow';
import RightFilterDropdown from './components/RightFilterDropdown';

function Connections() {
    const [showNetowrkStatsRight, setShowNetworkStatsRight] = useState(true);
    window.addEventListener("resize", ()=>{
        if(window.innerWidth<992){
            setShowNetworkStatsRight(false);
        }
        if(window.innerWidth>992){
            setShowNetworkStatsRight(true);
        }
    })
    return (
    <div className="connections-page">
        <div className="connections-top-components">
            <CenterRequests/>
            {
                !showNetowrkStatsRight &&
                <RightNetworkStats/>  
            }
            <PeopleYouMayKnow/>
        </div>
        <div className="connections-right-components">
            {
                showNetowrkStatsRight &&
                <RightNetworkStats/>  
            }
        </div>
    </div>
    )
}

export default Connections;
