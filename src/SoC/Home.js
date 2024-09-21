import React, {useState, useEffect} from 'react';
import {Helmet} from "react-helmet-async";
import Container from 'react-bootstrap/Container';
import EventsList from './Events/EventList';
import Mongo from '../mango'
import {IKImage} from 'imagekitio-react';

function Home() {
  const [events, setEvents] = useState([])

  useEffect (() => {
    Mongo.find('events',{limit: 9, sort: {"startDate": -1}})
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
      <h1 className='d-none'>Sword of Convallaria Wiki Homepage - Character Skills and Stats, News</h1>
      <div className='header-cool'>
        <IKImage
          urlEndpoint={'https://ik.imagekit.io/clouddrop/soc/'}
          path={'stage03.png'}
          fetchpriority="high"
          alt="Background"
          className='header-cool-bg-img'
          transformation={[{
            width: 1100
          }]}
        />
        <div className='overlay-dark'>
          
        </div>
      </div>
      <Container className='new-container mt-2'>
        <div className='black-label-div'>
          Latest Events
        </div>
        <EventsList events={events} />
      </Container>
    </>
  );
}

export default Home;