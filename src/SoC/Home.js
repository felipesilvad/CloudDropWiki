import React, {useState, useEffect, Suspense, lazy, useRef} from 'react';
import {Helmet} from "react-helmet-async";
import Container from 'react-bootstrap/Container';
import Mongo from '../mango'
import {IKImage} from 'imagekitio-react';
import {subDays} from 'date-fns';
import {Row,Col} from 'react-bootstrap';
import EventLoading from './Events/EventLoading';
import CharListBg from './assets/img/row-bg-Legendary.webp'
import EventsList from './Events/EventList';
// const EventsList = lazy(() => import ('./Events/EventList'));
const EventsCalendar = lazy(() => import ('./Events/EventsCalendar'));
const CharsListItemRow = lazy(() => import ('./Chars/CharsListItemRow'));
const EventCurrent = lazy(() => import ('./Events/EventCurrent'));


function Home() {
  const [events, setEvents] = useState([])
  const [showCN, setShowCN] = useState(false)
  // const [notPulledCN, setNotPulledCN] = useState(true)
  const today = new Date();
  const currentTime = today.toISOString();
  const startDate = subDays(today, 14).toISOString();
  const windowWidth = useRef(window.innerWidth);
  
  const popularChars = [
    {name: "Gloria", rarity: "Legendary", role: "Watcher", slug: "gloria"},
    {name: "Acambe", rarity: "Legendary", role: "Destroyer", slug: "acambe"},
    {name: "Cocoa", rarity: "Legendary", role: "Defender", slug: "cocoa"},
    {name: "Rawiyah", rarity: "Legendary", role: "Breaker", slug: "rawiyah"},
    {name: "Butterfly", rarity: "Epic", role: "Watcher", slug: "butterfly"},
    {name: "Faycal", rarity: "Legendary", role: "Watcher", slug: "faycal"},
    {name: "Momo", rarity: "Legendary", role: "Destroyer", slug: "momo"},
    {name: "Crimson Falcon", rarity: "Epic", role: "Watcher", slug: "crimson-falcon"},
  ]

  useEffect (() => {
    Mongo.find('events',{limit: 15, sort: {"startDate": -1}, "projection": {
      "title": 1,"id": 1, "startDate": 1, "endDate": 1, "color": 1, "type": 1
    }, 
    // filter: {"type": {$ne: "CN/TW News"}}
  })
    .then(res => {
      setEvents(res.data.documents)
    }, function(err) {
      console.log(err);
    })
    // Mongo.find('events',{filter: {"startDate": { $lt: currentTime}}})
    // .then(res => {
    //   console.log(res.data.documents)
    // }, function(err) {
    //   console.log(err);
    // })
    const preloadImage = new Image();
    preloadImage.src = CharListBg;
  }, [])
  
  // useEffect (() => {
  //   if (showCN&&notPulledCN) {
  //     Mongo.find('events',{limit: 12, sort: {"startDate": -1}, "projection": {
  //       "title": 1,"id": 1, "startDate": 1, "endDate": 1, "color": 1, "type": 1
  //     }})
  //     .then(res => {
  //       setEvents(res.data.documents)
  //       setNotPulledCN(false)
  //       console.log("pulled")
  //     }, function(err) {
  //       console.log(err);
  //     })
  //   }
  // }, [showCN])
    
  return (
    <>
      <Helmet>
        <title>Sword of Convallaria Wiki</title>
        <meta name="description" content="SoC Database, All Characters, Skills, Items, Stages, and Bosses Information." />
        <link rel="canonical" href='/' />
      </Helmet>
      <h1 className='d-none'>Sword of Convallaria Wiki Homepage - Character Skills and Stats, News. SoC database 鈴蘭之劍：為這和平的世界</h1>

      <div className='header-cool d-none d-md-block'>
        <IKImage
          urlEndpoint={'https://ik.imagekit.io/clouddrop/soc/'}
          path={'stage03.png'}
          // fetchpriority="high"
          alt="Background"
          className='header-cool-bg-img'
          loading='lazy'
          transformation={[{
            width: 1100
          }]}
        />
        <div className='overlay-dark'>
        </div>
      </div>
      
      <Container className='skill-list-container mt-2'>
      <Row className='custom-row'>
        <Col md={10}>
          <div className='black-label-div'>
            Latest News
          </div>
          
          {windowWidth.current < 768&&(
            <div className='d-flex checkbox-div justify-content-end mb-2 px-2'>
              <input
                type="checkbox"
                className='cn-checkbox'
                checked={showCN}
                onChange={() => setShowCN(!showCN)}
              />
              Show CN/TW News
            </div>
          )}

          {/* <Suspense fallback={<EventLoading height="540px" />}> */}
            <EventsList windowWidth={windowWidth} events={events.filter(event => showCN?(true):(event.type!=="CN/TW News")).slice(0,9)} />
          {/* </Suspense> */}

          <div className='black-label-div mt-1'>
            Events Calendar
          </div>
          <Suspense fallback={<EventLoading height="350px" />}>
            <EventsCalendar events={events.filter(event => (
              event.endDate!==""&&(
                event.endDate>(startDate.split(".")[0]+"Z")
              )
            ))} />
          </Suspense>
        </Col>
        <Col md={2} className='filter-bg py-2'>
          {windowWidth.current > 768&&(
            <div className='d-flex checkbox-div justify-content-end mb-2 px-2'>
              <input
                type="checkbox"
                className='cn-checkbox'
                checked={showCN}
                onChange={() => setShowCN(!showCN)}
              />
              Show CN/TW News
            </div>
          )}

          <div className='black-label-div my-1 Event-tag'>Current Events</div>
          {events.filter(e => (e.endDate>(currentTime.split(".")[0]+"Z")&&e.type === "Event")).map(event =>(
            <Suspense fallback={<EventLoading height="80px" />}>
              <EventCurrent event={event} />
            </Suspense>
          ))}

          <div className='black-label-div my-1 Summon-tag'>Current Summons</div>
          {events.filter(e => (e.endDate>(currentTime.split(".")[0]+"Z")&&e.type === "Summon")).map(event =>(
            <Suspense fallback={<EventLoading height="80px" />}>
              <EventCurrent event={event} />
            </Suspense>
          ))}

          <div className='black-label-div'>
            Popular Characters
          </div>
          {popularChars.map(char => (
            <CharsListItemRow char={char} bgImg={CharListBg}  />
          ))}
        </Col>
      </Row>
        
        
      </Container>

    </>
  );
}

export default Home;