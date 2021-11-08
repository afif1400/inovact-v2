import React, { useEffect, useState } from 'react'
import like from 'images/feed/post/like.svg'
import comment from 'images/feed/post/comment.svg'
import share from 'images/feed/post/share.svg'
import { Link } from 'react-router-dom'
import Photos from './Photos'
import TeamTag from 'components/application/components/profile/components/LeftProfileContent/Components/TeamTag'
import UserTag from 'components/application/components/profile/components/RightProfileContent/UserTag'
import CommentsOnPost from 'components/application/components/profile/components/RightProfileContent/CommentsOnPost'
import { useSelector } from 'react-redux'
import playButton from '../../../../../../images/feed/play-button.svg'
import { makeApiCall } from 'components/application/components/connections/components/connectionsUtils'
import axios from 'axios'

function Post({ post, openTeamMember, openRequestJoin }: any) {
    const [showTeams, setShowTeams] = useState(true)
    const [showShareOption, setShowShareOption] = useState(false)
    const [showComments, setShowComments] = useState(false)
    const [likes, setLikes] = useState(post.numLikes)
    const [reqToJoinId, setReqToJoinId] = useState<number>()
    const likedImg =
        'https://svg-clipart.com/svg/heart/RgoENWE-white-heart-vector.svg'
    const backToPost = () => {
        setShowComments(false)
    }
    const [isRequestedUser, setIsRequestedUser] = useState<number>()

    const userTeams = useSelector((state: any) => state.teams.teams)
    const peopleYouMayKnow = useSelector((state: any) => state.peopleYouMayKnow)

    const toggleShowTeams = () => {
        setShowTeams(true)
    }
    const toggleShowUsers = () => {
        setShowTeams(false)
    }
    const closeShareOptionSlow = () => {
        setTimeout(() => {
            setShowShareOption(false)
        }, 1000)
    }
    const sharePost = () => {
        setShowShareOption(!showShareOption)
    }
    const toggleShowComments = () => {
        setShowComments(!showComments)
    }
    const handleConnect = async (user_id: number) => {
        const res = await makeApiCall(
            'post',
            `connections/request?user_id=${user_id}`
        )
    }
    const [likedPost, setLikedPost] = useState(false)
    const likeThePost = async (postId: any) => {
        setLikedPost(true)
        setLikes(likes + 1)
        const route = `${
            post.type === 1 ? 'post' : post.type === 2 ? 'idea' : 'thought'
        }`
        await axios({
            method: 'POST',
            url: `https://cg2nx999xa.execute-api.ap-south-1.amazonaws.com/dev/${route}/like?${
                route === 'post' ? 'project' : route
            }_id=${postId}`,
            headers: {
                Authorization: localStorage.getItem('user'),
                'Content-Type': 'application/json',
            },
        })
            .then(() => {
                console.log('The like was a success')
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const user_id = useSelector((state: any) => state.userInfo.id)
    const numOfLikes = useState(post.numLikes)
    useEffect(() => {
        // console.log(post.likes);
        // console.log(post.likes.some((like: any)=>like.id!==user_id));
        console.log(post.likes)
        if (post.likes.some((like: any) => like.user.id === user_id)) {
            setLikedPost(true)
        }
    }, [])
    return (
        <div className="post">
            {!showComments && (
                <div>
                    <div className="post__author">
                        {user_id === post.user_id ? (
                            <Link to="/app/profile">
                                <img
                                    className="post__author__avatar"
                                    src={post.avatar}
                                    alt=""
                                />
                            </Link>
                        ) : (
                            <Link
                                to="/app/otherprofile"
                                onClick={() => {
                                    console.log(
                                        'to="/app/otherprofile"',
                                        post.user_id
                                    )
                                    localStorage.setItem(
                                        'other-user',
                                        post.user_id
                                    )
                                }}
                            >
                                <img
                                    className="post__author__avatar"
                                    src={post.avatar}
                                    alt=""
                                />
                            </Link>
                        )}
                        <div className="post__author__text">
                            <div className="post__author__text__name-container">
                                <h1 className="post__author__text__name">
                                    {post.author}
                                </h1>
                                {user_id !== post.user_id && (
                                    <button
                                        className="connect-button"
                                        onClick={() => {
                                            handleConnect(post.user_id)
                                            setIsRequestedUser(post.user_id)
                                        }}
                                    >
                                        {isRequestedUser
                                            ? 'Requested'
                                            : 'Connect'}
                                    </button>
                                )}
                            </div>
                            <div className="post__author__text__bottom">
                                <p className="post__author__text__time text-color--green text-size--small">
                                    {post.role &&
                                        post.role[0].toUpperCase() +
                                            post?.role.slice(1)}
                                </p>
                                {/* <p className="post__author__text__type text-color--green text-size--small">{post.type===1?"Project":post.type===2?"Idea":"Thought"}</p> */}
                            </div>
                            {/* <p className="post__author__text__time  text-style--italic text-size--small ">
                            {post.time}
                        </p> */}
                        </div>
                        <div className="connect-button-container">
                            {(post.type === 1 || post.type === 2) && (
                                <Link
                                    to={
                                        post.type === 1
                                            ? `/posts/${post.id}`
                                            : `/ideas/${post.id}`
                                    }
                                >
                                    <button className="view-more-button  connect-button">
                                        {post.type !== 3 && (
                                            <p>
                                                View More <b>{'>>'}</b>
                                            </p>
                                        )}
                                    </button>
                                </Link>
                            )}
                        </div>
                    </div>
                    <div className="post__text">
                        <p className="post__author__text__type text-color--green text-size--small">
                            {post.type === 1
                                ? 'Project'
                                : post.type === 2
                                ? 'Idea'
                                : 'Thought'}
                        </p>
                        {post.title ? (
                            <div>
                                <h1 className="post__text__title">
                                    {post.title} {}
                                </h1>
                            </div>
                        ) : null}
                        <p className="post__text__desc">
                            {post.type === 1
                                ? post.description.substring(0, 150)
                                : post.description}{' '}
                            {/* {post.type === 1 ? (
                            <Link to={{
                                pathname: `/posts/${post.id}`,
                                state: {
                                    post_id: post.id,
                                }
                            }}>Read more</Link>
                            ) : null} */}
                        </p>
                    </div>
                    {post.tags ? (
                        <div className="post__tags">
                            {post.tags?.map((tag: string, idx: number) => {
                                return post.type === 1 ? (
                                    idx < 4 ? (
                                        <p
                                            key={idx}
                                            className="post__tags__item"
                                        >
                                            {tag}
                                        </p>
                                    ) : null
                                ) : (
                                    <p key={idx} className="post__tags__item">
                                        {tag}
                                    </p>
                                )
                            })}
                            {post.tags?.length > 4 && post.type === 1 ? (
                                <Link
                                    className="post__tags__item"
                                    to={
                                        post.type === 1
                                            ? `/posts/${post.id}`
                                            : `/ideas/${post.id}`
                                    }
                                >
                                    {post.tags?.length > 4 &&
                                        `+ ${post.tags?.length - 4} more`}
                                </Link>
                            ) : null}
                        </div>
                    ) : null}
                    {post.images ? (
                        <div className="post__images">
                            <Photos images={post.images} />
                        </div>
                    ) : null}
                </div>
            )}
            <div>
                {showComments && (
                    <CommentsOnPost
                        backToPost={backToPost}
                        commentsData={post.comments}
                        postData={post}
                    />
                )}
            </div>
            <div className="post__footer">
                <div className="post__footer__likes">
                    <img
                        src={likedPost ? likedImg : like}
                        alt=""
                        onClick={() => {
                            if (!likedPost) {
                                likeThePost(post.id)
                            }
                        }}
                    />
                    <p className="post__footer__likes__num">{likes}</p>
                </div>
                <div className="post__footer__comments">
                    <img src={comment} alt="" onClick={toggleShowComments} />
                    <p className="post__footer__comments__num">
                        {post.numComments}
                    </p>
                </div>
                <div className="post__footer__share">
                    {showShareOption && (
                        <div
                            className="post__footer__share_to"
                            onMouseLeave={closeShareOptionSlow}
                        >
                            <p className="post__footer__share_to-heading">
                                Share post to...
                            </p>
                            <div className="post__footer__share_to-separator">
                                <span
                                    style={{
                                        borderBottom: showTeams
                                            ? '5px solid #02bd63'
                                            : 'none',
                                        color: showTeams ? '#02bd63' : 'black',
                                    }}
                                    onClick={toggleShowTeams}
                                >
                                    Teams
                                </span>
                                <span
                                    style={{
                                        borderBottom: !showTeams
                                            ? '5px solid #02bd63'
                                            : 'none',
                                        color: !showTeams ? '#02bd63' : 'black',
                                    }}
                                    onClick={toggleShowUsers}
                                >
                                    Users
                                </span>
                            </div>
                            <div className="post__footer__share_to-teams-and-users">
                                {showTeams &&
                                    userTeams.map((team: any) => {
                                        return (
                                            <TeamTag
                                                img={team.avatar}
                                                teamName={team.name}
                                                membersCount={
                                                    team.team_members.length
                                                }
                                            />
                                        )
                                    })}
                                {!showTeams &&
                                    peopleYouMayKnow.map((user: any) => {
                                        return (
                                            <UserTag
                                                img={user.image}
                                                name={user.name}
                                            />
                                        )
                                    })}
                            </div>
                            <button className="post__footer__share_to-sharebtn">
                                Send
                            </button>
                        </div>
                    )}
                    <div
                        style={{
                            backgroundColor: showShareOption
                                ? '#385790'
                                : '#4b72bc',
                        }}
                        className="post__footer__share-img-container"
                        onClick={sharePost}
                    >
                        <img
                            src={share}
                            alt=""
                            className="post__footer__share-img"
                        />
                    </div>
                </div>
                {post.type === 1 || post.type === 2 ? (
                    <>
                        <p
                            className="post__footer__team__text"
                            onClick={openTeamMember}
                        >
                            Team Members
                        </p>
                        {post.team && post.team.looking_for_members && (
                            <p
                                className="post__footer__team__request"
                                onClick={(e: any) => {
                                    openRequestJoin()
                                    setReqToJoinId(post.team_id)
                                }}
                            >
                                Join Team
                            </p>
                        )}
                    </>
                ) : (
                    <div className="post__footer__team__empty"></div>
                )}
            </div>
        </div>
    )
}

export default Post
