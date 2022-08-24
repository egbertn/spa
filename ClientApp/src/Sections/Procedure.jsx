import React, { Component } from 'react'
import axios from '../axios-orders'
import Post from '../Components/Post'

class Procedure extends Component {

    constructor(props) {
        super(props);
        this.state = {procedures:null};
    }
    componentDidMount() {
        axios.get('procedures.json')
            .then( res => {
                // console.log(res)
                this.setState({ procedures: res.data.slice(0, 3) })
            })
            .catch( err => {
                console.log(err)
            })
    }

    render() {

        // URL should be signle service page -> '/services/'+procedure.id

        let procedures = "Loading..."
        if( this.state.procedures !== null ) {
            procedures = this.state.procedures.map( procedure => {
                return (
                    <Post
                        key={procedure.id}
                        id={procedure.id}
                        title={procedure.title}
                        excerpt={procedure.excerpt}
                        body={procedure.body}
                        url={`/services/${procedure.id}` }
                    />
                )
            })
        }


        return (
            // Procedures section start
            <section className="procedures">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-10 m-auto">
                            <div className="sec-heading">
                                <h3 className="sec-title">Popular Procedures</h3>
                                <p>To doesn't his appear replenish together called he of mad place won't wherein blessed second every wherein were meat kind wherein and martcin</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        { procedures }
                    </div>
                </div>
            </section>
            // Procedures section end
        )
    }
}

export default Procedure