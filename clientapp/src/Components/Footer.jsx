import React from 'react'
import { Link } from 'react-router-dom'

const footer = props => {

    return (
        // Footer strat
        <footer className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-12 text-center">
                        <Link to="index.html" className="logo foo-logo">
                            <img src={ require("../assets/images/logo.png") } alt="" />
                        </Link>
                        <nav className="foo-nav">
                            <ul>
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/about">About</Link></li>
                                <li><Link to="/feature">feature</Link></li>
                                <li><Link to="/Blog">Blog</Link></li>
                                <li><Link to="/contact">Contact</Link></li>
                            </ul>
                        </nav>
                        <div className="foo-social">
                            <a href="https://www.facebook.com/minyadamassage/"><i className="ti-facebook">Minyada op Facebook</i></a>

                            {/*<Link to="#"><i className="ti-instagram"></i></Link>*/}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
        // Footer end
    )
}

export default footer