import React, { useState, useEffect, useRef } from 'react';
import { query, collection, onSnapshot} from "firebase/firestore"; 
import db from '../../firebase';
import {Container,Row,Col} from 'react-bootstrap';
import CharsListItem from './CharsListItem';

function CharsList() {
  const [chars, setChars] = useState([])

  useEffect (() => {
    onSnapshot(query(collection(db, `/games/soc/chars`)), (snapshot) => {
      setChars(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
    });
  }, [])

  return (
    <Container className='new-container'>
      <Row>
        <Col sm={2} className='filter__bg py-2'>
          <div className='filter__div'>
            <h5 className='filter__label'>Filter</h5>
          </div>
        </Col>
        
        <Col>
          <div className='d-flex justify-content-start flex-wrap mt-2'>
            {chars&&(chars.map(char => (
              <CharsListItem char={char} />
            )))}
          </div>
        </Col>
      </Row>
    </Container>
  )
  
}

export default CharsList;