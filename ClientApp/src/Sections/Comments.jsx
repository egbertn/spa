import React, { Component, Fragment } from 'react'
import Comment from '../Components/Comment'
import api from '../axios-orders'
import CommentForm from './CommentForm'

class Comments extends Component {

    constructor(props) {
        super(props);
        this.state = {comments:null};
    }

    componentDidMount() {
        api.get(`comments${this.props.postId}.json`  )
            .then( res => {
                this.setState({ comments: res.data })
            })
            .catch( err => {
                console.log(err.message)
            })
    }

    render() {

        let comments = 'Loading...'
        if( this.state.comments !== null ) {

            comments = this.state.comments.map( cmnt =>
                        <li key={cmnt.id}>
                            <Comment
                                id={cmnt.id}
                                username={cmnt.username}
                                message={cmnt.message}
                            />
                        </li>)
        }



        return (
            <Fragment>
                <div className="comments">
                    <h4 className="comment-title">comments</h4>
                    <ul>
                        { comments }
                    </ul>
                </div>
                <CommentForm postId={this.props.postId} />
            </Fragment>
        )
    }
}

export default Comments