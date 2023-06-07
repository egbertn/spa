import React, {  useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import api from '../axios-orders';
const Contact = () => {
    const [contactInfo, setContactInfo] = useState({
        name: '',
        email: '',
        phone: '',
        body: '',
        subject: '',
        lf: 0,
        h: 0
    });
    const [messagePosted, setMessagePosted] = useState(false);
    const [random, setRandom] = useState(0);
    const randomize = () => setRandom(Math.random());
    const inputChangeHandler = (e) => {
        setContactInfo(u => {
            u[e.target.name] = e.target.value
            return u;
        });
        randomize()
    }
    const navigate = useNavigate();
    const onSubmitHandler = (e) => {
        e.preventDefault()

        // console.log(prevComments, 'Comment form')
        api.post("contact.json", contactInfo)
            .then(res => {
                // console.log("Successfull")
                setMessagePosted(true);
                navigate('/')
            })
            .catch(err => {
                console.log(err.message)
            })
    }
    useEffect(() => {
        api.get('contact.json')
            .then(res => {
                const c = res.data;
                setContactInfo( {...contactInfo, lf: c.lf, h: c.h } );
            })
            .catch(err => {
                console.error(err)
            })
    }, [])



    return (
        // Contact section start
        <section className="contact">
            <div className="container" id="contact">
                <div className="row">
                    <div className="col-lg-8 col-md-10 m-auto">
                        <div className="sec-heading">
                            <img src={require("../assets/images/minyada-2.jpeg")} className="minda-2" alt="" />
                            <h3 className="sec-title">Contact</h3>
                            <p>Contacteren Minyada Thai Massage
                            </p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-10 col-md-12 m-auto">
                        <div className="row">
                            <div className="col-md-4">
                                <address>
                                    <span className="ti-map-alt"></span>
                                    Saturnustraat  21<br />
                                    Alphen aan den Rijn
                                </address>

                                <address>
                                    <span className="ti-tablet"></span>
                                    <a href="tel:0683983762">Telefoon</a>

                                </address>
                            </div>
                            <div className="col-md-7 offset-md-1">
                                <form className="contact-form" >

                                    <input
                                        type="name"
                                        name="name"
                                        placeholder="Naam (name)"
                                        onChange={inputChangeHandler}
                                        value={contactInfo.name}
                                        required
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="E-mail (email)"
                                        onChange={inputChangeHandler}
                                        value={contactInfo.email}
                                        required
                                    />
                                    <input
                                        type="phone"
                                        name="phone"
                                        placeholder="Telefoon (phone)"
                                        onChange={inputChangeHandler}
                                        value={contactInfo.phone}
                                        required
                                    />
                                    <input
                                        type="text"
                                        name="subject"
                                        placeholder="Onderwerp (subject)"
                                        onChange={inputChangeHandler}
                                        value={contactInfo.subject}
                                        required
                                    />
                                    <textarea
                                        name="body"
                                        placeholder="Bericht (message)"
                                        onChange={inputChangeHandler}
                                        value={contactInfo.body}
                                        required
                                    />
                                    <button type='button'  className="btn btn-round" onClick={onSubmitHandler}>Verstuur (Send)</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        // Contact section end
    )
}


export default Contact