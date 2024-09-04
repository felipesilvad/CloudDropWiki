import React, {useState,useEffect} from 'react';
import axios from 'axios';
import TarotsListItem from '../Gear/TarotsListItem';

function GetTarotItem({id}) {
  const [tarot, setTarot] = useState()
  useEffect(() => {
    axios({method: 'post',url: "https://sa-east-1.aws.data.mongodb-api.com/app/data-wzzmwsl/endpoint/data/v1/action/findOne",
      data: {"collection":"tarots","database":"soc","dataSource":"Sword", 
      "filter": {
          "slug": id
        }
      }
    }).then(res => {
      setTarot(res.data.document)
    }).catch(err => console.warn(err));
  }, [id]);

  if (tarot) {
    return (
      <TarotsListItem tarot={tarot} sideMenu={true} compact={true} />
    );
  }
}

export default GetTarotItem;