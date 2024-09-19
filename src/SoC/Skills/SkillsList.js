import React, { useState, useEffect, useMemo} from 'react';
import Mongo from '../../mango'
import {Helmet} from "react-helmet";
import {Container,Row,Col} from 'react-bootstrap';
import SkillListItem from './SkillListItem';
import Select from 'react-select';
import { FaSearch } from "react-icons/fa";

function SkillsList() {
  const [skills, setSkills] = useState([])
  const [chars, setChars] = useState([])
  const [factions, setFactions] = useState([])
  const [effectTags, setEffectTags] = useState([])
  const [focused, setFocused] = React.useState(false);
  const onFocus = () => setFocused(!focused);
  const onBlur = () => setFocused(false);

  useEffect (() => {
    Mongo.find('skills', {limit: 30})
    .then(res => {
      setSkills(res.data.documents)
    }, function(err) {console.log(err);})
    Mongo.find('effect_tags')
    .then(res => {
      setEffectTags(res.data.documents)
    }, function(err) {console.log(err);})

    Mongo.find('chars')
    .then(res => {
      setChars(res.data.documents)
    }, function(err) {console.log(err);})

    Mongo.find('factions')
    .then(res => {
      setFactions(res.data.documents)
    }, function(err) {console.log(err);})
  }, [])

  const [selectedEffectTypes, setSelectedEffectTypes] = useState('any');
  const [selectedStatsTags, setSelectedStatsTags] = useState([]);
  const [selectedEffectTags, setSelectedEffectTags] = useState([]);
  const [selectedFactions, setSelectedFactions] = useState('none');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSearchTerm, setActiveSearchTerm] = useState('');

  const handleEffectTypes = (value) => {
    setSelectedEffectTypes(value)
    Mongo.find('skills', {
      filter: {
        "effect_type": value,
        "slug": { $nin: skills.map(skill => skill.slug) }
      }
    })
    .then(res => {
      setSkills([...skills, ...res.data.documents])
    }, function(err) {console.log(err);})
  }

  const handleStatsTags = (value) => {
    setSelectedStatsTags(value)
    Mongo.find('skills', {
      filter: {
        $and: value.map(effectTag => ({"effect": {$regex : effectTag.replaceAll('|','\\|')}})),
        "slug": { $nin: skills.map(skill => skill.slug) }
      }
    })
    .then(res => {
      setSkills([...skills, ...res.data.documents])
    }, function(err) {console.log(err);})
  }

  const handleEffectTags = (value) => {
    setSelectedEffectTags(value)

    Mongo.find('skills', {
      filter: {
        $and: value.map(effectTag => ({"effect": {$regex : `\\[${effectTag}\]`}})),
        "slug": { $nin: skills.map(skill => skill.slug) }
      }
    })
    .then(res => {
      setSkills([...skills, ...res.data.documents])
    }, function(err) {console.log(err);})
    
  }

  const handleFactions = (value) => {
    setSelectedFactions(value)
    if (value === "any") {
      Mongo.find('skills', {
        filter: {
          $and: factions.map(faction => ({"effect": {$regex : `${faction}`}})),
          "slug": { $nin: skills.map(skill => skill.slug) }
        }
      })
      .then(res => {
        setSkills([...skills, ...res.data.documents])
      }, function(err) {console.log(err);})
    } else if (value === "none") {}
    else {
      Mongo.find('skills', {
        filter: {
          "effect": {$regex : `${value}`},
          "slug": { $nin: skills.map(skill => skill.slug) }
        }
      })
      .then(res => {
        setSkills([...skills, ...res.data.documents])
      }, function(err) {console.log(err);})
    }
  }

  const handleSearch = (value) => {
    setActiveSearchTerm(value)
    Mongo.find('skills', {
      filter: {
        "title": {$regex : value},
        "slug": { $nin: skills.map(skill => skill.slug) }
      }
    })
    .then(res => {
      setSkills([...skills, ...res.data.documents])
    }, function(err) {console.log(err);})
  }
  useEffect (() => {
    if (searchTerm === '') {
      setActiveSearchTerm('')
    }
  }, [searchTerm])


  const effectTypes = useMemo(() => {
    return [ {value: 'any', label: 'Any'},
      {value: "Leader's Aura", label: "Leader's Aura"},
      {value: 'Support', label: 'Support'},
      {value: 'Reaction', label: 'Reaction'},
      {value: 'Passive', label: 'Passive'},
      {value: 'Healing', label: 'Healing'},
      {value: 'Aura', label: 'Aura'},
      {value: 'Basic Attack', label: 'Basic Attack'},
      {value: 'Physical DMG', label: 'Physical DMG'},
      {value: 'Magical DMG', label: 'Magical DMG'},
      {value: 'Piercing DMG', label: 'Piercing DMG'},
      {value: 'Mixed DMG', label: 'Mixed DMG'},
      {value: 'Debuff', label: 'Debuff'},
      {value: 'Decision', label: 'Decision'},
      {value: 'Gear Skill', label: 'Gear Skill'},
    ];
  }, []);

  const statsTags = useMemo(() => {
    return [
      {value: 'DMG Reduction', label: 'DMG Reduction'},
      {value: '|dwn|DMG', label: '▼DMG'},
      {value: '|dwn|ATK', label: '▼ATK'},
      {value: '|dwn|P.ATK', label: '▼P.ATK'},
      {value: '|dwn|M.ATK', label: '▼M.ATK'},
      {value: '|dwn|DEF', label: '▼DEF'},
      {value: '|dwn|M.DEF', label: '▼M.DEF'},
      {value: '|dwn|P.DEF', label: '▼P.DEF'},
      {value: '|dwn|SPD', label: '▼SPD'},
      {value: '|dwn|Move', label: '▼Move'},
      {value: '|dwn|Healing Received', label: '▼Healing Received'},
      {value: '|up|DMG', label: '▲DMG'},
      {value: '|up|ATK', label: '▲ATK'},
      {value: '|up|P.ATK', label: '▲P.ATK'},
      {value: '|up|M.ATK', label: '▲M.ATK'},
      {value: '|up|DEF', label: '▲DEF'},
      {value: '|up|P.DEF', label: '▲P.DEF'},
      {value: '|up|M.DEF', label: '▲M.DEF'},
      {value: '|up|SPD', label: '▲SPD'},
      {value: '|up|Move', label: '▲Move'},
      {value: '|up|Crit', label: '▲Crit'},
      {value: '|up|Crit DMG', label: '▲Crit DMG'},
      {value: '|up|Healing', label: '▲Healing'},
    ];
  }, []);
  
  const effectTagOptions = useMemo(() => {
    return effectTags.filter(tag => !tag.title.includes("|")).map(tag => ({ value: tag.title, label: tag.title }));
  }, [effectTags]);

  const factionOptions = useMemo(() => {
    return [{ value: 'none', label: 'None' }, { value: 'any', label: 'Any' }, 
      ...factions.map(faction => ({ value: faction.title, label: faction.title }))];
  }, [factions]);

  const filteredSkills = skills
    .filter(skill => selectedEffectTypes==="any" || !selectedEffectTypes || selectedEffectTypes === skill.effect_type)
    .filter(skill => selectedStatsTags.length === 0 || selectedStatsTags.every(tag => skill.effect.includes(tag)))
    .filter(skill => selectedEffectTags.length === 0 || selectedEffectTags.every(tag => skill.effect.includes(`[${tag}]`)))
    .filter(skill => skill.title.toLowerCase().includes(activeSearchTerm.toLowerCase()))
    .filter(skill => {  
      if (selectedFactions === "none") {
        return true;
      } else if (selectedFactions === "any") {
        return factions.some(faction => skill.effect.toLowerCase().includes(faction.title.toLowerCase()));
      } else {
        return skill.effect.toLowerCase().includes(selectedFactions.toLowerCase());
      }
    });

  const customSelectTheme = (theme) => ({
    ...theme,
    borderRadius: "0.25rem",
    zIndex: 9999,
    colors: {
      ...theme.colors,
      primary25: '#424755', // change Background color of options on hover
      primary: '#66F3F5', // change the Background color of the selected option
      neutral0: "#282F38",
      neutral90: "white",
      neutral80: "white",
      neutral70: "white",
      neutral20: "#9e9e9e",
      neutral10: "#4B545C",
    },
  });

  return (
    <Container className='skill-list-container'>
      <Helmet>
        <title>Skills List - SoC Wiki</title>
        <meta name="description" content="Sword of Convallaria All Skills Effects, Characters that Learn, Skill Tree" />
      </Helmet>
      
      <Row className='custom-row'>
        <Col md={2} className='filter-bg py-2'>
          <div className="d-flex align-items-center">
            <input className='dark-input filter-search-input' type="text" placeholder="Search" onBlur={onBlur}
            value={searchTerm} onChange={e => setSearchTerm(e.target.value)} onFocus={onFocus}/>
            <div 
              className={`filter-search-icon-div d-flex align-items-center 
              ${focused&&("filter-search-icon-div-focus")}`}
              onClick={() => handleSearch(searchTerm)}
            >
              <FaSearch className='filter-search-icon' />
            </div>
          </div>
          <div className='mt-2'>
            <label className="filter-label mx-2">Filter Type</label>
            <Select
              options={effectTypes}
              onChange={selectedOption => handleEffectTypes(selectedOption.value)}
              placeholder="Select"
              styles={{menu: provided => ({ ...provided, zIndex: 9999 })}}
              theme={customSelectTheme}
            />
          </div>
          <div>
            <label className="filter-label mx-2">Filter Stats Effects</label>
            <Select
              isMulti
              options={statsTags}
              onChange={selectedOptions =>  handleStatsTags(selectedOptions.map(option => option.value))}
              placeholder="Select"
              styles={{menu: provided => ({ ...provided, zIndex: 9999 })}}
              theme={customSelectTheme}
            />
          </div>
          <div>
            <label className="filter-label mx-2">Filter Other Effects</label>
            <Select
              isMulti
              options={effectTagOptions}
              onChange={selectedOptions =>  handleEffectTags(selectedOptions.map(option => option.value))}
              placeholder="Select"
              styles={{menu: provided => ({ ...provided, zIndex: 9999 })}}
              theme={customSelectTheme}
            />
          </div>
          <div>
            <label className="filter-label mx-2">Filter Faction</label>
            <Select
              options={factionOptions}
              onChange={selectedOptions => handleFactions(selectedOptions.value)}
              placeholder="Select"
              styles={{menu: provided => ({ ...provided, zIndex: 9999 })}}
              theme={customSelectTheme}
            />
          </div>
        </Col>

        <Col md={10}>
          {filteredSkills.length} Results
          <div className='d-flex flex-wrap'>
            {skills&&effectTags&&(filteredSkills.map(skill => (
              <SkillListItem skill={skill} chars={chars} factions={factions}
              blueEffects={[effectTags.filter(effect => effect.color === "blue")]} />
            )))}
          </div>
        </Col>
      </Row>
    </Container>
  )
  
}

export default SkillsList;