import React from 'react'
import LikedUser from './LikedUser'

function LikedBy(props: any) {
    const data = [
        {
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?    ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
            name: "Jane Doe",
            role: "student"
        },
        {
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?    ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
            name: "Jane Doe",
            role: "mentor"
        },
        {
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?    ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
            name: "Jane Doe",
            role: "student"
        },
    ]
    return (
        <div>
            {
                window.innerWidth > 786 &&
                <h3>Liked By</h3>
            }
            <div>
                {
                    props.postData?.likes?.length!==0 ? 
                    props.postData?.likes?.map((ele: any)=>{
                        return <LikedUser user = {ele}/>
                    }):
                    <p>This post has no likes yet.</p>
                }
            </div>
        </div>
        
    )
}

export default LikedBy;
