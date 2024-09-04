import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Helmet} from "react-helmet";
import {Container, Table} from 'react-bootstrap';
import EffectTxt from '../Effect/EffectTxt';
import EffectTagTitle from '../Effect/EffectTagTitle';
function EffectsList() {
  const [effectTags, setEffectTags] = useState([])

  useEffect (() => {
    axios({method: 'post',url: "https://sa-east-1.aws.data.mongodb-api.com/app/data-wzzmwsl/endpoint/data/v1/action/find",
      data: {"collection":"effect_tags","database":"soc","dataSource":"Sword"}
    }).then(res => {
      setEffectTags(res.data.documents)
    }).catch(err => console.warn(err));

  }, [])

  return (
    <Container className='new-container'>
      <Helmet>
        <title>Effects List - SoC Wiki</title>
        <meta name="description" content="Sword of Convallaria All Skill Effects, Buff, Debuff explained" />
      </Helmet>
      <div className='d-flex flex-wrap'>
        <Table striped bordered hover variant="dark">
          <tbody>
            {effectTags&&(effectTags.map(effect => (
              <tr>
                <td><EffectTagTitle text={effect.title} color={effect.color} /></td>
                <td><EffectTxt text={effect.txt} /></td>
              </tr>
            )))}
          </tbody>
        </Table>
      </div>
    </Container>
  )
  
}

export default EffectsList;