import React from 'react';
import {Container} from 'react-bootstrap';
import EventItem from './EventItem';

function EventsList({side, events}) {
  
  return (
    <Container className='new-container'>
      <div className='d-flex flex-wrap'>
        {events.length?(
          events.map((event, i) => (
            <EventItem event={event} side={side} i={i} />
          ))
        ):(
          Array(9).fill().map((event, i) => (
            <EventItem event={null} side={side} i={i} />
          ))
        )
        }
      </div>
    </Container>
  )
  
}

export default EventsList;