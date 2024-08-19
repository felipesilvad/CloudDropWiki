import React, { useState, useEffect } from 'react';
import { query, collection, onSnapshot, where} from "firebase/firestore"; 
import db from '../../firebase';
import {Container, Table} from 'react-bootstrap';
import EffectTagTxt from '../Effect/EffectTagTxt';

function EffectsList() {
  const [effectTags, setEffectTags] = useState([])

  useEffect (() => {
    onSnapshot(query(collection(db, `/games/soc/effect_tags`)), (snapshot) => {
      setEffectTags(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
    });

  }, [])

  return (
    <Container className='new-container'>
      <div className='d-flex flex-wrap'>
        <Table striped bordered hover variant="dark">
          <tbody>
            {effectTags&&(effectTags.map(effect => (
              <tr>
                <td>{effect.title}</td>
                <td><EffectTagTxt effectTxt={EffectTagTxt} /></td>
              </tr>
            )))}
          </tbody>
        </Table>
      </div>
    </Container>
  )
  
}

export default EffectsList;