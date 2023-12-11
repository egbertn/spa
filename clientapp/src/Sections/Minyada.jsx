
import { Link } from 'react-router-dom'



const Minyada = () => {
    return (

        <section className="minyada">
            
            <img  src={require("../assets/images/certificate-1.png")} alt="Minyada certificaat 1" className="certificate-1" />
            <img  src={require("../assets/images/certificate-2.png")} alt="Minyada certificaat 2" className="certificate-2" />

     
            <div className="container">
                <div className="row">
                    <div className="col-lg-10 col-md-12 m-auto">
                        <div className="sec-heading">
                            <img src={require("../assets/images/minyada.jpeg")} className="minda" alt="" />
                            <span className="tagline">Wie is Minyada?</span>
                            <h3 className="sec-title">Iets meer over mijzelf</h3>
                            <p>Mensen kennen mij als integer, gepassioneerd, professioneel, inventief, creatief.</p>
                            <p>Deze kwaliteiten hebben mij bijvoorbeeld op management niveau gebracht bij een hotel waar ik werkte in Oman</p>
                            <p>In ieder geval, nodig ik u uit om eens persoonlijk kennis te maken en de week gezonder en blijer door te maken. Tot ziens!</p>
                        </div>
                        {/* <Link to="/minyada" className="btn btn-round">Read more</Link> */}
                    </div>
                </div>
            </div>
        </section>)
}

export default Minyada