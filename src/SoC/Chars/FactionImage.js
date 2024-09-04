import React, {useState,useEffect} from 'react';
import { Image } from 'react-bootstrap';
import slugify from 'react-slugify';
import axios from 'axios';
import { Tooltip } from 'react-tooltip'
import CharFace from './CharFace';

function FactionImage({slug,chars}) {
  const [faction, setFaction] = useState()

  useEffect(() => {
    axios({method: 'post',url: "https://sa-east-1.aws.data.mongodb-api.com/app/data-wzzmwsl/endpoint/data/v1/action/findOne",
      data: {"collection":"factions","database":"soc","dataSource":"Sword", 
        "filter": {
          "title": slug
        }}
    }).then(res => {
      setFaction(res.data.document)
    }).catch(err => console.warn(err));
  }, [slug]);

  if (faction) {
    return (
      <div key={slugify(slug, { delimiter: '_' })}>
        <Tooltip className='tooltip' anchorSelect={`#${slugify(slug, { delimiter: '_' })}`} place="bottom-end">
          <b>{faction.title}</b>
          <div className='d-flex flex-wrap'>
            {chars&&(chars.filter(x => x.factions.includes(slug)).map(char => (
              <CharFace char={char} />              
            )))}
          </div>
        </Tooltip>
        <Image className='faction-icon' id={slugify(slug, { delimiter: '_' })} src={faction.img} />
      </div>
    );
  }
}

export default FactionImage;