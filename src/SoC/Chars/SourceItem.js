import React, {useState,useEffect} from 'react';
import axios from 'axios';

function SourceItem({sourceTitle}) {

  const [source, setSource] = useState()
  useEffect(() => {
    axios({method: 'post',url: "https://sa-east-1.aws.data.mongodb-api.com/app/data-wzzmwsl/endpoint/data/v1/action/findOne",
      data: {"collection":"sources","database":"soc","dataSource":"Sword", 
        "filter": {
          "title": sourceTitle
        }}
    }).then(res => {
      setSource(res.data.document)
    }).catch(err => console.warn(err));
  }, [sourceTitle]);

  if (source) {
    return (
      <a href={source.url} target="_blank" rel="noopener" className="bg-lighter-link m-1">
        {sourceTitle}
      </a>
    );
  }
}

export default SourceItem;