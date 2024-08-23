import React, { useState, useEffect } from 'react';
import { query, collection, onSnapshot, where} from "firebase/firestore"; 
import db from '../../firebase';
import {Helmet} from "react-helmet";
import {Container} from 'react-bootstrap';
import TraitListItem from './TraitListItem';

function TraitsList() {
  const [skills, setSkills] = useState([])
  // const [searchChanged, setSearchChanged] = useState(false)
  const [blueEffects, setBlueEffects] = useState([])
  const [chars, setChars] = useState([])

  useEffect (() => {
    onSnapshot(query(collection(db, `/games/soc/traits`)), (snapshot) => {
      setSkills(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
    });
    onSnapshot(query(collection(db, `games/soc/effect_tags`), where("color","==","blue")), (snapshot) => {
      setBlueEffects(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
    });
    onSnapshot(query(collection(db, `/games/soc/chars`)), (snapshot) => {
      setChars(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
    });
  }, [])

  const filteredSkills = skills
    // .filter(skill => skill.title.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <Container className='new-container'>
      <Helmet>
        <title>Traits List - SoC Wiki</title>
        <meta name="description" content="Sword of Convallaria All Traits, Characters Unique Passive effects" />
      </Helmet>
      {/* <div>
        <div className={`side-bar-filter`}>
          <Form.Control type="text"placeholder="Search"
          value={searchTerm} onChange={e => setSearchTerm(e.target.value)}/>
        </div>
      </div> */}

      <div className='d-flex flex-wrap'>
        {skills&&(filteredSkills.map(trait => (
          <TraitListItem trait={trait} char={chars.filter(char => char.trait === trait.slug)}
          blueEffects={blueEffects} />
        )))}
      </div>
    </Container>
  )
  
}

export default TraitsList;