import React, {useState,useEffect} from 'react';
import axios from 'axios';
import TraitListItem from '../Skills/TraitListItem';

function GetTraitDoc({slug, blueEffects, chars, boss}) {
  const [trait, setTrait] = useState()
  useEffect(() => {
    axios({method: 'post',url: "https://sa-east-1.aws.data.mongodb-api.com/app/data-wzzmwsl/endpoint/data/v1/action/findOne",
      data: {"collection":"traits","database":"soc","dataSource":"Sword",
        "filter": {
          "slug": slug
        }
      }
    }).then(res => {
      setTrait(res.data.document)
    }).catch(err => console.warn(err));
  }, [slug]);

  if (trait) {
    return (
      <TraitListItem trait={trait} blueEffects={blueEffects} char={chars} boss={boss} />
    );
  }
}

export default GetTraitDoc;