import React, {useState, useEffect} from 'react';
import { onSnapshot, query, collection, where} from 'firebase/firestore';
import db from '../../firebase';
import CharsListItemRow from '../Chars/CharsListItemRow';

function EventFeaturedChar({charTitle}) {
  const [char, setChar] = useState()
  
  useEffect(() => {
    onSnapshot(query(collection(db, `/games/soc/chars`), where("name", "==", charTitle)), (snapshot) => {
      setChar(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
    });
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