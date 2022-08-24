import React, { useState,useEffect, Fragment } from 'react'
import Comment from '../Components/Comment'
import api from '../axios-orders'
import CommentForm from './CommentForm'

const Comments = (props) => {

    const [comments, setComments] = useState([]);
    useEffect(() => {
        api.get(`comments${props.postId}.json`)
            .then(res => {
                setComments(res.data);
            })
            .catch(err => {
                console.log(err.message)
            })
    }, []);

    return (
        <Fragment>
            <div className="comments">
                <h4 className="comment-title">comments</h4>
                <ul>
                    {comments.length === 0 && "Loading..."}
                    {comments?.map(cmnt =>
                        <li key={cmnt.id}>
                            <Comment
                                id={cmnt.id}
                                username={cmnt.username}
                                message={cmnt.message}
                            />
                        </li>)}
                </ul>
            </div>
            <CommentForm postId={props.postId} />
        </Fragment>
    )
}


export default Comments