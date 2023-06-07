import React, {useState, useEffect } from 'react'

import Slider, { Settings } from "react-slick";

import SingleTestimonial from '../Components/SingleTestimonial';

const Testimonial = (props) => {

    const [testimonials, setTestimonials] = useState([]);
    useEffect(() => {
        fetch('testimonials.json', {
            method: "GET",
            headers: { 'accept': 'application/json' }
        })
            .then(res => {
                // console.log(res)
                setTestimonials(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, []);


    return (
        // Testimonial section start
        <section className="testimonial bg-lightred">
            <div className="container">
                <div className="row">
                    <div className="col-lg-10 col-md-12 m-auto">
                        {testimonials && <Slider
                            autoplay={true}
                            className="test-caro"
                            dots={true}
                            slidesToShow={1}
                            infinite={true}
                            margin={0}
                        >
                            {
                                testimonials.map(tsml => <SingleTestimonial
                                            key={tsml.userId}
                                            id={tsml.userId}
                                            name={tsml.userName}
                                            designation={tsml.designation}
                                            body={tsml.body}
                                        />
                                )
                            }
                        </Slider>
                        }
                    </div>
                </div>
            </div>
        </section>
        // Testimonial section end
    )
}


export default Testimonial