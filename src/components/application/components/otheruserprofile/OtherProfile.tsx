import React, { useEffect, useState } from 'react'
import LeftProfileContent from './components/LeftProfileContent/LeftProfileContent'
import TopProfileContent from './components/TopProfileContent/TopProfileContent'
// import Post from "../feed/components/center/Post";
import Post from './components/RightProfileContent/Post'

import { postData } from '../feed/components/center/postData'
import BlockAccount from './components/BlockAccount'
import RestrictAccount from './components/RestrictAccount'
import ReportAccount from './components/ReportAccount'
import ViewTeamMembers from '../feed/components/modals/ViewTeamMembers/ViewTeamMembers'
import NoPostsYet from './components/LeftProfileContent/Components/NoPostsYet'
import PeopleYouMayKnow from '../connections/components/PeopleYouMayKnow'
import { useSelector } from 'react-redux'
import useRequests from 'useRequest/useRequest'
import {
    handleAllUserIdeas,
    handleAllUserProject,
    handleAllUserThoughts,
    handleOtherUserConnections,
    handleOtherUserInfoChange,
} from 'StateUpdateHelper'
import axios from 'axios'
import Spinner from 'components/application/Spinner'
import { useHistory } from 'react-router'
import RequestToJoin from '../feed/components/modals/RequestToJoin.tsx/RequestToJoin'
function OtherProfile() {
    // let leftContent, rightContent;
    // useEffect(()=>{
    //     const leftContent = document.querySelector(".profile--content-left");
    //     const rightContent = document.querySelector(".profile--content-right");

    // },[]);
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ]
    const convertDate = (dateISO: any) => {
        const date = new Date(dateISO)
        return `${date.getDate()} ${months[date.getMonth()]}`
    }
    const [showIdeas, setShowIdeas] = useState(false)
    const [showProjects, setShowProjects] = useState(true)
    const [showThoughts, setShowThoughts] = useState(false)
    const [showRequestJoin, setShowRequestJoin] = useState(false)
    const history = useHistory()

    const getTheUserData = async () => {
        if (localStorage.getItem('other-user')) {
            console.log(localStorage.getItem('other-user'))
            const userId = localStorage.getItem('other-user')
            await axios({
                method: 'get',
                url: `https://cg2nx999xa.execute-api.ap-south-1.amazonaws.com/dev/user?id=${userId}`,
                headers: {
                    Authorization: localStorage.getItem('user'),
                },
            })
                .then((resp: any) => {
                    console.log('other-user-update', resp)
                    handleOtherUserInfoChange(
                        'other-user-update',
                        resp.data.data.user[0]
                    )
                })
                .then(() => {
                    history.push('/app/otherprofile')
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }
    const getTheUserConnections = async () => {
        const userId = localStorage.getItem('other-user')
        await axios({
            method: 'get',
            url: `https://cg2nx999xa.execute-api.ap-south-1.amazonaws.com/dev/connections/?user_id=${userId}`,
            headers: {
                Authorization: localStorage.getItem('user'),
            },
        }).then((resp: any) => {
            console.log(resp)
            handleOtherUserConnections(
                'other-connections-all',
                resp.data.data.connections
            )
            console.log(resp.data.data.connections)
        })
    }
    const getTheUserIdeas = async () => {
        const userId = localStorage.getItem('other-user')

        await axios({
            method: 'get',
            url: `https://cg2nx999xa.execute-api.ap-south-1.amazonaws.com/dev/user/idea?user_id=${userId}`,
            headers: {
                Authorization: localStorage.getItem('user'),
            },
        })
            .then((resp: any) => {
                console.log(resp)
                // resp.data.idea.reverse();
                setIdeas([
                    ...resp.data.data.idea.map((post: any) => ({
                        user_id: post.user.id,
                        id: post.id,
                        title: post.title,
                        description: post.description,
                        role: post.user.role,
                        type: 2,
                        avatar: post.user.avatar,
                        author:
                            post.user.first_name + ' ' + post.user.last_name,
                        tags: post.idea_tags.map((tag: any) => {
                            return tag.hashtag.name
                        }),
                        images: post.idea_documents.map((image: any) => {
                            // console.log(image.url);
                            return image.url
                        }),
                        time: convertDate(post.created_at),
                        created_at: post.created_at,
                        numLikes: 0,
                        numComments: 0,
                    })),
                ])
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const { doRequest: getTheUserThoughts, errors: thoughtErrors } =
        useRequests({
            method: 'get',
            route: `user/thought?user_id=${localStorage.getItem('other-user')}`,
            body: null,
            onSuccess: (data: any) => {
                console.log('This is profile thoughts', data)
                data.data.thoughts.reverse()
                const finalData = data.data.thoughts.map((post: any) => ({
                    user_id: post.user.id,
                    id: post.id,
                    description: post.thought,
                    role: post.user.role,
                    type: 3,
                    avatar: post.user.avatar,
                    author: post.user.first_name + ' ' + post.user.last_name,
                    time: convertDate(post.created_at),
                    numLikes: 0,
                    numComments: 0,
                }))
                setThoughts([...finalData])
            },
        })
    const getTheUserProjects = async () => {
        const userId = localStorage.getItem('other-user')
        await axios({
            method: 'get',
            url: `https://cg2nx999xa.execute-api.ap-south-1.amazonaws.com/dev/user/post?user_id=${userId}`,
            headers: {
                Authorization: localStorage.getItem('user'),
            },
        })
            .then((resp: any) => {
                console.log(resp)
                setPosts([
                    ...resp.data.data.project.map((post: any) => ({
                        user_id: post.user.id,
                        id: post.id,
                        title: post.title,
                        description: post.description,
                        role: post.user.role,
                        type: 1,
                        avatar: post.user.avatar,
                        author:
                            post.user.first_name + ' ' + post.user.last_name,
                        tags: post.project_tags.map((tag: any) => {
                            return tag.hashtag.name
                        }),
                        images: post.project_documents.map((image: any) => {
                            return image.url
                        }),
                        time: convertDate(post.created_at),
                        created_at: post.created_at,
                        numLikes: 0,
                        numComments: 0,
                    })),
                ])
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const [posts, setPosts] = useState<postData[]>([])
    const [ideas, setIdeas] = useState<postData[]>([])
    const [thoughts, setThoughts] = useState<postData[]>([])
    const [showLeft, setShowLeft] = useState(true)
    const [showRight, setShowRight] = useState(true)
    const [showAbout, setShowAbout] = useState(false)

    // const leftContent = document.querySelector(".profile--content-left");
    // const rightContent = document.querySelector(".profile--content-right");
    useEffect(() => {
        console.log('page loaded')
        if (window.innerWidth > 900) {
            setShowLeft(true)
            setShowRight(true)
            setShowAbout(false)
        }
        if (window.innerWidth <= 900) {
            setShowLeft(false)
            setShowRight(true)
            setShowAbout(true)
        }
    }, [])
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
    window.addEventListener('resize', () => {
        if (window.innerWidth > 900) {
            setShowLeft(true)
            setShowRight(true)
            setShowAbout(false)
        }
        if (window.innerWidth <= 900) {
            setShowLeft(false)
            setShowRight(true)
            setShowAbout(true)
        }
    })

    useEffect(() => {
        if (window.innerWidth > 900) {
            setShowLeft(true)
            setShowRight(true)
            setShowAbout(false)
        }
        if (window.innerWidth <= 900) {
            setShowLeft(false)
            setShowRight(true)
            setShowAbout(true)
        }
    }, [])
    const [showOverlay, setShowOverlay] = useState(false)
    const [showBlockUser, setShowBlockUser] = useState(false)
    const [showReportUser, setShowReportUser] = useState(false)
    const [showRestrictUser, setShowRestrictUser] = useState(false)
    const [showTeamMembers, setShowTeamMembers] = useState(false)
    const [showCreateTeam, setShowCreateTeam] = useState(false)

    const [showEditBio, setShowEditBio] = useState(false)
    const [showEditProject, setShowEditProject] = useState(false)
    const openModal = () => {
        setShowOverlay(true)
        window.scrollTo(0, 0)
        document.body.style.overflowY = 'hidden'
    }

    const closeModal = () => {
        setShowOverlay(false)
        setShowBlockUser(false)
        setShowReportUser(false)
        setShowRestrictUser(false)
        setShowTeamMembers(false)
        document.body.style.overflowY = 'scroll'
    }
    const blockAccount = () => {
        openModal()
        setShowBlockUser(true)
    }
    const restrictAccount = () => {
        openModal()
        setShowRestrictUser(true)
    }
    const reportAccount = () => {
        openModal()
        setShowReportUser(true)
    }

    const viewTeamMembers = () => {
        openModal()
        setShowTeamMembers(true)
    }
    const otherUser = useSelector((state: any) => state.otherUser)
    const otherUserConnections = useSelector(
        (state: any) => state.otherUserConnections
    )
    const showOnlyProjects = () => {
        setShowIdeas(false)
        setShowProjects(true)
        setShowThoughts(false)
    }
    const showOnlyIdeas = () => {
        setShowIdeas(true)
        setShowProjects(false)
        setShowThoughts(false)
    }
    const showOnlyThoughts = () => {
        setShowIdeas(false)
        setShowProjects(false)
        setShowThoughts(true)
    }
    const viewRequestJoin = () => {
        openModal()
        setShowRequestJoin(true)
    }
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        setIsLoading(true)
        ;(async () => {
            await getTheUserData()
            await getTheUserConnections()
            await getTheUserIdeas()
            await getTheUserProjects()
            await getTheUserThoughts()
            setIsLoading(false)
        })()
        // setIsLoading(false);
        //The following callback function clears the other user data if the user leaves the page.
        return ()=>{
            handleOtherUserInfoChange("clear-other-user", null);
        }
    }, [])
    return (
        <div>
            {showOverlay && (
                <div className="profile-modal-cover">
                    <div
                        className="modal-overlay-profile"
                        onClick={closeModal}
                    ></div>

                    {showBlockUser && <BlockAccount closeModal={closeModal} />}
                    {showReportUser && (
                        <ReportAccount
                            closeModal={closeModal}
                            showBlockUser={blockAccount}
                        />
                    )}
                    {showRestrictUser && (
                        <RestrictAccount closeModal={closeModal} />
                    )}
                    {showTeamMembers && (
                        <ViewTeamMembers closeModal={closeModal} />
                    )}
                    {showRequestJoin && (
                        <RequestToJoin closeModal={closeModal} />
                    )}
                </div>
            )}

            <div className="profile--content">
                <div className="profile--content-top-container">
                    <TopProfileContent
                        showLeft={showLeft}
                        setShowLeft={setShowLeft}
                        setShowRight={setShowRight}
                        showAbout={showAbout}
                        showReportUser={reportAccount}
                        showBlockUser={blockAccount}
                        showRestrictUser={restrictAccount}
                        userInfo={otherUser}
                        showOnlyProjects={showOnlyProjects}
                        showOnlyIdeas={showOnlyIdeas}
                        showOnlyThoughts={showOnlyThoughts}
                    />
                </div>
                <div className="profile--content-bottom-container">
                    {showLeft && otherUser.avatar === '' ? (
                        <Spinner />
                    ) : (
                        <div className="profile--content-left">
                            <LeftProfileContent
                                userInfo={otherUser}
                                postsCount={
                                    ideas.length +
                                    thoughts.length +
                                    posts.length
                                }
                                connectionsCount={otherUserConnections.length}
                            />
                        </div>
                    )}
                    {showRight && (
                        <div className="profile--content-right">
                            {isLoading && <Spinner />}
                            {showProjects &&
                                posts.length !== 0 &&
                                posts.map((post, idx) => {
                                    return (
                                        <Post
                                            key={idx}
                                            post={post}
                                            openTeamMember={viewTeamMembers}
                                            openRequestJoin={viewRequestJoin}
                                        />
                                    )
                                })}
                            {showProjects && posts.length === 0 && (
                                <div className="profile--content-right">
                                    <NoPostsYet
                                        postType="projects"
                                        name={otherUser.first_name}
                                    />
                                    <PeopleYouMayKnow />
                                </div>
                            )}
                            {showIdeas &&
                                ideas.length !== 0 &&
                                ideas.map((post, idx) => {
                                    return (
                                        <Post
                                            key={idx}
                                            post={post}
                                            openTeamMember={viewTeamMembers}
                                            openRequestJoin={viewRequestJoin}
                                        />
                                    )
                                })}
                            {showIdeas && ideas.length === 0 && (
                                <div className="profile--content-right">
                                    <NoPostsYet
                                        postType="ideas"
                                        name={otherUser.first_name}
                                    />
                                    <PeopleYouMayKnow />
                                </div>
                            )}
                            {showThoughts &&
                                thoughts.length !== 0 &&
                                thoughts.map((post, idx) => {
                                    return (
                                        <Post
                                            key={idx}
                                            post={post}
                                            openTeamMember={viewTeamMembers}
                                            openRequestJoin={viewRequestJoin}
                                        />
                                    )
                                })}
                            {showThoughts && thoughts.length === 0 && (
                                <div className="profile--content-right">
                                    <NoPostsYet
                                        postType="thoughts"
                                        name={otherUser.first_name}
                                    />
                                    <PeopleYouMayKnow />
                                </div>
                            )}
                        </div>
                    )}

                    {/* {
                        posts.length===0 && ideas.length===0 && !isLoading &&
                        <div className="profile--content-right">
                            <NoPostsYet/>
                            <PeopleYouMayKnow/>
                        </div>

                    } */}
                </div>
            </div>
        </div>
    )
}

export default OtherProfile
