import React, {useState,useEffect} from 'react';
import { doc, onSnapshot} from 'firebase/firestore';
import db from '../../firebase';
import TarotsListItem from '../Gear/TarotsListItem';

function GetTarotItem({id}) {
  const [tarot, setTarot] = useState()
  useEffect(() => {
    onSnapshot(doc(db, "games/soc/tarots/", id), (doc) => {
      setTarot(doc.data());
    });
  }, [id]);

  if (tarot) {
    return (
      <TarotsListItem tarot={tarot} sideMenu={true} compact={true} />
    );
  }
}

export default GetTarotItem;