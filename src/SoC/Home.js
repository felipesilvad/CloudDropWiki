import React, {useState, useEffect, Suspense, lazy} from 'react';
import {Helmet} from "react-helmet-async";
import Container from 'react-bootstrap/Container';
import Mongo from '../mango'
import {IKImage} from 'imagekitio-react';
import { Row, Col, Button } from 'react-bootstrap';
// import LoadingScreen from './LoadingScreen';
import EventLoading from './Events/EventLoading';
const EventsList = lazy(() => import ('./Events/EventList'));
const EventsCalendar = lazy(() => import ('./Events/EventsCalendar'));
const CharsListItemRow = lazy(() => import ('./Chars/CharsListItemRow'));


function Home() {
  const [events, setEvents] = useState([])
  const popularChars = [
    {name: "Gloria", rarity: "Legendary", role: "Watcher", slug: "gloria"},
    {name: "Acambe", rarity: "Legendary", role: "Destroyer", slug: "acambe"},
    {name: "Cocoa", rarity: "Legendary", role: "Defender", slug: "cocoa"},
    {name: "Rawiyah", rarity: "Legendary", role: "Defender", slug: "rawiyah"},
    {name: "Butterfly", rarity: "Epic", role: "Defender", slug: "butterfly"},
    {name: "Faycal", rarity: "Legendary", role: "Watcher", slug: "faycal"},
    {name: "Momo", rarity: "Legendary", role: "Destroyer", slug: "momo"},
    {name: "Crimson Falcon", rarity: "Epic", role: "Watcher", slug: "crimson-falcon"},
  ]
  useEffect (() => {
    Mongo.find('events',{limit: 9, sort: {"startDate": -1}, "projection": {
      "title": 1,"id": 1, "startDate": 1, "endDate": 1, "color": 1, "type": 1
    }})
    .then(res => {
      setEvents(res.data.documents)
    }, function(err) {
      console.log(err);
    })
  }, [])
  
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

          <Suspense fallback={<EventLoading height="540px" />}>
            <EventsList events={events} />
            {/* <div className='d-flex flex-content-end w-100'>
              <a href='https://forms.gle/VJUss2tM1vMfhj5C6'target="_blank" rel="noreferrer" > 
                <Button className='footer-btn'>More</Button>
              </a>
            </div> */}
          </Suspense>

          <div className='black-label-div mt-1'>
            Events Calendar
          </div>
          <Suspense fallback={<EventLoading height="350px" />}>
            <EventsCalendar events={events} />
          </Suspense>
        </Col>
              <Col md={2} className='filter-bg py-2'>
                <div className='black-label-div'>
                  Popular Characters
                </div>
                {popularChars.map(char => (
                  <CharsListItemRow  char={char}  />
                ))}
              </Col>
      </Row>
        
        
      </Container>

    </>
  );
}

export default Home;