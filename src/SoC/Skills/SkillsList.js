import React, { useState, useEffect, useMemo } from 'react';
import { query, collection, onSnapshot, limit} from "firebase/firestore"; 
import db from '../../firebase';
import {Helmet} from "react-helmet";
import {Container,Form,Row,Col} from 'react-bootstrap';
import SkillListItem from './SkillListItem';
import Select from 'react-select';

function SkillsList() {
  const [skills, setSkills] = useState([])
  const [chars, setChars] = useState([])
  const [effectTags, setEffectTags] = useState([])
  const [searchChanged, setSearchChanged] = useState(false)
    
  useEffect (() => {
    onSnapshot(query(collection(db, `/games/soc/skills`), limit(30)), (snapshot) => {
      setSkills(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
    });
    onSnapshot(query(collection(db, `/games/soc/effect_tags`)), (snapshot) => {
      setEffectTags(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
    });
    onSnapshot(query(collection(db, `/games/soc/chars`)), (snapshot) => {
      setChars(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
    });
  }, [])

  const [selectedEffectTypes, setSelectedEffectTypes] = useState('any');
  const [selectedEffectTags, setSelectedEffectTags] = useState([]);
  const [selectedFactions, setSelectedFactions] = useState('none');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect (() => {
    if (searchTerm !== '' || selectedEffectTags.length>0 || selectedEffectTypes!=='any' || selectedFactions!=='none')
      if (!searchChanged) {
        onSnapshot(query(collection(db, `/games/soc/skills`)), (snapshot) => {
          setSkills(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
        });
        setSearchChanged(true)
      }
  }, [selectedEffectTypes, selectedEffectTags, searchTerm, selectedFactions])


  const effectTypes = useMemo(() => {
    const types = skills.map(skill => skill.effect_type);
    const uniqueTypes = [...new Set(types)];
    return [{ value: 'any', label: 'Any' }, ...uniqueTypes.map(type => ({ value: type, label: type }))];
  }, [skills]);

  const effectTagOptions = useMemo(() => {
    return effectTags.map(tag => ({ value: tag.slug, label: tag.title }));
  }, [effectTags]);
  const factions = useMemo(() => {
    return ["Aggression","Alacrity","Discipline","Drifter","Fortitude",
      "Iria","Papal States","Sword of Convallaria","The Union", "Vlder"]
  }, []);
  const factionOptions = useMemo(() => {
    return [{ value: 'none', label: 'None' }, { value: 'any', label: 'Any' }, 
      ...factions.map(faction => ({ value: faction, label: faction }))];
  }, [factions]);

  const filteredSkills = skills
    .filter(skill => selectedEffectTypes==="any" || !selectedEffectTypes || selectedEffectTypes === skill.effect_type)
    .filter(skill => selectedEffectTags.length === 0 || selectedEffectTags.every(tag => skill.effect.includes(`[${tag}]`)))
    .filter(skill => skill.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(skill => {  
      if (selectedFactions === "none") {
        return true;
      } else if (selectedFactions === "any") {
        return factions.some(faction => skill.effect.toLowerCase().includes(faction.toLowerCase()));
      } else {
        return skill.effect.toLowerCase().includes(selectedFactions.toLowerCase());
      }
    });
  return (
    <Container className='new-container'>
      <Helmet>
        <title>Skills List - SoC Wiki</title>
        <meta name="description" content="Sword of Convallaria All Skills Effects, Characters that Learn, Skill Tree" />
      </Helmet>
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
              placeholder="Select skill types..."
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
          <Col>
            <label>Filter Faction Effect</label>
            <Select
              options={factionOptions}
              onChange={selectedOptions => setSelectedFactions(selectedOptions.value)}
              placeholder="Select faction..."
              menuPortalTarget={document.body} 
              styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
            />
          </Col>
        </Row>
      </div>

      <div className='d-flex flex-wrap'>
        {skills&&effectTags&&(filteredSkills.map(skill => (
          <SkillListItem skill={skill} chars={chars}
          blueEffects={[effectTags.filter(effect => effect.color === "blue")]} />
        )))}
      </div>
    </Container>
  )
  
}

export default SkillsList;