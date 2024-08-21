import React, {useState,useEffect} from 'react';
import { doc, onSnapshot} from 'firebase/firestore';
import db from '../../firebase';
import GearsListItem from '../Gear/GearsListItem';

function GetGearItem({id}) {
  const [gear, setGear] = useState()
  useEffect(() => {
    onSnapshot(doc(db, "games/soc/gears/", id), (doc) => {
      setGear(doc.data());
    });
  }, [id]);

  if (gear) {
    return (
      <GearsListItem gear={gear} sideMenu={true} />
    );
  }
}

export default GetGearItem;