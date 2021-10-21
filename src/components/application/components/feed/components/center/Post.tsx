import React,{useState} from 'react'
import like from 'images/feed/post/like.svg'
import comment from 'images/feed/post/comment.svg'
import share from 'images/feed/post/share.svg'
import { Link } from 'react-router-dom'
import Photos from './Photos'
import TeamTag from 'components/application/components/profile/components/LeftProfileContent/Components/TeamTag';
import UserTag from 'components/application/components/profile/components/RightProfileContent/UserTag';
import CommentsOnPost from 'components/application/components/profile/components/RightProfileContent/CommentsOnPost'
import { useSelector } from 'react-redux';
import playButton from "../../../../../../images/feed/play-button.svg";

function Post({ post, openTeamMember, openRequestJoin }: any) {
    const [showTeams, setShowTeams] = useState(true);
    const [showShareOption, setShowShareOption] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const backToPost = ()=>{
        setShowComments(false);
    }
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
    const sharePost =()=>{
        setShowShareOption(!showShareOption);
    }
    const toggleShowComments = ()=>{
        setShowComments(!showComments);
    }
    const user_id = useSelector((state: any)=> state.userInfo.id);
    return (
        <div className="post">
            {
                !showComments && 
                <div>
                    <div className="post__author">
                        {
                            user_id===post.user_id?
                            <Link to="/app/profile">
                                <img
                                    className="post__author__avatar"
                                    src={post.avatar}
                                    alt=""
                                />
                            </Link>:
                            <Link to="/app/otherprofile" onClick={()=>localStorage.setItem("other-user",post.user_id)}>
                                <img
                                    className="post__author__avatar"
                                    src={post.avatar}
                                    alt=""
                                />
                            </Link>
                        }
                    <div className="post__author__text">
                        <h1 className="post__author__text__name">{post.author}</h1>
                        <div className="post__author__text__bottom">
                            <p className="post__author__text__time text-color--green text-size--small">
                                {post.role[0].toUpperCase()+post.role.slice(1)}
                            </p>
                            <p className="post__author__text__type text-color--green text-size--small">{post.type===1?"Project":post.type===2?"Idea":"Thought"}</p>
                        </div>
                        {/* <p className="post__author__text__time  text-style--italic text-size--small ">
                            {post.time}
                        </p> */}
                        
                    </div>
                    <div className="connect-button-container">
                        <button className="connect-button">Connect</button>
                        <Link to={post.type===1?`/posts/${post.id}`: `/ideas/${post.id}`}>
                            <button className="view-more-button">View More <b>{">>"}</b>
                            </button>
                        </Link>
                    </div>

                </div>
                <div className="post__text">
                    {post.title ? (
                        <h1 className="post__text__title">{post.title}</h1>
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
                                {
                                    post.tags?.length>4 &&
                                    `+ ${post.tags?.length - 4} more`
                                }
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
            <div>
                {
                    showComments && 
                    <CommentsOnPost backToPost={backToPost}/>
                }
            </div>
            <div className="post__footer">
                <div className="post__footer__likes">
                    <img src={like} alt="" />
                    <p className="post__footer__likes__num">{post.numLikes}</p>
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
                                {
                                    showTeams &&
                                    teamsData.map((team: any) =>    {
                                        return (
                                            <TeamTag
                                            img={team.img}
                                            teamName={team.name}
                                            membersCount={team.membersCount}
                                            />
                                        );
                                    })
                                }
                                {
                                    !showTeams &&
                                    usersData.map((user:any)=>{
                                        return (
                                            <UserTag
                                                img={user.img}
                                                name={user.name}
                                            />
                                        );
                                    })
                                    
                                }
                                </div>
                                <button className="post__footer__share_to-sharebtn">Send</button>
                            </div>
                        }
                        <div style={{backgroundColor:showShareOption?"#385790":"#4b72bc" }} className="post__footer__share-img-container" onClick={sharePost}>
                            <img src={share} alt="" className="post__footer__share-img"/>
                        </div>
                </div>
                {post.type === 1 ? (
                    <>
                        <p className="post__footer__team__text" onClick={openTeamMember}>Team Members</p>
                        <p className="post__footer__team__request" onClick={openRequestJoin}>Join Team</p>
                    </>
                ) : (
                    <div className="post__footer__team__empty"></div>
                )}
            </div>
        </div>
    )
}

export default Post

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
