import React, {useState,useEffect} from 'react';

import { collection, onSnapshot, query, where} from 'firebase/firestore';
import db from '../../firebase';

function SourceItem({sourceTitle}) {

  const [source, setSource] = useState()
  useEffect(() => {
    if (sourceTitle) {
      onSnapshot(query(collection(db, `sources/`), where("title","==",sourceTitle)), (snapshot) => {
        setSource(snapshot.docs.map(doc => ({...doc.data()})))
      });
    }
  }, [sourceTitle]);

  if (source) {
    if (source[0]) {
      return (
        <a href={source[0].url} target="_blank" rel="noopener" className="bg-lighter-link m-1">
          {sourceTitle}
        </a>
      );
    }
  }
}

export default SourceItem;