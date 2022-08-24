import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'

class Navbar extends Component {

    state = {
        menuOpen: false
    }

    // isHome =
    // absHeader = ( this.props.location.pathname === "/") ? ' abs-header' : '';
    // right = ( this.props.location.pathname === '/') ? '' : ' text-right';

    menuToggleHandler = () => {
        this.setState( prevState => {
            return { menuOpen: !prevState.menuOpen }
        })
    }

    // componentWillUnmount() {
    //     this.clearStateHandler()
    // }

    clearStateHandler = () => {
        if (this.state.menuOpen) {
            this.setState({
                menuOpen: false
            })
        }
    }

    render() {

        let absHeader = ( this.props.location.pathname === "/") ? ' abs-header' : '';
        let right = ( this.props.location.pathname === '/') ? '' : ' text-right';

        return (
            // Header start
            <header className={"header" + absHeader }>
                <div className="container">
                    <div className="row align-items-end">
                        <div className="col-md-3">
                            <NavLink to="/" className="logo">
                                <img src= { require("../assets/images/logo.png")} alt="" />
                            </NavLink>
                        </div>
                        <div className={"col-md-9" + right}>
                            <nav className="primary-menu">
                                <button className="mobile-menu" onClick={ this.menuToggleHandler }><i className="ti-menu"></i></button>
                                <ul className={ this.state.menuOpen ? "active" : '' }>
                                    <li><NavLink to="/" onClick={ this.clearStateHandler }>Home</NavLink></li>
                                    <li><NavLink to="/about" onClick={ this.clearStateHandler }>Informatie</NavLink></li>
                                    {/*<li><NavLink to="/feature" onClick={ this.clearStateHandler }>feature</NavLink></li>*/}
                                    {/* <li><NavLink to="/services" onClick={ this.clearStateHandler }>service</NavLink></li> */}
                                    {/* <li><NavLink to="/blog" onClick={ this.clearStateHandler }>blog</NavLink></li> */}
                                    <li><NavLink to="/contact" onClick={ this.clearStateHandler }>Contact</NavLink></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </header>
            // Header start
        )
    }

}

export default withRouter(Navbar)
