import React, { useState } from 'react'
import CommentMainContent from './CommentMainContent';
import CommentReplyTag from './CommentReplyTag';
function CommentsOnPost(props: any) {

    return (
        <div className="comments-on-posts">
            <div className="comments-on-posts-back" onClick={props.backToPost}><span>{"<< Back to post"}</span></div>
            <div >
                <p className="comments-on-posts-heading">Comments</p>
                <CommentMainContent/>
                <CommentMainContent/>
                <div className="comments-on-posts-addcomment">
                    <textarea placeholder="Add a comment..."/>
                    <button>Post</button>
                </div>
            </div>
        </div>
    )
}

export default CommentsOnPost;
