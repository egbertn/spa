import React, { Component } from 'react'
import axios from '../axios-orders';
import Slider, { Settings } from "react-slick";

import SingleTestimonial from '../Components/SingleTestimonial';

class Testimonial extends Component {

    constructor(props) {
        super(props);
        this.state = {testimonials: []};
    }
    componentDidMount() {
        axios.get('testimonials.json')
            .then( res => {
                // console.log(res)
                this.setState({
                    testimonials: res.data
                })
            })
            .catch( err => {
                console.log(err)
            })
    }

    render() {

        // console.log(this.state.testimonials)

        let testimonials = 'Loading...'
        if( this.state.testimonials.length) {
            testimonials = <Slider
                autoplay={true}
                className="test-caro"
                dots={true}
                slidesToShow={1}
                infinite={true}
                margin={0}
            >
            {
                this.state.testimonials.map( tsml => {
                    return (
                        <SingleTestimonial
                            key={tsml.userId}
                            id={tsml.userId}
                            name={tsml.userName}
                            designation={tsml.designation}
                            body={tsml.body}
                        />
                    )
                })
            }
            </Slider>
        }


        return (
            // Testimonial section start
            <section className="testimonial bg-lightred">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 col-md-12 m-auto">
                            {testimonials}
                        </div>
                    </div>
                </div>
            </section>
            // Testimonial section end
        )
    }
}

export default Testimonial