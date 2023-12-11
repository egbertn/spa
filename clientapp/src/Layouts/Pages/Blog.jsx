import React  from 'react'
import Posts from '../../Sections/Posts'

const blog = () => {
    return (
        // Blog section start
        <section className="blog">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-md-10 m-auto">
                        <div className="sec-heading">
                            <h3 className="sec-title">Voordelen van Hotstone Massage</h3>
                            <p>Wat is hotstone massage?<br />
                                Hotstone-massage is het gebruik van stenen om warmte te vesrpeiden, om verschillende delen van het lichaaam te masseren.
                                <br />De warmte van de steen kan zich ook verspreiden naar de lever, waardoor stress en spierspanning worden tegengegaan.
                                De hitte helpt ook voor de masserende werking van de olie. </p>
                            <p>Welke stenen worden gebruikt?</p>
                            <p>Waar komen deze vandaan? Worden ze gemaakt? De meeste stenen zijn stukjes basalt, een rots gevormd door snel afkoelende lava. <br />
                                Het kenmerk van deze steensoort is dat hij een fijne textuur heeft en poreus is. Belangrijker, hij kan warmte goed absorberen. <br />
                                De steen wordt zo glad geslepen, zodat hij geschikt is voor massage. Om verschillende spieren te kunnen helpen, heeft de masseur verschillende maten stenen.</p>
                            <p>Wie kan gebruik maken van deze therapie?</p>
                            <p>Eigenlijk kan iedereen die moe is, hier gebruik van maken, vooral kantoormedewerkers met rugpijn of mogelijk met het kantoorsyndroom, is het zeer geschikt.<br />
                                Omdat je je op je gemak voelt vanaf de eerste keer, dat de hete steen je masseert.<br />
                                Iedereen die van een voor de huid voedzame massage houdt, zoals met aromatherapie, is hot-stone een andere optie.<br />
                                Probeer het gewoon eens! Boek een massageservice via 'Minyada Thai Massage', u ontvangt een promotie waarbij hotstone voorlopig 10% korting geeft. Boek nu!
                            </p>

                        </div>
                    </div>
                </div>

                {/* Posts */}
                <Posts />

            </div>
        </section>
        // Blog section end
    )
}


export default blog