import React, { Component, Fragment } from 'react'
import Minyada from 'Sections/Minyada'
import AboutSec from '../../Sections/About'
import Team from '../../Sections/Team'
import Testimonial from '../../Sections/Testimonial'

class About extends Component {
    render() {
        return (
            <Fragment>
                <Minyada />
                <AboutSec />

       {/*         <Testimonial />*/}
            </Fragment>
        )
    }
}

export default About