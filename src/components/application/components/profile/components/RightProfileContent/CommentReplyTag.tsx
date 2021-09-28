import React from 'react'

function CommentReplyTag(props: any) {
    return (
        <div className="reply-tag">
            <div className="reply-tag-img-container">
                <img src={props.img}/>
            </div>
            <div className="reply-tag-content">
                <div className="reply-tag-name-container">
                    <div className="reply-tag-img-mini">
                        <img src={props.img} />
                    </div>
                    <div className="reply-tag-name-time">
                        <span className="reply-tag-name">{props.name}</span>
                        <span className="reply-tag-time">{props.time}</span>
                    </div>
                </div>
                <div>
                    <span className="reply-tag-user-tagged">@{props.tag}</span>
                    <span className="reply-tag-user-comment">{props.comment}</span>
                </div>
            </div>
        </div>
    )
}

export default CommentReplyTag;
