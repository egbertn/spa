import React, { useState } from 'react'

const CommentForm = () => {

    const [random, setRandom] = useState(0);
    const [comment, setComment] = useState({
        id: null,
        postId: null,
        username: '',
        message: ''
    });
    const [commentPosted, setCommentPosted] = useState(false);
    const randomize = () => setRandom(Math.random());

    const inputChangeHandler = (e) => {
        setComment(u => u[e.target.name] = e.target.value);
        randomize();
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()

        // console.log(prevComments, 'Comment form')
        fetch("/api/comments.json", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(comment)
        })
            .then(res => {
                // console.log("Successfull")
                setCommentPosted(true);
            })
            .catch(err => {
                console.log(err.message)
            })
    }



    return (
        <>
            {commentPosted && "Your comment has been successfully posted. Reload to see your comment."}
            {!commentPosted &&
                <div className="comment-form">
                    <h4 className="comment-title">Leave a comment</h4>
                    <form onSubmit={onSubmitHandler}>
                        <input name="username" type="text" placeholder="Your name" onChange={inputChangeHandler} required />
                        <textarea name="message" placeholder="Write Comments" onChange={inputChangeHandler} required></textarea>
                        <button type="submit" className="btn btn-filled btn-round">Submit</button>
                    </form>
                </div>
            }
            </>
    )
}


export default CommentForm