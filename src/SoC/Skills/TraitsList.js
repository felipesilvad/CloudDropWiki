import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Helmet} from "react-helmet";
import {Container} from 'react-bootstrap';
import TraitListItem from './TraitListItem';

function TraitsList() {
  const [traits, setTraits] = useState([])
  const [blueEffects, setBlueEffects] = useState([])
  const [chars, setChars] = useState([])

  useEffect (() => {
    axios({method: 'post',url: "https://sa-east-1.aws.data.mongodb-api.com/app/data-wzzmwsl/endpoint/data/v1/action/find",
      data: {"collection":"traits","database":"soc","dataSource":"Sword"}
    }).then(res => {
      setTraits(res.data.documents)
    }).catch(err => console.warn(err));

    axios({method: 'post',url: "https://sa-east-1.aws.data.mongodb-api.com/app/data-wzzmwsl/endpoint/data/v1/action/find",
      data: {"collection":"chars","database":"soc","dataSource":"Sword"}
    }).then(res => {
      setChars(res.data.documents)
    }).catch(err => console.warn(err));

    axios({method: 'post',url: "https://sa-east-1.aws.data.mongodb-api.com/app/data-wzzmwsl/endpoint/data/v1/action/find",
      data: {"collection":"chars","database":"soc","dataSource":"Sword", 
        "filter": {
          "color": "blue"
        }}
    }).then(res => {
      setBlueEffects(res.data.documents)
    }).catch(err => console.warn(err));
  }, [])

  const filteredTraits = traits
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
        {traits&&(filteredTraits.map(trait => (
          <TraitListItem trait={trait} char={chars.filter(char => char.trait === trait.slug)}
          blueEffects={blueEffects} />
        )))}
      </div>
    </Container>
  )
  
}

export default TraitsList;