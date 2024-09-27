import React, {useState, useEffect, Suspense, lazy} from 'react';
import {Helmet} from "react-helmet-async";
import Container from 'react-bootstrap/Container';
import Mongo from '../mango'
import {IKImage} from 'imagekitio-react';
import LoadingScreen from './LoadingScreen';
const EventsList = lazy(() => import ('./Events/EventList'));
const EventsCalendar = lazy(() => import ('./Events/EventsCalendar'));


function Home() {
  const [events, setEvents] = useState([])

  useEffect (() => {
    Mongo.find('events',{limit: 9, sort: {"startDate": -1}, "projection": {
      "title": 1,"id": 1, "startDate": 1, "endDate": 1, "color": 1
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

      <div className='black-label-div mt-2'>
        Events Calendar
      </div>
      <EventsCalendar events={events} />
      
      <Container className='new-container mt-2'>


        <div className='black-label-div'>
          Latest Events
        </div>

        <Suspense fallback={<LoadingScreen />}>
          <EventsList events={events} />
        </Suspense>
        
      </Container>

    </>
  );
}

export default Home;