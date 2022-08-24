import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'


const layout = props => {
    return (
        <>
            <Navbar />
            { props.children }
            <Footer />
        </>
    )
}

export default layout