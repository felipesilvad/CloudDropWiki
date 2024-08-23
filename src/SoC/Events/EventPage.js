import React, {useState, useEffect} from 'react';
import { doc, onSnapshot} from 'firebase/firestore';
import {useParams} from 'react-router-dom';
import db from '../../firebase';
import { Col, Container, Image,Row } from 'react-bootstrap';
import EventsList from './EventList';
import EventFeaturedChar from './EventFeaturedChar';

function EventPage() {
  const id = useParams().id

  const [event, setEvent] = useState([])
  const [matches, setMatches] = useState([])

  useEffect(() => {
    onSnapshot(doc(db, "games/soc/events/", id), (doc) => {
      setEvent(doc.data());
    });
    window.scrollTo(0, 0)
  }, [id]);
  

  useEffect(() => {
    if (event.title) {
      if (event.title.match(/"([^"]*)"/g)) {
        setMatches(event.title.match(/"([^"]*)"/g).map(match => match.replace(/"/g, '')))
      }
    }
  }, [event]);

  if (event) {

    return (
      <Container className='new-container'>
        <Row className='custom-row'>
          <Col md={9}>
            <div className='event-div p-3'> 
              <div className='d-flex justify-content-center'>
                <Image className='event-page-img' src={`https://firebasestorage.googleapis.com/v0/b/cdwiki-73e46.appspot.com/o/events%2F${event.id}.jpg?alt=media&token=d4a2187b-bfd6-4633-bb6f-7fc65a49c6ed`} />
              </div>

              <div className='m-1 mt-2 d-flex justify-content-center align-items-middle text-center'>
                <h5>{event.title}</h5>
              </div>

              <div dangerouslySetInnerHTML={{__html: event.content}}></div>

              {matches&&(
                <>
                  <hr />
                  <p>Featured:</p>
                  {matches.map(match => (
                    <EventFeaturedChar charTitle={match} />
                  ))}
                </>
              )}
              
            </div>
          </Col>
          <Col md={3}>
            <div className='black-label-div'>
              Other Events
            </div>
            <EventsList side={true} />
          </Col>
        </Row>
        
      </Container>
    );
  }
}

export default EventPage;