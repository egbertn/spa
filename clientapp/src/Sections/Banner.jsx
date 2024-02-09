import React from 'react'
import { Link } from 'react-scroll'

const banner = props => {
    return (
        // Banner section start
        <section className="banner">
            <div className="spa-img">
                <img src={ require("../assets/images/spa.png") } alt="" />
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="banner-content">
                            <span>Minyada Thai Massage</span>
                            <h2>Persoonlijk en professioneel.</h2>
                            <p>Op zoek naar verlichting van klachten, relaxen of gewoon uw gezondheid in balans?</p>
                            <Link to="appointment" spy={true} smooth={true} className="btn">Reserveren/afspraak</Link>
                            {/*<a className="video-btn" data-fancybox href="https://www.youtube.com/watch?v=QWUPm0ND7HY">*/}
                            {/*    <i className="ti-control-play"></i>*/}
                            {/*    Ons verhaal*/}
                            {/*</a>*/}
                            <Link to="voucher" spy={true} smooth={true} className="btn">Cadeau / Vouchers</Link>

                        </div>
                    </div>
                </div>
            </div>
        </section>
        // Banner section end
    )
}

export default banner