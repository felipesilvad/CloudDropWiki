import React, { useState, useEffect} from 'react';
import EventsList from './EventList';
import Mongo from '../../mango'
import {Helmet} from "react-helmet-async";

function EventsListPage() {
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
        <title>Events List - SoC Wiki</title>
        <meta name="description" content="Sword of Convallaria All Events and Summon Date Calendar" />
        <link rel="canonical" href='/events' />
      </Helmet>
      <EventsList events={events} />
    </>
  )
  
}

export default EventsListPage;