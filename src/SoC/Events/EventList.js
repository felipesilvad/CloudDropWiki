import React, {Suspense, lazy} from 'react';
import {Container} from 'react-bootstrap';
import EventLoading from './EventLoading';
const EventItem = lazy(() => import ('./EventItem'));

function EventsList({side, events}) {
  
  return (
    <Container className='new-container'>
      <div className='d-flex flex-wrap'>
        {events.map((event, i) => (
          <Suspense fallback={<EventLoading />}>
            <EventItem event={event} side={side} i={i} />
          </Suspense>
        ))}
      </div>
    </Container>
  )
  
}

export default EventsList;