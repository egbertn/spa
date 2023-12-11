import React, { Fragment } from 'react'
import Procedure from '../../Sections/Procedure'
import Appointment from '../../Sections/Appointment'

const services = props => {
    return (
        <Fragment>
            <Procedure />
            <Appointment />
        </Fragment>
    )
}

export default services