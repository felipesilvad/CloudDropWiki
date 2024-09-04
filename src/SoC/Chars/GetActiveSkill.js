import React, {useState,useEffect} from 'react';
import axios from 'axios';
import SkillListItem from '../Skills/SkillListItem';

function GetActiveSkill({slug, blueEffects, chars, w100}) {
  const [skill, setSkill] = useState()
  useEffect(() => {
    axios({method: 'post',url: "https://sa-east-1.aws.data.mongodb-api.com/app/data-wzzmwsl/endpoint/data/v1/action/findOne",
      data: {"collection":"skills","database":"soc","dataSource":"Sword", 
        "filter": {
          "slug": slug
        }}
    }).then(res => {
      setSkill(res.data.document)
    }).catch(err => console.warn(err));
  }, [slug]);

  if (skill) {
    return (
      <SkillListItem skill={skill} blueEffects={blueEffects} chars={chars} w100={w100} />
    );
  }
}

export default GetActiveSkill;