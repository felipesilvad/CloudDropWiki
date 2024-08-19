import React, { useState, useEffect, useRef, useMemo } from 'react';
import { query, collection, onSnapshot, limit} from "firebase/firestore"; 
import db from '../../firebase';
import {Container,Form,Row,Col} from 'react-bootstrap';
import SkillListItem from './SkillListItem';
import Select from 'react-select';

function SkillsList() {
  const [skills, setSkills] = useState([])
  const [effectTags, setEffectTags] = useState([])

  useEffect (() => {
    onSnapshot(query(collection(db, `/games/soc/skills`), limit(10)), (snapshot) => {
      setSkills(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
    });
    onSnapshot(query(collection(db, `/games/soc/effect_tags`)), (snapshot) => {
      setEffectTags(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
    });
  }, [])

  const effectTypes = useMemo(() => {
    const types = skills.map(skill => skill.effect_type);
    const uniqueTypes = [...new Set(types)];
    return [{ value: 'any', label: 'Any' }, ...uniqueTypes.map(type => ({ value: type, label: type }))];
  }, [skills]);

  const effectTagOptions = useMemo(() => {
    return effectTags.map(tag => ({ value: tag.slug, label: tag.title }));
  }, [effectTags]);

  const [selectedEffectTypes, setSelectedEffectTypes] = useState('any');
  const [selectedEffectTags, setSelectedEffectTags] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredSkills = skills
    .filter(skill => selectedEffectTypes==="any" || !selectedEffectTypes || selectedEffectTypes === skill.effect_type)
    .filter(skill => selectedEffectTags.length === 0 || selectedEffectTags.every(tag => skill.effect.includes(`[${tag}]`)))
    .filter(skill => skill.title.toLowerCase().includes(searchTerm.toLowerCase())) // Filter by search term

  return (
    <Container className='new-container'>
      <div>
        <div className={`side-bar-filter`}>
          <Form.Control type="text"placeholder="Search"
          value={searchTerm} onChange={e => setSearchTerm(e.target.value)}/>
        </div>
        <Row>
          <Col>
            <label>Filter Skill Type</label>
            <Select
              options={effectTypes}
              onChange={selectedOption => setSelectedEffectTypes(selectedOption.value)}
              placeholder="Select effect types..."
              menuPortalTarget={document.body} 
              styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
            />
          </Col>
          <Col>
            <label>Filter Effects</label>
            <Select
              isMulti
              options={effectTagOptions}
              onChange={selectedOptions => setSelectedEffectTags(selectedOptions.map(option => option.label))}
              placeholder="Select effect tags..."
              menuPortalTarget={document.body} 
              styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
            />
          </Col>
        </Row>
      </div>

      <div className='d-flex justify-content-around flex-wrap'>
        {skills&&effectTags&&(filteredSkills.map(skill => (
          <SkillListItem skill={skill} blueEffects={effectTags.filter(effect => effect.color === "blue")} />
        )))}
      </div>
    </Container>
  )
  
}

export default SkillsList;