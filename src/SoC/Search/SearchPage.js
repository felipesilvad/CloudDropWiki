import React, {useState, useEffect, useRef} from 'react';
import { query, collection, onSnapshot, orderBy, where, getDocs} from "firebase/firestore"; 
import db from '../../firebase';
import { useLocation } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import CharsListItemRow from '../Chars/CharsListItemRow';
import CharsListItem from '../Chars/CharsListItem';
import TraitListItem from '../Skills/TraitListItem';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchPage = () => {
  const queryValue = useQuery();
  const searchTerm = queryValue.get('q');
  const windowWidth = useRef(window.innerWidth);
  const [blueEffects, setBlueEffects] = useState([])
  const [chars, setChars] = useState([])

  const [traitsBySq, setTraitsBySq] = useState([])
  const [traitsByTitle, setTraitsByTitle] = useState([])

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  useEffect (() => {
    onSnapshot(
      query(collection(db, `/games/soc/chars`)), (snapshot) => {
        setChars(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
      },
      query(collection(db, `games/soc/effect_tags`), where("color","==","blue")), (snapshot) => {
        setBlueEffects(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
      },
      query(collection(db, `/games/soc/traits`), where('sq', 'array-contains', searchTerm.toLowerCase())), (snapshot) => {
        setTraitsBySq(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
      },
      query(collection(db, `/games/soc/traits`), where("title", ">=", capitalizeFirstLetter(searchTerm)), where("yourField", "<=", capitalizeFirstLetter(searchTerm) + "\uf8ff")), (snapshot) => {
        setTraitsByTitle(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
      },
    );
    // const traitRef = collection(db, "/games/soc/traits");
    // const traitsBySqQ = query(traitRef, where('sq', 'array-contains', searchTerm.toLowerCase()));
    // setTraitsBySq(getDocs(traitsBySqQ))
    // const q = query(traitRef, );

    // onSnapshot();
    // onSnapshot(query(collection(db, `/games/soc/traits`), where('sq', 'array-contains', searchTerm.toLowerCase())), (snapshot) => {
    //   setTraitsBySq(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
    // });
  }, [searchTerm])

  const filteredChars = chars
    .filter(char => char.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <Container>
      <h3>Search Results for "{searchTerm}"</h3>
      {filteredChars&&(
        <div className='skill-detail-bg trait-title px-2 '>Characters</div>
      )}
      {(windowWidth.current < 768) ? (
        <div className='char-list-div'>
          {filteredChars&&(filteredChars.map(char => (
            <CharsListItemRow char={char} />
          )))}
        </div>
      ):(
        <div className='d-flex flex-wrap'>
          {filteredChars&&(filteredChars.map(char => (
            <CharsListItem char={char} />
          )))}
        </div>
      )}

      {((traitsBySq.length>0)||(traitsByTitle.length>0))&&(
        <>
          <div className='skill-detail-bg trait-title px-2 '>Traits</div>
          <div className='d-flex flex-wrap'>
            {traitsBySq.map(trait => (
              <TraitListItem trait={trait} char={chars.filter(char => char.trait === trait.slug)}
              blueEffects={blueEffects} />
            ))}
          </div>
        </>
      )}
    </Container>
  );
};

export default SearchPage;
