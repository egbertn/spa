import React, {useEffect, useState} from 'react'
import { NavLink, useLocation } from 'react-router-dom'

const Navbar = () => {

    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    const menuToggleHandler = () => {
        setMenuOpen(!menuOpen);
    }
    const clearStateHandler = () => {
            if (menuOpen) {
                setMenuOpen(false);
            }
        }
    useEffect(() =>
    {

        return () => clearStateHandler();
    }, [])




    const isRoot = location.pathname === "/";
    const absHeader = (isRoot) ? ' abs-header' : '';
    const right = (isRoot) ? '' : ' text-right';

    return (
        // Header start
        <header className={"header" + absHeader}>
            <div className="container">
                <div className="row align-items-end">
                    <div className="col-md-3">
                        <NavLink to="/" className="logo">
                            <img src={require("../assets/images/logo.png")} alt="" />
                        </NavLink>
                    </div>
                    <div className={"col-md-9" + right}>
                        <nav className="primary-menu">
                            <button className="mobile-menu" onClick={menuToggleHandler}><i className="ti-menu"></i></button>
                            <ul className={menuOpen ? "active" : ''}>
                                <li><NavLink to="/" onClick={clearStateHandler}>Home</NavLink></li>
                                <li><NavLink to="/about" onClick={clearStateHandler}>Informatie</NavLink></li>
                                {/*<li><NavLink to="/feature" onClick={ clearStateHandler }>feature</NavLink></li>*/}
                                {/* <li><NavLink to="/services" onClick={ clearStateHandler }>service</NavLink></li> */}
                                {/* <li><NavLink to="/blog" onClick={ clearStateHandler }>blog</NavLink></li> */}
                                <li><NavLink to="/contact" onClick={clearStateHandler}>Contact</NavLink></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
        // Header start
    )
}



export default Navbar
