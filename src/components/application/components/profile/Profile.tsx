import React, { useEffect, useState } from 'react';
import LeftProfileContent from './components/LeftProfileContent/LeftProfileContent';
import TopProfileContent from './components/TopProfileContent/TopProfileContent';
// import Post from "../feed/components/center/Post";
import Post from "./components/RightProfileContent/Post";
import Photos from "../feed/components/center/Photos";
import {postData} from "../feed/components/center/postData";
import BlockAccount from './components/BlockAccount';
import RestrictAccount from './components/RestrictAccount';
import ReportAccount from './components/ReportAccount';
import ViewTeamMembers from '../feed/components/modals/ViewTeamMembers/ViewTeamMembers';
import CreateTeam from '../feed/components/modals/CreateTeam/CreateTeam';
import EditBio from './components/modals/EditBio';
import EditProject from './components/modals/EditProject';
import NoPostsYet from './components/LeftProfileContent/Components/NoPostsYet';
import PeopleYouMayKnow from '../connections/components/PeopleYouMayKnow';
function Profile() {
    // let leftContent, rightContent;
    // useEffect(()=>{
    //     const leftContent = document.querySelector(".profile--content-left");
    //     const rightContent = document.querySelector(".profile--content-right");
        
    // },[]);
    
    
    const [posts, setPosts] = useState<postData[]>([
        {
            id: '1',
            type: 1,
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?    ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
            author: 'Jane Doe',
            time: 10,
            title: 'Project Title',
            description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
 molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
 numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
 optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
 obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
 nihil, eveniet aliquid culpa officia aut!`,
            tags: [
                'OOP',
                'JavaScript',
                'HTML',
                'CSS',
                'ReactJS',
                'NodeJS',
                'MongoDB',
            ],
            images: [
                'https://images.unsplash.com/photo-1492551557933-34265f7af79e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
                'https://images.unsplash.com/photo-1614947746254-4fd8c6cb1a7f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=403&q=80',
                'https://images.unsplash.com/photo-1527219525722-f9767a7f2884?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1052&q=80',
                "https://www.lifewire.com/thmb/cobvsxBXqwdPzm17STO4o8pAdgA=/2121x1414/filters:no_upscale():max_bytes(150000):strip_icc()/what-is-zoom-and-how-does-it-work-b1cab4b7f8e9474fa46f5b50c8e694e4.jpg",
                "https://www.lifewire.com/thmb/cobvsxBXqwdPzm17STO4o8pAdgA=/2121x1414/filters:no_upscale():max_bytes(150000):strip_icc()/what-is-zoom-and-how-does-it-work-b1cab4b7f8e9474fa46f5b50c8e694e4.jpg",
                "https://www.lifewire.com/thmb/cobvsxBXqwdPzm17STO4o8pAdgA=/2121x1414/filters:no_upscale():max_bytes(150000):strip_icc()/what-is-zoom-and-how-does-it-work-b1cab4b7f8e9474fa46f5b50c8e694e4.jpg",
            ],
            numLikes: 250,
            numComments: 250,
            completion: 80,
        },
        {
            id: '2',
            type: 2,
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
            author: 'Jane Doe',
            time: 10,
            title: 'Idea Title',
            description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
 molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
 numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
 optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
 obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
 nihil, eveniet aliquid culpa officia aut!`,
            tags: [
                'OOP',
                'JavaScript',
                'HTML',
                'CSS',
                'ReactJS',
                'NodeJS',
                'MongoDB',
            ],
            numLikes: 250,
            numComments: 250,
        },
        {
            id: '3',
            type: 3,
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
            author: 'Jane Doe',
            time: 10,
            description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
 molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
 numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
 optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
 obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
 nihil, eveniet aliquid culpa officia aut!`,
            numLikes: 250,
            numComments: 250,
        },
    ]);
    const [showLeft, setShowLeft] = useState(true);
    const [showRight, setShowRight] = useState(true);
    const [showAbout, setShowAbout] = useState(false);
    
    // const leftContent = document.querySelector(".profile--content-left");
    // const rightContent = document.querySelector(".profile--content-right");
    useEffect(()=>{
        console.log("page loaded");
        if(window.innerWidth>900){
            setShowLeft(true);
            setShowRight(true);
            setShowAbout(false);
        }
        if(window.innerWidth<=900){
            setShowLeft(false);
            setShowRight(true);
            setShowAbout(true);
        }
    },[])
        // document.addEventListener("load",()=>{
        //     console.log("page loaded");
        //     if(window.innerWidth>900){
        //         setShowLeft(true);
        //         setShowRight(true);
        //         setShowAbout(false);
        //     }
        //     if(window.innerWidth<=900){
        //         setShowLeft(false);
        //         setShowRight(true);
        //         setShowAbout(true);
        //     }
        // });
    window.addEventListener("resize",()=>{
            if(window.innerWidth>900){
                setShowLeft(true);
                setShowRight(true);
                setShowAbout(false);
            }
            if(window.innerWidth<=900){
                setShowLeft(false);
                setShowRight(true);
                setShowAbout(true);
            }
    });
       
    useEffect (()=>{
        if(window.innerWidth>900){
            setShowLeft(true);
            setShowRight(true);
            setShowAbout(false);
        }
        if(window.innerWidth<=900){
            setShowLeft(false);
            setShowRight(true);
            setShowAbout(true);
        }
      },[])
    const [showOverlay, setShowOverlay] = useState(false);
    const [showBlockUser, setShowBlockUser] = useState(false);
    const [showReportUser, setShowReportUser] = useState(false);
    const [showRestrictUser, setShowRestrictUser] = useState(false);
    const [showTeamMembers, setShowTeamMembers] = useState(false);
    const [showCreateTeam, setShowCreateTeam] = useState(false);
    
    const [showEditBio, setShowEditBio] = useState(false);
    const [showEditProject, setShowEditProject] = useState(false);
    const openModal = ()=>{
        setShowOverlay(true);
        window.scrollTo(0,0);
        document.body.style.overflowY="hidden";
    }
    
    const closeModal = ()=>{
        setShowOverlay(false);
        setShowBlockUser(false);
        setShowReportUser(false);
        setShowRestrictUser(false);
        setShowTeamMembers(false);
        setShowEditBio(false);
        setShowCreateTeam(false);
        setShowEditProject(false)
        document.body.style.overflowY="scroll";
    }
    const blockAccount = ()=>{
        openModal();
        setShowBlockUser(true);
    }
    const restrictAccount = ()=>{
        openModal();
        setShowRestrictUser(true);
    }
    const reportAccount = () =>{
        openModal();
        setShowReportUser(true);
    }

    const viewTeamMembers =()=>{
        openModal();
        setShowTeamMembers(true);
    }
    const viewCreateTeam = ()=>{
        openModal();
        setShowCreateTeam(true);
    }
    const viewEditBio = ()=>{
        openModal();
        setShowEditBio(true);
    }
    const viewEditProject = ()=>{
        openModal();
        setShowEditProject(true);
    }
    return (
        <div>
            {
                showOverlay &&
                <div className="profile-modal-cover">
                    <div className="modal-overlay-profile" onClick={closeModal}></div>
                    
                    {
                        showBlockUser &&
                        <BlockAccount closeModal={closeModal}/>
                    }
                    {
                        showReportUser &&
                        <ReportAccount closeModal={closeModal} showBlockUser={blockAccount}/>
                    }
                    {
                        showRestrictUser &&
                        <RestrictAccount closeModal={closeModal}/>
                    }
                    {
                        showTeamMembers &&
                        <ViewTeamMembers closeModal={closeModal}/>
                    }
                    {
                        showCreateTeam && 
                        <CreateTeam closeModal={closeModal}/>
                    }
                    {
                        showEditBio &&
                        <EditBio closeModal= {closeModal}/>
                    }
                    {
                        showEditProject &&
                        <EditProject closeModal = {closeModal}/>
                    }
                </div>
                
                
            }

            <div className="profile--content">
                <div className="profile--content-top-container">
                    <TopProfileContent showLeft={showLeft} setShowLeft={setShowLeft} setShowRight={setShowRight} showAbout={showAbout}
                    showReportUser={reportAccount}
                    showBlockUser={blockAccount}
                    showRestrictUser={restrictAccount}/>
                </div>
                <div className="profile--content-bottom-container">
                    {
                        showLeft &&
                        <div className="profile--content-left">
                            <LeftProfileContent createTeam={viewCreateTeam} viewEditBio={viewEditBio} />
                        </div>
                    }
                    {
                        showRight && posts.length!==0 &&
                        
                        <div className="profile--content-right">
                            {posts.map((post, idx) => {
                                return <Post key={idx} post={post} openTeamMember={viewTeamMembers} viewEditProject={viewEditProject}/>
                            })}
                        </div>
                        
                    }
                    {
                        posts.length===0 &&
                        <div className="profile--content-right">
                            <NoPostsYet/>
                            <PeopleYouMayKnow/>
                        </div>

                    }
                    
                </div>
                
            </div>
        </div>
    );
}

export default Profile
