import React, {useState, useEffect} from 'react';
import axios from 'axios';
import CharsListItemRow from '../Chars/CharsListItemRow';

function EventFeaturedChar({charTitle}) {
  const [char, setChar] = useState()
  
  useEffect(() => {
    axios({method: 'post',url: "https://sa-east-1.aws.data.mongodb-api.com/app/data-wzzmwsl/endpoint/data/v1/action/find",
      data: {"collection":"chars","database":"soc","dataSource":"Sword", 
        "filter": {
          "name": charTitle
        }}
    }).then(res => {
      setChar(res.data.documents)
    }).catch(err => console.warn(err));
  }, [charTitle]);

  if (char) {
    if (char.length>0) {
      return (
        <div className='event-item'>
          <CharsListItemRow char={char[0]} />
        </div>
      );
    }
  }
}

export default EventFeaturedChar;