import React from 'react'
import { Link } from 'react-router-dom'
import "../assets/images/china-rose.png";
import '@fontsource/kaushan-script/index.css';


import '@fontsource/montserrat/index.css';

import img from '../assets/images/screen_2x.jpg';
import img2 from '../assets/images/flower.svg';
const    textStyle=
    {textAlign: 'left', color: 'black', fontFamily: 'montserrat', backgroundColor: 'white', opacity: '0.8'};

const aboutSec = props => {
    const products = [{
        name: 'Thaise massage',
        times: [30,45,60,90,120],
        prices: [35,45,55,80,100]
    },
    {
        name: 'Thaise yogamassage',
        times: [30,45,60,90,120],
        prices: [45,50,60,90,120]
    },
    { name: 'Nek, rug, schoudermassage',
    times: [30,45, 60],
    prices: [40, 45, 60]},
    { name: 'Voetmassage',
    times: [30,45,60],
    prices: [35,40,45]},
    { name: 'Oliemassage',
    times: [30,45,60,90,120],
    prices: [45,50, 60,90, 120]},
    { name: 'Hotstone massage',
    times: [45, 60, 90, 120],
    prices: [55, 65, 95, 130]},
    { name: 'Compres massage',
    times: [45, 60, 90, 120],
    prices: [55, 65, 95, 130]},
    { name: 'Aromatherapie massage*',
    prices: [65, 75, 100, 140],
    times: [45, 60,90, 120]},
    { name: 'Aromatherapie + compress massage',
    times: [45, 60, 90, 120],
    prices: [65, 75, 100, 140]},
    { name: 'Aroma + Hotstone massage ',
    times: [45, 60, 90 ,120],
    prices: [70, 80, 110, 150]}
    ];
    return (
        // About section start
        <section className="about">


            <div className="container" style={{backgroundImage:`url(${img2}), url(${img})` , backgroundSize: 'auto, cover',
            backgroundPosition: 'top 10px right 10px, auto',  backgroundRepeat: 'no-repeat'}}>
                <div className="row" style={{height: '150px', verticalAlign: 'center'}}>
                    <div className="col-md-12" style={{marginTop:'40px', height: '100%', display: 'inline', verticalAlign:'center', fontFamily: 'Kaushan Script', fontSize: '64px', textTransform: 'uppercase', color: 'black'}}>
                    Minyada thai<br/><br/>massage
                    </div>
                </div>
                {products.map((p, i) => {
                    return ( <React.Fragment key={i}>
                    <div className="row" style={{userSelect: 'none'}}>
                        <div className="col-md-2">
                            &nbsp;
                        </div>
                        <div className="col-md-8" style={{minWidth: '0', minHeight: '0'}}>
                            <div style={{width: '100%', height: '16.9997px', transform: 'translate(25%)'}}>

                               <svg  preserveAspectRatio="xMidYMid meet"
                                    viewBox="0.0 0.0 500.1 14.6" zoomAndPan="magnify" style={{fill: 'rgb(0, 0, 0)'}} role="img" aria-label="Line">
                                <g style={{fill: 'rgb(0, 0, 0)'}}>
                                    <path d="M499.2,6.5H353L266.9,0l-7.3,7.3l7.3,7.3L353,8.1h146.3c0.4,0,0.8-0.3,0.8-0.8S499.7,6.5,499.2,6.5z"
                                    style={{fill: 'inherit'}}></path>
                                    <path d="M147,6.5H0.8C0.3,6.5,0,6.9,0,7.3s0.3,0.8,0.8,0.8H147l86.1,6.5l7.3-7.3L233.1,0L147,6.5z" style={{fill: 'inherit'}}>
                                        </path><circle cx="250" cy="7.3" r="6.2" style={{fill: 'inherit'}}></circle></g></svg>

                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-2"></div>
                        <div className="col-md-5 " style={textStyle}>
                            <div>{p.name}</div>
                            {p.times.map((m, i) => <span key={i}>{m} min. / </span>)}
                        </div>
                        <div className="col-md-3" style={textStyle}>
                            <div>&nbsp;</div>
                            {p.prices.map((p, i) => <span key={i}>&euro;{p} / </span>)}

                        </div>
                    </div>


                     </React.Fragment>)
                })
                }
                 <div className="row">
                        <div className="col-md-2">&nbsp;</div>
                  </div>
                  <div className="row">
                        <div className="col-md-2">&nbsp;</div>
                        <div className="col-md-8" style={textStyle}>
                        Voor aromatherapie hebben we 14 geuren:
                                 lavendel, theeboom, kaneel, citroengras, zoete sinaasappel, pepermunt,
                                       citroen, bergamot, rozemarijn, grapefruit, roos, wierook, jasmijn, Eucalypthus
                        </div>
                </div>
                <div className="row">
                        <div className="col-md-2">&nbsp;</div>
                  </div>
                <div className="row">
                        <div className="col-md-2"></div>
                        <div className="col-md-5 " style={textStyle}>
                           Wij bieden geen erotische massages!
                        </div>
                        <div className="col-md-3" style={textStyle}>
                        </div>
                    </div>

            </div>
        </section>
        // About section end
        )
}

export default aboutSec