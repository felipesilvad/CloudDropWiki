import React, {useState, useEffect} from 'react';
import {Helmet} from "react-helmet-async";
import Container from 'react-bootstrap/Container';
import EventsList from './Events/EventList';
import Mongo from '../mango'

function Home() {
  const [events, setEvents] = useState([])

  useEffect (() => {
    Mongo.find('events').then(res => {
      console.log(res)
    }, function(err) {
      console.log(err); // Error: "It broke"
    })
    // axios({method: 'post',url: "https://sa-east-1.aws.data.mongodb-api.com/app/data-wzzmwsl/endpoint/data/v1/action/find",
    //   data: {"collection":"events","database":"soc","dataSource":"Sword","limit":limitN,
    //     "sort": {
    //       "startDate": -1
    //     }
    //   }
    // }).then(res => {
    //   setEvents(res.data.documents)
    // }).catch(err => console.warn(err));
  }, [])
  return (
    <>
      <Helmet>
        <title>Sword of Convallaria Wiki</title>
        <meta name="description" content="SoC Database, All Characters, Skills, Items, Stages, and Bosses Information." />
        <link rel="canonical" href='/' />
      </Helmet>
      <div className='header-cool'>
        <div className='overlay-dark'></div>
      </div>
      <Container className='new-container mt-2'>
        <div className='black-label-div'>
          Latest Events
        </div>
        {/* <EventsList limitN={9} /> */}
      </Container>
    </>
  );
}

export default Home;