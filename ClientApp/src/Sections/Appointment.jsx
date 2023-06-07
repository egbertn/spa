import React, { useEffect, useState, useContext } from 'react';
import { useIntl } from 'react-intl';

import { AppContext } from '../App';
import { makeHour } from './Open';
const Appointment = () => {
    const appContext = useContext(AppContext);
    const { locale } = useIntl();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [remarks, setRemarks] = useState('');
    const [service, setService] = useState('');
    const [phone, setPhone] = useState('');
    const [date, setDate] = useState(new Date().toLocaleTimeString());
    const [parsedDate, setParsedDate] = useState(new Date());
    const [time, setTime] = useState(new Date().toLocaleTimeString());
    const [lf, setLf] = useState(0);
    const [h, seth] = useState(0);
    const [msg, setMsg] = useState('');
    const [show, setShow] = useState(false);
    useEffect(() => {
        fetch('appointment.json',  {
            method: "GET",
            headers: { 'accept': 'application/json' }
        })
            .then(res => {
                const c = res.data;
                setLf(c.lf);
                seth(c.h);
            })
            .catch(err => {
                console.error(err)
            })
    }, []);

    const changeServiceHandler = (e) => {
        setService( e.target.value);
    }
    const changeNameHandler = (e) => {
        setName(e.target.value);
    }
    const changeEmailHandler = (e) => {
        setEmail(e.target.value);
    }
    const onSubmitHandler = (e) => {
        e.preventDefault()
        const appointment = {
            lf: lf,
            h: h,
            name: name,
            email: email,
            remarks: remarks,
            phone: phone,
            service: service,
            date: date + " " + time
        }
        // console.log(prevComments, 'Comment form')
        fetch("appointment.json",  {
            method: "POST",
            body: JSON.stringify(appointment),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(_ => {
                // console.log("Successfull")
                setMsg('Uw reservering is ontvangen, ik contacteer u voor bevestiging');
                setShow(true);
            })
            .catch(err => {
                console.log(err.message)
            })
    }
    const changePhoneHandler = (e) => {
        setPhone(e.target.value);
    }
    const changeDateHandler = (e) => {
        setDate(e.target.value);
        setParsedDate(e.target.valueAsDate);
    }
    const changeTimeHandler = (e) => {
        setTime(e.target.value);
    }
    const changeRemarkHandler = (e) => {
        setRemarks(e.target.value);
    }
    const getHours = (chosenDate, locale) => {
        let arr = [];
        if (chosenDate) {
            const dt = chosenDate.getDay();
            const openClose = appContext.open.find(f => f.day === dt);
            for (let i = openClose.from; i < openClose.to; i += 100) {
                for (let j = 0; j < 60; j += 15) {
                    arr.push(makeHour(i+j, locale));
                }
            }
        }
        return arr;

    }
    return (
        // Appointment section start
        <section className="appointment">
            <div className="appointment-wrap">
                <figure>
                    <img src={ require("../assets/images/appointment-img.jpg") } alt="Afspraak maken icoon" />
                </figure>
                <div className="appointment-form" id="appointment">

                    <form action="#" onSubmit={onSubmitHandler}>
                        <div className="form-group has-warning has-feedback">
                            <div className="col-sm-10" style={{ display: show ? 'block' : 'none' }}>
                                <span className="form-control-feedback">
                                    <em><i className="fa fa-rotate-right">{msg}
                                </i></em></span>
                            </div>
                        </div>
                        <div className="form-field half-width">
                            <input type="text" placeholder="Naam" required value={name} onChange={changeNameHandler}/>
                            <input type="email" placeholder="E-mail adres" value={email} required onChange={changeEmailHandler} />
                        </div>
                        <div className="form-field half-width">

                            <div className="select-field">
                                <select name="service" required onChange={changeServiceHandler}>
                                    <option></option>
                                    <option>Thai massage</option>
                                    <option>Hot stone</option>
                                    <option>Oliemassage</option>
                                    <option>Aromatherapie</option>
                                    <option>Voetmassage</option>
                                </select>
                            </div>
                            <input type="tel" placeholder="Telefoon (phone)" value={phone} onChange={changePhoneHandler}/>
                        </div>
                        <div className="form-field half-width">
                            <input type="date" style={{ width: '50%' }}
                                placeholder="Gewenste datum" value={date} title="Preferred date"
                                onChange={changeDateHandler} />
                            <select style={{width:'50%'} } name="time" title="Preferred time" required onChange={changeTimeHandler}>
                                {getHours(parsedDate, locale).map((m, i) => <option key={i}>{m}</option>)}

                            </select>

                        </div>
                        <div className="form-field">
                            <textarea name="notes" placeholder="Eventuele opmerkingen" onChange={changeRemarkHandler} value={remarks} />
                        </div>
                        <button className="btn btn-round" title="make an appointment">Maak een afspraak</button>
                    </form>
                </div>
            </div>
        </section>
        // Appointment section end
    )
}

export default Appointment