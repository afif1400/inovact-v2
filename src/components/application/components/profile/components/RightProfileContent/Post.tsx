import React, { useEffect, useState } from 'react'
import like from 'images/feed/post/like.svg'
import comment from 'images/feed/post/comment.svg'
import share from 'images/feed/post/share.svg'
import project_badge from 'images/feed/post/project_badge.svg'
import idea_badge from 'images/feed/post/idea_badge.svg'
import thoughts_badge from 'images/feed/post/thoughts_badge.svg'
import { Link, useHistory } from 'react-router-dom'
import Photos from './Photos'
import TeamTag from '../LeftProfileContent/Components/TeamTag';
import UserTag from './UserTag';
import CommentsOnPost from './CommentsOnPost'
import { useSelector } from 'react-redux'
import axios from 'axios'

function Post({ post, openTeamMember, viewEditProject, editProject }: any) {
   
    const [showShareOption, setShowShareOption] = useState(false);
    
    const teamsData = [
        {
          img:
            "https://media.tarkett-image.com/large/TH_24567080_24594080_24596080_24601080_24563080_24565080_24588080_001.jpg",
          name: "Team Name",
          membersCount: 122
        },
        {
          img:
            "https://media.tarkett-image.com/large/TH_24567080_24594080_24596080_24601080_24563080_24565080_24588080_001.jpg",
          name: "Team Name",
          membersCount: 122
        },
        {
          img:
            "https://media.tarkett-image.com/large/TH_24567080_24594080_24596080_24601080_24563080_24565080_24588080_001.jpg",
          name: "Team Name",
          membersCount: 122
        }
      ];
      const userTeams = useSelector((state: any)=>state.teams.teams);
    const peopleYouMayKnow = useSelector((state: any)=>state.peopleYouMayKnow);
      const usersData = [
        {
            img:
              "https://media.tarkett-image.com/large/TH_24567080_24594080_24596080_24601080_24563080_24565080_24588080_001.jpg",
            name: "Jane Doe",
          },
          {
            img:
              "https://media.tarkett-image.com/large/TH_24567080_24594080_24596080_24601080_24563080_24565080_24588080_001.jpg",
            name: "Jane Doe",
          },
          {
            img:
              "https://media.tarkett-image.com/large/TH_24567080_24594080_24596080_24601080_24563080_24565080_24588080_001.jpg",
            name: "Jane Doe",
          }
      ]
    const [showTeams, setShowTeams] = useState(true);
    const [showComments, setShowComments] = useState(false);
    const [showPostOptions, setShowPostOptions] = useState(false);
    

    
    const sharePost =()=>{
        setShowShareOption(!showShareOption);
    }
    const toggleShowTeams = ()=>{
        setShowTeams(true);
    }
    const toggleShowUsers =()=>{
        setShowTeams(false);
    }
    const closeShareOptionSlow =()=>{
        setTimeout(()=>{
            setShowShareOption(false);
        },1000);
    }
    const toggleShowComments = ()=>{
        setShowComments(!showComments);
    }
    const backToPost = ()=>{
        setShowComments(false);
    }
    const viewPostOptions = ()=>{
        setShowPostOptions(!showPostOptions);
    }
    const removePostOptionsSLow = ()=>{
        setTimeout(()=>{
            setShowPostOptions(false);
        },1000);
    }
    const history = useHistory();
    const user_id = useSelector((state: any)=> state.userInfo.id);
    const numOfLikes = useState(post.numLikes);
    const [likes, setLikes] = useState(post.numLikes);
    const [likedPost, setLikedPost] = useState(false);
    const likedImg = "https://svg-clipart.com/svg/heart/RgoENWE-white-heart-vector.svg"; 
    const likeThePost = async(postId: any)=>{
        setLikedPost(true);
        setLikes(likes+1);
        const route = `${post.type===1?"post":post.type===2?"idea":"thought"}`;
        await axios({
            method: "POST",
            url: `https://cg2nx999xa.execute-api.ap-south-1.amazonaws.com/dev/${route}/like?${route==="post"?"project":route}_id=${postId}`,
            headers: {
                Authorization: localStorage.getItem('user'),
                'Content-Type': 'application/json',
            },
        }).then(()=>{
            console.log("The like was a success");
        }).catch((err)=>{
            console.log(err);
        })
    }
    useEffect(()=>{
        // console.log(post.likes);
        // console.log(post.likes.some((like: any)=>like.id!==user_id));
        console.log(post.likes);
        if (post.likes?.some((like: any) => like.user?.id === user_id)) {
            setLikedPost(true)
        }
    },[post.likes])
    return (
        <div className="post">
            <div>
                {
                    !showComments &&
                    <div>
                        <div className="post__author">
                            <Link to="/app/profile">
                                <img
                                    className="post__author__avatar"
                                    src={post.avatar}
                                    alt=""
                                />
                            </Link>
                            <div className="post__author__text">
                            <h1 className="post__author__text__name">{post.author}</h1>
                                <div className="post__author__text__bottom">
                                    <p className="post__author__text__time text-color--green text-size--small">
                                        {post.role &&
                                        post.role[0].toUpperCase()+post.role.slice(1)}
                                    </p>
                                </div>
                                
                            </div>
                            <div className="connect-button-container">
                            <Link to={post.type===1?`/posts/${post.id}`: `/ideas/${post.id}`}>
                                <button className="view-more-button connect-button">View More <b>{">>"}</b>
                                </button>
                            </Link>
                            </div>
                        </div>
                <div className="post__text">
                
                        {post.title ? (
                        <div style={{display:'flex',flexDirection:'row'}}>
                            <h1 className="post__text__title">{post.title} {}</h1>
                            {post.type===1?<img src={project_badge} alt="" width="25"/>:post.type===2?<img src={idea_badge} alt="" />:<img src={thoughts_badge} alt="" />}   
                        </div> 
                    ) : null}
                    <p className="post__text__desc">
                        {post.type === 1
                            ? post.description.substring(0, 150)
                            : post.description}{' '}
                        {/* {post.type === 1 ? (
                            <Link to={`/posts/${post.id}`}>Read more</Link>
                        ) : null} */}
                    </p>
                </div>
                {post.tags ? (
                    <div className="post__tags">
                        {post.tags?.map((tag: string, idx: number) => {
                            return post.type === 1 ? (
                                idx < 4 ? (
                                    <p key={idx} className="post__tags__item">
                                        {tag}
                                    </p>
                                ) : null
                            ) : (
                                <p key={idx} className="post__tags__item">
                                    {tag}
                                </p>
                            )
                        })}
                        { (post.tags?.length>4) && 
                        post.type === 1 ? (
                            <Link
                                className="post__tags__item"
                                to={post.type===1?`/posts/${post.id}`:`/ideas/${post.id}`}
                            >
                                + {post.tags?.length - 4} more
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
                }
                
            </div>
            <div>
                {
                    showComments && 
                    <CommentsOnPost backToPost={backToPost} postData={post} commentsData={post.comments}/>
                }
            </div>
            <div className="post__footer">
                    <div className="post__footer__likes">
                    <img
                        src={likedPost?likedImg:like}
                        alt=""
                        onClick={() => {
                            if(!likedPost){
                                likeThePost(post.id);
                            }
                        }}
                    />
                        <p className="post__footer__likes__num">{likes}</p>
                    </div>
                    <div className="post__footer__comments">
                        <img src={comment} alt="" onClick={toggleShowComments}/>
                        <p className="post__footer__comments__num">
                            {post.numComments}
                        </p>
                    </div>
                    <div className="post__footer__share">
                        {
                            showShareOption &&
                            <div className="post__footer__share_to" onMouseLeave={closeShareOptionSlow}>
                                <p className="post__footer__share_to-heading">Share post to...</p>
                                <div className="post__footer__share_to-separator">
                                    <span style={{borderBottom: showTeams? "5px solid #02bd63": "none", color:showTeams? "#02bd63": "black" }} onClick={toggleShowTeams}>Teams</span>
                                    <span style={{borderBottom: !showTeams? "5px solid #02bd63": "none", color:!showTeams? "#02bd63": "black" }}
                                    onClick={toggleShowUsers}>Users</span>
                                </div>
                                <div className="post__footer__share_to-teams-and-users">
                                {showTeams &&
                                    userTeams.map((team: any) => {
                                        return (
                                            <TeamTag
                                                img={team.avatar}
                                                teamName={team.name}
                                                membersCount={team.team_members.length}
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
                                <button className="post__footer__share_to-sharebtn">Send</button>
                            </div>
                        }
                        <div style={{backgroundColor:showShareOption?"#385790":"#4b72bc" }} className="post__footer__share-img-container" onClick={sharePost}>
                            <img src={share} alt="" className="post__footer__share-img" />
                        </div>
                    </div>
                    {post.type === 1 || post.type===2? (
                        <>
                            <p className="post__footer__team__text" onClick={openTeamMember}> View Team Members</p>
                            <div className="post__footer__team__options-menu">
                                {
                                    showPostOptions &&
                                    <div className="post__footer__team__options-all" onMouseLeave={removePostOptionsSLow}>
                                        <span onClick={()=>{
                                            viewEditProject();
                                            editProject(post.id);
                                            }}>Edit Post</span>
                                        <span onClick={()=>{
                                            history.push(`/posts/${post.id}`);
                                        }}>Post Statistics</span>
                                        <span>Delete Post</span>
                                    </div>
                                }
                                <p className="post__footer__team__options" onClick={viewPostOptions}>&#8942;</p>
                            </div>
                        </>
                    ) : (
                        <div className="post__footer__team__empty"></div>
                    )}
                </div>
        </div>
    )
}

export default Post;

/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
 molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
 numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
 optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
 obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
 nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
 tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
 quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos 
 sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam
 recusandae alias error harum maxime adipisci amet laborum. Perspiciatis 
 minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit 
 quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur 
 fugiat, temporibus enim commodi iusto libero magni deleniti quod quam 
 consequuntur! Commodi minima excepturi repudiandae velit hic maxime
 doloremque. Quaerat provident commodi consectetur veniam similique ad 
 earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo 
 fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore 
 suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium
 modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam 
 totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam 
 quasi aliquam eligendi, placeat qui corporis! */
