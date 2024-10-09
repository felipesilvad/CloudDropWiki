import React, {useState, useEffect, useRef, lazy, Suspense} from 'react';
import {useParams} from 'react-router-dom';
import Mongo from '../../mango'
import { Col, Container, Row, Image } from 'react-bootstrap';
import {Helmet} from "react-helmet-async";
import EventLoading from './EventLoading';

const EventsList = lazy(() => import ('./EventList.js'));
const CharsListItemRow = lazy(() => import ('../Chars/CharsListItemRow'));
const CommentSection = lazy(() => import ('../accounts/CommentSection'));


function EventPage({userData}) {
  const id = useParams().id
  const [event, setEvent] = useState()
  const [events, setEvents] = useState([])
  const [matches, setMatches] = useState([])
  const windowWidth = useRef(window.innerWidth);

  useEffect(() => {
    Mongo.find('events',{limit: 1, filter: {"id": id}})
    .then(res => {
      setEvent(res.data.documents[0])
    }, function(err) {
      console.log(err);
    })
    window.scrollTo(0, 0)
  }, [id]);

  useEffect (() => {
    Mongo.find('events',{limit: 6, sort: {"startDate": -1}})
    .then(res => {
      setEvents(res.data.documents)
    }, function(err) {
      console.log(err);
    })
  }, [])

  useEffect(() => {
    if (event&&event.title) {
      if (event.title.match(/"([^"]*)"/g)) {
        Mongo.find('chars',{filter: {"name": {$in: event.title.match(/"([^"]*)"/g).map(match => match.replace(/"/g, '')) }}})
        .then(res => {
          setMatches(res.data.documents)
        }, function(err) {
          console.log(err);
        })
      }
    }
  }, [event]);
  
  if (event) {
    return (
      <Container className='new-container'>
        <Helmet>
          <title>{event.title}</title>
          <meta name="description" content={`${event.content.substring(1, 100)}...`} />
          <link rel="canonical" href={`/events/${id}`} />
        </Helmet>
        <Row className='custom-row'>
          <Col md={9}>
            <div className='event-div p-3'> 
              <div className='d-flex justify-content-center'>
              <Image 
                cloudName="cdwiki" alt={event.id}
                className='event-page-img' width={800} crop="scale"
                fetchpriority="high"
                src={`https://res.cloudinary.com/cdwiki/image/upload/c_scale,w_${800}/v1/events/${event.id}`}
              />
                {/* <Image className='event-page-img' alt={event.id} width={876} height={`inherit`}
                src={`https://firebasestorage.googleapis.com/v0/b/cdwiki-73e46.appspot.com/o/events%2F${event.id}.jpg?alt=media&token=d4a2187b-bfd6-4633-bb6f-7fc65a49c6ed`} /> */}
              </div>

              <div className='m-1 mt-2 d-flex justify-content-center align-items-middle text-center'>
                <h1 className="h5">{event.title}</h1>
              </div>

              <div dangerouslySetInnerHTML={{__html: event.content}}></div>

              {matches&&(
                <>
                  <hr />
                  <p>Featured:</p>
                  <div className='d-flex flex-row'>
                    {matches.map(match => (
                      <div className='event-item'>
                        <Suspense fallback={<EventLoading height="120px" />}>
                          <CharsListItemRow char={match} />
                        </Suspense>
                      </div>
                    ))}
                  </div>
                </>
              )}
              
            </div>

            <Suspense fallback={<EventLoading height="350px" />}>
              <CommentSection userData={userData} />
            </Suspense>
          </Col>


          <Col md={3}>
            <div className='black-label-div'>
              Other Events
            </div>
            <Suspense fallback={<EventLoading height="350px" />}>
              <EventsList side={true} events={events} windowWidth={windowWidth} />
            </Suspense>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default EventPage;