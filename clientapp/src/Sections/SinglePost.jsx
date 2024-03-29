import React, {  Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import Page from '../Layouts/Pages/Page'
import Comments from './Comments'

const SinglePost = (props) => {

    const [post, setPost] = useState();
    useEffect(() => {
        const postId = props.match.params.id
        if (postId) {
            fetch(`/api/post/${postId}.json`, {
                method: "GET",
                headers: { 'accept': 'application/json' }
            })
                .then(response => response.json())
                .then(res => {
                    setPost(res)
                    console.log(res)
                })
        }
    }, [props.match.params.id])


    return (<Page>
        {post === undefined && "Loading..."}

        {post && <Fragment>
            <article className="entry-content">
                <img src={require("../assets/images/post/1.jpg")} alt="" />
                <div className="meta-tags">
                    <Link to="#" className="post-meta"><i className="ti-time"></i>{post.meta.created}</Link  >
                    <Link to="#" className="post-meta"><i className="ti-package"></i>{post.meta.categories.join(', ')}</Link >
                    <Link to="#" className="post-meta"><i className="ti-tag"></i>{post.meta.tags.join(', ')}</Link   >
                </div>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
            </article>
            <Comments postId={post.id} />
        </Fragment>
        }
      </Page>
    )
}

export default SinglePost;