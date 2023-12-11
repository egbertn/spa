import React, { useState, useContext } from 'react'
import Slider from 'react-slick';
import DialogNoId, { DialogContent } from '../Components/Dialog';
import { AppContext } from '../App';
import "../assets/css/slick.css?v=1337-2021";
import "../assets/css/slick-theme.css?v=1337-2021";

const Service = () => { 
    const [showDialog, setShowDialog] = useState(false);
    const appContext = useContext(AppContext);
    const [service, setService] = useState({name: 'undefined'});
        
    const imageUrl = (img) => {
        

        return `url(${encodeURIComponent(img)})`
    }

       return (
      // Service section start
           <section className="service">
               <DialogContent  isOpen={showDialog} 
                   caption={service.name}
                   summary={service.excerpt}
                   body ={service.body}
							onClose={() => {
                                setShowDialog(false);
							}}/>
               <Slider
                   
                   autoplay={true}
                   className="service-caro"
                   
                   dots={false}
                   autoplaySpeed={4500}
                   arrows={false}
                   infite={true}
                   slidesToShow={4}
               slidesToScroll={1}
              
               >
                   {
                       appContext.services.map((m, i) => <div key={i} className="single-service">
                           <div style={{
                               height: '300px',
                          
                            backgroundImage: `url(${m.img})`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat'}}></div>
                           <div className="service-hover" onClick={() => {
                                setService(m);
                                setShowDialog(true);
                           }}>
                      <img  src={ require("../assets/images/icons/1.png") } alt="" />
                      <span>{m.name}</span>
                  </div>
                   </div>)
                   }
          </Slider>
      </section>
      // Service section end
  )
 
}
export default Service