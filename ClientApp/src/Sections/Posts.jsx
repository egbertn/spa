import React, {useState, useEffect } from 'react'
import Post from '../Components/Post'
import axios from '../axios-orders'

const Posts = (props) => {

    const [posts, setPosts] = useState([]);
    useEffect(()=> {
        axios.get('posts.json')
            .then( res => {
                // console.log(res)
                setPosts({ posts: res.data.slice(0, 3) })
            })
            .catch( err => {
                console.log(err)
            })
    }, [])

    // selectedPostId = (id) => {
    //     console.log(id)
    // }

        // console.log(this.props)

       

        return (
            // Posts section start
            <div className="row">
                
                {posts && posts.map(post => <Post
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    excerpt={post.excerpt}
                    body={post.body}
                    url={`/blog/${post.id}`}
                />)
                }
            </div>
            // Posts section end
        )
    }


export default Posts