import React, { useState, useEffect, useMemo} from 'react';
import axios from 'axios';
import {Helmet} from "react-helmet";
import {Container,Row,Col} from 'react-bootstrap';
import SkillListItem from './SkillListItem';
import Select from 'react-select';
import { FaSearch } from "react-icons/fa";

function SkillsList() {
  const [skills, setSkills] = useState([])
  const [chars, setChars] = useState([])
  const [effectTags, setEffectTags] = useState([])
  const [focused, setFocused] = React.useState(false);
  const onFocus = () => setFocused(!focused);
  const onBlur = () => setFocused(false);

  useEffect (() => {
    axios({method: 'post',url: "https://sa-east-1.aws.data.mongodb-api.com/app/data-wzzmwsl/endpoint/data/v1/action/find",
      data: {"collection":"skills","database":"soc","dataSource":"Sword","limit":30}
    }).then(res => {
      setSkills(res.data.documents)
    }).catch(err => console.warn(err));

    axios({method: 'post',url: "https://sa-east-1.aws.data.mongodb-api.com/app/data-wzzmwsl/endpoint/data/v1/action/find",
      data: {"collection":"effect_tags","database":"soc","dataSource":"Sword"}
    }).then(res => {
      setEffectTags(res.data.documents)
    }).catch(err => console.warn(err));

    axios({method: 'post',url: "https://sa-east-1.aws.data.mongodb-api.com/app/data-wzzmwsl/endpoint/data/v1/action/find",
      data: {"collection":"chars","database":"soc","dataSource":"Sword"}
    }).then(res => {
      setChars(res.data.documents)
    }).catch(err => console.warn(err));
  }, [])

  const [selectedEffectTypes, setSelectedEffectTypes] = useState('any');
  const [selectedStatsTags, setSelectedStatsTags] = useState([]);
  const [selectedEffectTags, setSelectedEffectTags] = useState([]);
  const [selectedFactions, setSelectedFactions] = useState('none');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSearchTerm, setActiveSearchTerm] = useState('');

  const handleEffectTypes = (value) => {
    setSelectedEffectTypes(value)
    axios({method: 'post',url: "https://sa-east-1.aws.data.mongodb-api.com/app/data-wzzmwsl/endpoint/data/v1/action/find",
      data: {"collection":"skills","database":"soc","dataSource":"Sword",
        "filter": {
          "effect_type": value,
          "slug": { $nin: skills.map(skill => skill.slug) }
        }}
    }).then(res => {
      setSkills([...skills, ...res.data.documents])
    }).catch(err => console.warn(err));
  }

  const handleStatsTags = (value) => {
    setSelectedStatsTags(value)
    axios({method: 'post',url: "https://sa-east-1.aws.data.mongodb-api.com/app/data-wzzmwsl/endpoint/data/v1/action/find",
      data: {"collection":"skills","database":"soc","dataSource":"Sword",
        "filter": {
          $and: value.map(effectTag => ({"effect": {$regex : `\\${effectTag}`}})),
          "slug": { $nin: skills.map(skill => skill.slug) }
        }}
    }).then(res => {
      setSkills([...skills, ...res.data.documents])
    }).catch(err => console.warn(err));
  }

  const handleEffectTags = (value) => {
    setSelectedEffectTags(value)
    axios({method: 'post',url: "https://sa-east-1.aws.data.mongodb-api.com/app/data-wzzmwsl/endpoint/data/v1/action/find",
      data: {"collection":"skills","database":"soc","dataSource":"Sword",
        "filter": {
          $and: value.map(effectTag => ({"effect": {$regex : `\\[${effectTag}\]`}})),
          "slug": { $nin: skills.map(skill => skill.slug) }
        }}
    }).then(res => {
      setSkills([...skills, ...res.data.documents])
    }).catch(err => console.warn(err));
  }

  const handleFactions = (value) => {
    setSelectedFactions(value)
    if (value === "any") {
      axios({method: 'post',url: "https://sa-east-1.aws.data.mongodb-api.com/app/data-wzzmwsl/endpoint/data/v1/action/find",
        data: {"collection":"skills","database":"soc","dataSource":"Sword",
          "filter": {
            $and: factions.map(faction => ({"effect": {$regex : `${faction}`}})),
            "slug": { $nin: skills.map(skill => skill.slug) }
          }}
      }).then(res => {
        setSkills([...skills, ...res.data.documents])
      }).catch(err => console.warn(err));
    } else if (value === "none") {}
    else {
      axios({method: 'post',url: "https://sa-east-1.aws.data.mongodb-api.com/app/data-wzzmwsl/endpoint/data/v1/action/find",
        data: {"collection":"skills","database":"soc","dataSource":"Sword",
          "filter": {
            "effect": {$regex : `${value}`},
            "slug": { $nin: skills.map(skill => skill.slug) }
          }}
      }).then(res => {
        setSkills([...skills, ...res.data.documents])
      }).catch(err => console.warn(err));
    }
  }

  const handleSearch = (value) => {
    setActiveSearchTerm(value)
    axios({method: 'post',url: "https://sa-east-1.aws.data.mongodb-api.com/app/data-wzzmwsl/endpoint/data/v1/action/find",
      data: {"collection":"skills","database":"soc","dataSource":"Sword",
        "filter": {
          "title": {$regex : value},
          "slug": { $nin: skills.map(skill => skill.slug) }
        }}
    }).then(res => {
      setSkills([...skills, ...res.data.documents])
    }).catch(err => console.warn(err));
  }
  console.log(skills.map(skill => skill._id))
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
    return [...statsTags, ...effectTags.filter(tag => !tag.title.includes("|")).map(tag => ({ value: tag.title, label: tag.title }))];
  }, [effectTags, statsTags]);
  
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
    .filter(skill => selectedStatsTags.length === 0 || selectedStatsTags.every(tag => skill.effect.includes(tag)))
    .filter(skill => selectedEffectTags.length === 0 || selectedEffectTags.every(tag => skill.effect.includes(`[${tag}]`)))
    .filter(skill => skill.title.toLowerCase().includes(activeSearchTerm.toLowerCase()))
    .filter(skill => {  
      if (selectedFactions === "none") {
        return true;
      } else if (selectedFactions === "any") {
        return factions.some(faction => skill.effect.toLowerCase().includes(faction.toLowerCase()));
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
          {skills.length} Results {selectedStatsTags}
          <div className='d-flex flex-wrap'>
            {skills&&effectTags&&(filteredSkills.map(skill => (
              <SkillListItem skill={skill} chars={chars}
              blueEffects={[effectTags.filter(effect => effect.color === "blue")]} />
            )))}
          </div>
        </Col>
      </Row>
    </Container>
  )
  
}

export default SkillsList;