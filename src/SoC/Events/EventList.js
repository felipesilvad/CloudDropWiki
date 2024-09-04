import React, { useState, useEffect} from 'react';
import axios from 'axios';
import {Container} from 'react-bootstrap';
import EventItem from './EventItem';

function EventsList({side, limitN=30}) {
  const [events, setEvents] = useState([])

  useEffect (() => {
    axios({method: 'post',url: "https://sa-east-1.aws.data.mongodb-api.com/app/data-wzzmwsl/endpoint/data/v1/action/find",
      data: {"collection":"events","database":"soc","dataSource":"Sword","limit":limitN,
        "sort": {
          "startDate": -1
        }
      }
    }).then(res => {
      setEvents(res.data.documents)
    }).catch(err => console.warn(err));
  }, [])
  
  return (
    <Container className='new-container'>
      {/* <Helmet>
        <title>Events List - SoC Wiki</title>
        <meta name="description" content="Sword of Convallaria All Events and Summon Date Calendar" />
      </Helmet> */}
      <div className='d-flex flex-wrap'>
        {events&&(events.map(event => (
          <EventItem event={event} side={side} />
        )))}
      </div>
    </Container>
  )
  
}

export default EventsList;