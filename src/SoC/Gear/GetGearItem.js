import React, {useState,useEffect} from 'react';
import axios from 'axios';
import GearsListItem from '../Gear/GearsListItem';

function GetGearItem({id}) {
  const [gear, setGear] = useState()
  useEffect(() => {
    axios({method: 'post',url: "https://sa-east-1.aws.data.mongodb-api.com/app/data-wzzmwsl/endpoint/data/v1/action/findOne",
      data: {"collection":"gears","database":"soc","dataSource":"Sword", 
      "filter": {
          "img": id
        }
      }
    }).then(res => {
      setGear(res.data.document)
    }).catch(err => console.warn(err));
  }, [id]);

  if (gear) {
    return (
      <GearsListItem gear={gear} sideMenu={true} />
    );
  }
}

export default GetGearItem;