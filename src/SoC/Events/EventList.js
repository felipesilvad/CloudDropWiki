import React, {Suspense, lazy} from 'react';
import {Container} from 'react-bootstrap';
import EventLoading from './EventLoading';
const EventItem = lazy(() => import ('./EventItem'));
const EventItemMobile = lazy(() => import ('./EventItemMobile'));

function EventsList({side, events,windowWidth}) {
  
  if (windowWidth.current > 768) {
    return (
      <Container className='new-container'>
        <div className='d-flex flex-wrap'>
          {events.map((event, i) => (
            <Suspense key={i} fallback={<EventLoading key={i} height="200px" />}>
              <EventItem event={event} side={side} i={i} />
            </Suspense>
          ))}
        </div>
      </Container>
    )
  } else {
      return (
      <>
        {events.map((event, i) => (
          <Suspense key={i} fallback={<EventLoading key={i} height="180px" />}>
            <EventItemMobile event={event} side={side} i={i} />
          </Suspense>
        ))}
      </>
    )
  }
  
}

export default EventsList;