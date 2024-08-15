import React, { useState, useEffect, useRef } from 'react';
import { query, collection, onSnapshot, orderBy} from "firebase/firestore"; 
import db from '../../firebase';
import {Container,Form, Overlay} from 'react-bootstrap';
import CharsListItem from './CharsListItem';
import CharsListItemRow from './CharsListItemRow';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

function CharsList() {
  const [chars, setChars] = useState([])
  const [factions, setFactions] = useState([])
  const windowWidth = useRef(window.innerWidth);

  useEffect (() => {
    onSnapshot(query(collection(db, `/games/soc/chars`), orderBy("role")), (snapshot) => {
      setChars(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
    });
    onSnapshot(query(collection(db, `/games/soc/factions`)), (snapshot) => {
      setFactions(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
    });
  }, [])

  const roleOrder = ['Watcher', 'Destroyer', 'Seeker', 'Defender', 'Breaker'];
  const rarityOrder = ['Legendary', 'Epic', 'Rare', 'Common'];

  const [hideEpic, setHideEpic] = useState(false);
  const [hideRare, setHideRare] = useState(false);
  const [hideCommon, setHideCommon] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFactions, setActiveFactions] = useState([]);
  const [activeRoles, setActiveRoles] = useState('');
  
  const [showFactions, setShowFactions] = useState(false);
  const targetFactions = useRef(null);

  const [showRoles, setShowRoles] = useState(false);
  const targetRoles = useRef(null);

  const toggleFaction = (faction) => {
    setActiveFactions(prevFactions =>
      prevFactions.includes(faction)
        ? prevFactions.filter(f => f !== faction)
        : [...prevFactions, faction]
    );
  };


  const filteredChars = chars
    .filter(char => !hideEpic || char.rarity !== 'Epic')
    .filter(char => !hideRare || char.rarity !== 'Rare')
    .filter(char => !hideCommon || char.rarity !== 'Common')
    .filter(char => char.name.toLowerCase().includes(searchTerm.toLowerCase())) // Filter by search term
    .filter(char => activeFactions.length === 0 || activeFactions.every(faction => char.factions.includes(faction))) // Filter by factions
    .filter(char => !activeRoles || char.role === activeRoles) // Filter by factions
    .sort((a, b) => {
      const roleComparison = roleOrder.indexOf(a.role) - roleOrder.indexOf(b.role);
      if (roleComparison !== 0) {
        return roleComparison;
      }
      return rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity);
    });
  
  
  return (
    <Container className='new-container'>
      {/* MOBILE SIDEBAR */}
      <div className="sidebar">
        <div className='side-bar-filter text-center'>
          <img
            src={(hideEpic)?(require('../assets/img/stage_sr_off.png')):(require('../assets/img/stage_sr_bg.png'))}
            alt="Epic"
            className="sidebar-icon"
            onClick={() => setHideEpic(prevState => !prevState)}
          />
          <label className='side-bar-filter-label'>Hide Epic</label>
        </div>
        <div className='side-bar-filter side-bar-disabled text-center'>
          <img
            src={require('../assets/img/stage_r_off.png')}
            alt="Rare"
            className="sidebar-icon"
            onClick={() => setHideRare(prevState => !prevState)}
          />
          <label className='side-bar-filter-label'>Hide Rare</label>
        </div>
        <div className='side-bar-filter side-bar-disabled text-center'>
          <img
            src={require('../assets/img/stage_n_off.png')}
            alt="Common"
            className="sidebar-icon"
            onClick={() => setHideCommon(prevState => !prevState)}
          />
          <label className='side-bar-filter-label'>Hide Common</label>
        </div>

        <div className='side-bar-filter text-center' ref={targetRoles} onClick={() => setShowRoles(!showRoles)}>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/cdwiki-73e46.appspot.com/o/roles%2FWatcher.png?alt=media"
            alt="Roles"
            className="sidebar-icon"
          />
          {(showRoles)? (
            <IoIosArrowBack />
          ):(
            <IoIosArrowForward />
          )}
          <label className='side-bar-filter-label side-bar-roles'>Roles</label>
        </div>

        <Overlay target={targetRoles.current} show={showRoles} placement="right">
          {({
            placement: _placement,
            arrowProps: _arrowProps,
            show: _showRoles,
            popper: _popper,
            hasDoneInitialMeasure: _hasDoneInitialMeasure,
            ...props
          }) => (
            <div
              {...props}
              style={{
                ...props.style,
              }}
              className='side-bar-popover'
            >
              {roleOrder.map(role => (
                <img
                  key={role}
                  alt={role}
                  src={`https://firebasestorage.googleapis.com/v0/b/cdwiki-73e46.appspot.com/o/roles%2F${role}.png?alt=media&token=472b73a8-a83e-41ec-bcf1-56f7d3c74cad`}
                  style={{
                    width: '30px',
                    marginLeft: '10px',
                    cursor: 'pointer',
                    opacity: activeRoles.includes(role) ? '1' : '0.7',
                  }}
                  onClick={(activeRoles===role)?
                    (() => setActiveRoles('')):
                    (() => setActiveRoles(role))
                  }
                />
              ))}
            </div>
          )}
        </Overlay>
        
        <div className='side-bar-filter text-center' ref={targetFactions} onClick={() => setShowFactions(!showFactions)}>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/cdwiki-73e46.appspot.com/o/faction%2Funittag_player.png?alt=media"
            alt="Factions"
            className="sidebar-icon"
          />
          {(showFactions)? (
            <IoIosArrowBack />
          ):(
            <IoIosArrowForward />
          )}
          <label className='side-bar-filter-label'>Factions</label>
        </div>
        
        <Overlay target={targetFactions.current} show={showFactions} placement="right">
          {({
            placement: _placement,
            arrowProps: _arrowProps,
            show: _showFactions,
            popper: _popper,
            hasDoneInitialMeasure: _hasDoneInitialMeasure,
            ...props
          }) => (
            <div
              {...props}
              style={{
                ...props.style,
              }}
              className='side-bar-popover'
            >
              {factions.map(faction => (
                <img
                  key={faction.slug}
                  src={faction.img}
                  alt={`${faction.slug} Icon`}
                  style={{
                    width: '30px',
                    marginLeft: '10px',
                    cursor: 'pointer',
                    opacity: activeFactions.includes(faction.title) ? '1' : '0.7',
                  }}
                  onClick={() => toggleFaction(faction.title)}
                />
              ))}
            </div>
          )}
        </Overlay>
        
        
      </div>

      <div className='d-flex'>
        <div sm={2} className='filter-div'>
          <div className='d-none d-md-block d-lg-block'>
            
            <div
              className={`side-bar-filter`}
            >
              <Form.Control 
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>

            <div onClick={() => setHideEpic(prevState => !prevState)} className='side-bar-filter px-2'>
              <img
                src={(hideEpic)?(require('../assets/img/stage_sr_off.png')):(require('../assets/img/stage_sr_bg.png'))}
                alt="Epic"
                className="sidebar-icon"
              />
              <label className='mx-2 side-bar-filter-label'>Hide Epic</label>
            </div>
            <div onClick={() => setHideRare(prevState => !prevState)} className='side-bar-filter px-2 side-bar-disabled'>
              <img
                src={require('../assets/img/stage_r_off.png')}
                alt="Rare"
                className="sidebar-icon"
              />
              <label className='mx-2 side-bar-filter-label'>Hide Rare</label>
            </div>
            <div onClick={() => setHideCommon(prevState => !prevState)} className='side-bar-filter px-2 side-bar-disabled'>
              <img
                src={require('../assets/img/stage_n_off.png')}
                alt="Common"
                className="sidebar-icon"
              />
              <label className='mx-2 side-bar-filter-label'>Hide Common</label>
            </div>
            
            <div className='side-bar-filter mx-1'>
              <label className="filter-label mx-2">Filter Role</label>
              <br/>
              {roleOrder.map(role => (
                <img
                  key={role}
                  alt={role}
                  src={`https://firebasestorage.googleapis.com/v0/b/cdwiki-73e46.appspot.com/o/roles%2F${role}.png?alt=media&token=472b73a8-a83e-41ec-bcf1-56f7d3c74cad`}
                  style={{
                    width: '30px',
                    marginLeft: '5px',
                    cursor: 'pointer',
                    opacity: activeRoles.includes(role) ? '1' : '0.6',
                  }}
                  onClick={(activeRoles===role)?
                    (() => setActiveRoles('')):
                    (() => setActiveRoles(role))
                  }
                />
              ))}
            </div>

            <div className='side-bar-filter mx-1'>
              <label className="filter-label mx-2">Filter Factions</label>
              <br/>
              {factions.map(faction => (
                <img
                  key={faction.slug}
                  src={faction.img}
                  alt={`${faction.slug} Icon`}
                  style={{
                    width: '30px',
                    marginLeft: '10px',
                    cursor: 'pointer',
                    opacity: activeFactions.includes(faction.title) ? '1' : '0.7',
                  }}
                  onClick={() => toggleFaction(faction.title)}
                />
              ))}
            </div>
          </div>

        </div>
        
        {(windowWidth.current < 768) ? (
          <div className='char-list-div'>
            {chars&&(filteredChars.map(char => (
              <CharsListItemRow char={char} />
            )))}
          </div>
        ):(
          <div className='char-list-div d-flex flex-wrap'>
            {chars&&(filteredChars.map(char => (
              <CharsListItem char={char} />
            )))}
          </div>
        )}
        
      </div>
    </Container>
  )
  
}

export default CharsList;