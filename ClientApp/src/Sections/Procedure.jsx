import React, { useState, useEffect } from 'react'

import Post from '../Components/Post'

const Procedure = (props) => {

    const [procedures, setProcedures] = useState([]);

    useEffect(() => {
        fetch('procedures.json',  {
            method: "GET",
            headers: { 'accept': 'application/json' }
        })
            .then(res => {
                // console.log(res)
                setProcedures(res.slice(0, 3))
            })
            .catch(err => {
                console.log(err)
            })
    }, []);



    // URL should be signle service page -> '/services/'+procedure.


    return (
        // Procedures section start
        <section className="procedures">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-md-10 m-auto">
                        <div className="sec-heading">
                            <h3 className="sec-title">Popular Procedures</h3>
                            <p>To doesn't his appear replenish together called he of mad place won't wherein blessed second every wherein were meat kind wherein and martcin</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {procedures === undefined && "Loading..."}
                    {procedures && procedures.map(procedure => <Post
                        key={procedure.id}
                        id={procedure.id}
                        title={procedure.title}
                        excerpt={procedure.excerpt}
                        body={procedure.body}
                        url={`/services/${procedure.id}`}
                    />
                    )
                    }
                </div>
            </div>
        </section>
        // Procedures section end
    )
}


export default Procedure