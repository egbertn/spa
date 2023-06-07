import React, { Fragment, useEffect, useState, useContext } from 'react'
import { useIntl } from 'react-intl';
import { AppContext } from '../App';

export
const makeHour = (hourminutes, locale) => {
    const dt = new Date();
    var options = { hour: '2-digit', minute: '2-digit' };
    const hours = hourminutes / 100;
    const minutes = hourminutes % 100;
    dt.setHours(hours);
    dt.setMinutes(minutes);
    return new Intl.DateTimeFormat(locale, options).format(dt);
}
const Open = () => {
    const appContext = useContext(AppContext);
    const [isOpen, setIsOpen] = useState(true);
    const { locale } = useIntl();

    useEffect(() => {
        const checkIsOPen = () => {
            const dt = new Date();
            const day = dt.getDay();
            const hour = dt.getHours() * 100 + dt.getMinutes();
            const service = appContext.open.find(f => f.day === day);
            setIsOpen(hour >= service.from && hour <= service.to);
        }

        const ci = setInterval(checkIsOPen, 1000)
        return () => clearInterval(ci);
    }, [])

    /**returns 'maandag' etc */
    const makeDate = (day) => {
        const dt = new Date();
        const month = dt.getMonth();
        const year = dt.getFullYear();
        var options = { weekday: 'long' };
        let d = 0;
        while (( d =dt.getDay()) !== day) {
            dt.setDate(year, month, d+1)
        }
        return new Intl.DateTimeFormat(locale, options).format(dt);
    }


    return (
        <section className="open">
              <div className="container" >
                <div className="row">
                    <div className="col-lg-8 col-md-10 m-auto">
                        <div className="sec-heading">
                            <img src={require("../assets/images/minyada-2.jpeg")} className="minda-2" alt="" />
                            <h3 className="sec-title blink">Nu: {isOpen  ? "Open" : "Gesloten"}</h3>
                            <h4>Openingstijden Minyada Thai Massage</h4>
                            <em>Let op, wel altijd eerst even afspraak maken!</em>
                            <br/>
                            <div style={{
                                textAlign: 'center', display: 'grid', alignItems: 'center', width: 300,
                                gap: 20, gridTemplateColumns: '1fr 1fr'
                            }}>

                            {appContext.open.map((m, i) => {
                                return (<Fragment key={i} ><div style={{ textAlign: 'right' }}>{makeDate(m.day)}</div>
                                    <div style={{ textAlign: 'left' }}>{makeHour(m.from, locale)}-{makeHour(m.to, locale)}</div> </Fragment>
                                )
                            })}
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
        </section>
    )
}
export default Open;