import React, {  Fragment, useEffect, useContext, useState } from 'react'
import { Link } from 'react-router-dom'

import Page from '../Layouts/Pages/Page'
import  AppContext  from '../context';

const SingleService =(props) => {

    const appContext = useContext(AppContext);
    const [service, setService] = useState();
    useEffect(() => {
        const serviceId = props.match.params.id;
        console.log(`service id =${serviceId}`)
        setService(appContext.services[serviceId]);
    }, [appContext.services, props.match.params.id]);
    return (
        <Page>
            {service === undefined && "Loading..."}
            {service && <article className="entry-content">
                <img src={require("../assets/images/post/1.jpg")} alt="" />
                <div className="meta-tags">

                    <Link to="#" className="post-meta"><i className="ti-package"></i>{service.meta.categories.join(', ')}</Link >
                    <Link to="#" className="post-meta"><i className="ti-tag"></i>{service.meta.tags.join(', ')}</Link   >
                </div>
                <h3>{service.excerpt}</h3>
                <p>{service.body}</p>
            </article>}
        </Page>
    )

}

export default SingleService