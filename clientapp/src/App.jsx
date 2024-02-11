import React, {useState, useEffect} from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './Layouts/Layout';
import Home from './Layouts/Pages/Home'
import Blog from './Layouts/Pages/Blog'
import About from './Layouts/Pages/About'
import Service from './Layouts/Pages/Services'
import Contact from './Layouts/Pages/Contact'
import SinglePost from './Sections/SinglePost'
import SingleService from './Sections/SingleService'

import ErrorPage from './Components/Error'
import { IntlProvider } from 'react-intl';
// All external css
import './assets/css/themify-icons.css'
import './assets/css/bootstrap.min.css'
import './assets/css/style.css';
import Testimonial from './Sections/Testimonial';

import s2 from './assets/images/service/2.jpeg'
import s3 from './assets/images/service/3.jpeg'
import s4 from './assets/images/service/4.jpeg'
import s5 from './assets/images/service/5.jpeg'
import s6 from './assets/images/service/6.jpeg'
import s7 from './assets/images/service/7.jpeg'
import s8 from './assets/images/service/8.jpeg'
import s9 from './assets/images/service/9.jpeg'
const openAt = [
  { day: 1, from: 1300, to: 2200 }, //monday
  { day: 2, from: 1300, to: 2200 },
  { day: 3, from: 1300, to: 2200 },
  { day: 4, from: 1300, to: 2200 },
  { day: 5, from: 1300, to: 2200 },
  { day: 6, from: 1900, to: 2230 }, //sat
  { day: 0, from: 1900, to: 2230 }, //sunday
];
const imgr =[
  {
    img: s2, name: 'Ontspannende hoofdmassage', meta: { tags: [], categories: [] }, excerpt: 'Bijna altijd inbegrepen',
    body: 'Ontspannende hoofdmassage ontbreekt er niet aan. Spieren in de nek, op het hoofd en gezicht worden professioneel gemasseerd.'
  },
  {
    img: s3, name: 'Hot Stonemassage', tags: [], categories: [], excerpt: 'Verlichting voor gewrichten en spieren door warmte',
    body: 'Gun jezelf eens een keer een hot stone massage. Veel mensen geloven dat stenen genezende krachten hebben. Hotstone massage is het gebruik van warme vulkaanstenen, die rijk zijn aan mineralen en een goede temperatuur behouden. De stenen worden tot ongeveer 50 &deg opgewarmd; Ze worden toegepast en op verschillende posities van het lichaam, zoals de schouders, ruggengraat, heupen, enz.'
  },
  {
    img: s4, name: 'Thaise Massage. ', meta: { tags: [], categories: [] }, excerpt: 'Traditioneel Thais! Zeer effectief.',
    body: 'Thaise massage of traditionele massage is typisch Thaise cultuur. Het behoort tot de wetenschap van genezing en behandeling van een tak van de Thaise traditionele geneeskunde. Het richt zich op drukken, rollen, knijpen, buigen, trekken en drukken. Staat algemeen bekend als: "Traditionele massage". Deze massage kan op sommige momenten gevoelig zijn omdat overbelaste spieren flink worden aangepakt. Dit is noodzakelijk om de spieren te ontgiften en soepel te maken.'
  },
  {
    img: s5, name: 'Aroma therapie', meta: { tags: [], categories: [] }, excerpt: 'Beter slapen? Probeer dit',
    body: 'Stimuleert de werking van het zenuwstelsel. Helpt te ontspannen en stress te verminderen, geeft je een verfrist gevoel. Voegt vocht aan de huid toe en de flexibiliteit van het lichaam te vergroot. Verbetert de slaap'
  },
  {
    img: s6, name: 'Thaise Oliemassage', meta: { tags: [], categories: [] }, excerpt: 'Comfortabele symptomenverlichting',
    body: 'Thaise oliemassage lijkt op gewone Thaise massage maar het is prettiger en comfortabeler. Omdat er olie en balsem wordt toegepast om de (spier)lijnen los te maken vermindert de pijn met gebruik van reflexologie of massage zodat symptomen verlichten. Ook wordt massage gebruikt om verschillende pezen langs de spieren te ontspannen. Dit reduceert spierpijn taaislijmziekte beter dan gewone Thaise massage'
  },
  {
    img: s7, name: 'Hete Kruidencompress', meta: { tags: [], categories: [] }, excerpt: 'Verlichting van spierpijn',
    body: 'Het compres is rond en warm. De therapeut rolt deze tegen de huid waardoor op plaatsen waar spierpijn is verlichting ontstaat.'
  },
  {
    img: s8, name: 'Meer Hot Stone Massage', tags: [], categories: [], excerpt: 'Verlichting voor gewrichten en spieren door warmte',
    body: 'Gun jezelf eens een keer een hot stone massage. Veel mensen geloven dat stenen genezende krachten hebben. Hotstone-massage is het gebruik van vulkaanstenen, die rijk zijn aan mineralen en een goede temperatuur behouden. De stenen worden tot ongeveer 50 &deg opgewarmd; voordat ze worden toegepast en op verschillende posities van het lichaam geplaatst, zoals de schouders, ruggengraat, heupen, enz.'
  },
  {
    img: s9, name: 'Thai Massage', meta: { tags: [], categories: [] }, excerpt: 'Traditioneel Thais! Zeer effectief',
    body: 'Thaise massage of traditionele massage is typisch Thaise cultuur. Het behoort tot de wetenschap van genezing en behandeling van een tak van de Thaise traditionele geneeskunde. Het richt zich op drukken, rollen, knijpen, buigen, trekken en drukken. Staat algemeen bekend als: "Traditionele massage"'
  },
];
import AppContext from './context'

const App = () => {
  const [appContext, _setAppContext] = useState(
    { n: 'hi', open: openAt, services: imgr, siteId: '' }
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/config.json');
        const data = await response.json();
        _setAppContext((prevAppContext) => ({
          ...prevAppContext,
          siteId: data.siteId,
        }));
        setIsLoading(false); // Mark loading as complete after successful data fetch
      } catch (error) {
        console.error('Error fetching config:', error);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    // Render a loading indicator or placeholder while data is being fetched
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <div className="App">
        <IntlProvider onError={() => { }} locale={'nl'} >
          <AppContext.Provider value={appContext}>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/feature" element={<Testimonial />} />
                <Route path="/services" element={<Service />} />
                <Route path="/services/:id" element={<SingleService />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<SinglePost />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<ErrorPage />} />
              </Routes>
            </Layout>
          </AppContext.Provider>
        </IntlProvider>
      </div>
    </BrowserRouter>
  );
}



export default App;
