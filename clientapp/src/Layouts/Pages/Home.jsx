import React, {useContext} from 'react';
import Banner from '../../Sections/Banner';
import AboutSec from '../../Sections/About';
import Service from '../../Sections/Service';
import Vouchers from '../../Sections/Vouchers';
//import Procedure from '../../Sections/Procedure'
//import Testimonial from '../../Sections/Testimonial'
/*import Team from '../../Sections/Team'*/
import Appointment from '../../Sections/Appointment';
/*import Blog from './Blog'*/
import Contact from '../../Sections/Contact';
import Minyada from '../../Sections/Minyada';
import Open from '../../Sections/Open';

const Home = () => {

    return (
        <>

            <Banner />
            <AboutSec />

          {/*  <Testimonial />*/}
            <Minyada />
            <Service />
            <Open/>
            <Appointment />
            <Vouchers/>
            <Contact />
        </>
    )
}

export default Home