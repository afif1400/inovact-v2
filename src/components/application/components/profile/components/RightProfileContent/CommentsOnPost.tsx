import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { handleAllIdeas, handleAllPosts, handleAllThoughts } from 'StateUpdateHelper';
import CommentMainContent from './CommentMainContent';
import CommentReplyTag from './CommentReplyTag';
function CommentsOnPost(props: any) {
    console.log("post comments", props);
    const commentInput: any = useRef();
    const userInfo = useSelector((state: any)=> state.userInfo);
    const allPosts = useSelector((state: any)=> state.allPosts);
    const allIdeas = useSelector((state: any)=> state.allIdeas);
    const allThoughts = useSelector((state: any)=> state.allThoughts);
    const [allPostComments, setAllPostComments] = useState<any>([]);
    
    const addCommentToPost = async()=>{
        const type = props.postData.type===1?"post":props.postData.type===2?"idea":"thought";
        const commentBody = {
            text: commentInput.current.value,
            article_id: props.postData.id,
            article_type: type,
        }
        const commentData = {
            id: null,
            text: commentInput.current.value,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            user: {
                id: userInfo.id,
                avatar: userInfo.avatar,
                first_name: userInfo.first_name,
                last_name: userInfo.last_name,
                role: userInfo.role,
            },
        }
        addCommentToState(commentData,type);
        console.log(commentBody);
        commentInput.current.value="";
        await axios({
            method: "POST",
            url: "https://cg2nx999xa.execute-api.ap-south-1.amazonaws.com/dev/comment",
            data: commentBody,
            headers: {
                Authorization: localStorage.getItem("user"),
            }
        }).then((data: any)=>{
            console.log(data);
        }).catch((err)=>{
            console.log(err);
        });
    }
    useEffect(()=>{
        console.log(props.commentsData);
        setAllPostComments(props.commentsData);
    },[props.commentsData]);

    const addCommentToState = (commentData: any, type: any)=>{
        // setAllPostComments((prevComments: any)=>[...prevComments, commentData]);
        if(type==="post"){
            const allPostsData = allPosts.map((post: any)=>{
                if(post.id===props.postData.id){
                    post.project_comments.push(commentData);
                    return post;
                }
                return post;
            })
            handleAllPosts("all-posts", allPostsData);
        }else if(type==="idea"){
            const allIdeasData = allIdeas.map((post: any)=>{
                if(post.id===props.postData.id){
                    post.idea_comments.push(commentData);
                    return post;
                }
                return post;
            })
            handleAllIdeas("all-ideas",allIdeasData);
        }else{
            const allThoughtsData = allThoughts.map((post: any)=>{
                if(post.id===props.postData.id){
                    post.thought_comments.push(commentData);
                    return post;
                }
                return post;
            })
            handleAllThoughts("all-thoughts", allThoughtsData);
        }
    }
    return (
        <div className="comments-on-posts">
            <div className="comments-on-posts-back" onClick={props.backToPost}><span>{"<< Back to post"}</span></div>
            <div >
                <p className="comments-on-posts-heading">Comments</p>
                <div className="comments-on-posts-comments-container">
                    {
                        allPostComments?.length!==0 ?
                        allPostComments?.map((comment: any)=>{
                            return <CommentMainContent comment={comment}/>
                        }):
                        <p>This post has no comments yet.</p>
                    }
                </div>
                <div className="comments-on-posts-addcomment">
                    <textarea placeholder="Add a comment..." ref={commentInput}/>
                    <button onClick={addCommentToPost}>Post</button>
                </div>
            </div>
        </div>
    )
}

export default CommentsOnPost;
