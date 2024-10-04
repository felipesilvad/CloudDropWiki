import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import {Helmet} from "react-helmet";
import {Container,Overlay} from 'react-bootstrap';
import EventLoading from '../Events/EventLoading';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import Mongo from '../../mango'
import CharListBg from '../assets/img/row-bg-Legendary.webp'

const CharsListItem = lazy(() => import ('./CharsListItem'));
const CharsListItemRow = lazy(() => import ('./CharsListItemRow'));

function CharsList() {
  const [chars, setChars] = useState([])
  const [factions, setFactions] = useState([])
  const windowWidth = useRef(window.innerWidth);

  useEffect (() => {
    Mongo.find('chars', {sort: {"name":1}, "projection": {
      "name": 1,"slug": 1, "role": 1, "rarity": 1, "factions": 1
    }})
    .then(res => {
      setChars(res.data.documents)
    }).catch(err => console.warn(err));

    Mongo.find('factions')
    .then(res => {
      setFactions(res.data.documents)
    }, function(err) {console.log(err);})

    const preloadImage = new Image();
    preloadImage.src = CharListBg;
  }, [])

  const roleOrder = ['Watcher', 'Destroyer', 'Seeker', 'Defender', 'Breaker'];
  const rarityOrder = ['Legendary', 'Epic', 'Rare', 'Common'];

  const [searchTerm, setSearchTerm] = useState('');
  const [activeFactions, setActiveFactions] = useState([]);
  const [activeRoles, setActiveRoles] = useState('');
  const [activeRarities, setActiveRarities] = useState('');
  
  const [showFactions, setShowFactions] = useState(false);
  const targetFactions = useRef(null);

  const [showRoles, setShowRoles] = useState(false);
  const targetRoles = useRef(null);

  const [showRarities, setShowRarities] = useState(false);
  const targetRarities = useRef(null);

  const toggleFaction = (faction) => {
    setActiveFactions(prevFactions =>
      prevFactions.includes(faction)
        ? prevFactions.filter(f => f !== faction)
        : [...prevFactions, faction]
    );
  };

  const handleShowFactions = () => {
    setShowFactions(!showFactions)
    setShowRoles(false)
    setShowRarities(false)
  }

  const handleShowRoles = () => {
    setShowRoles(!showRoles)
    setShowFactions(false)
    setShowRarities(false)
  }

  const handleShowRarities = () => {
    setShowRarities(!showRarities)
    setShowFactions(false)
    setShowRoles(false)
  }


  const filteredChars = chars
    .filter(char => char.name.toLowerCase().includes(searchTerm.toLowerCase())) // Filter by search term
    .filter(char => activeFactions.length === 0 || activeFactions.every(faction => char.factions.includes(faction))) // Filter by factions
    .filter(char => !activeRoles || char.role === activeRoles) // Filter by factions
    .filter(char => !activeRarities || char.rarity === activeRarities) // Filter by factions
    .sort((a, b) => {
      const rarityComparison = rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity);
      if (rarityComparison !== 0) {
        return rarityComparison;
      }
      return roleOrder.indexOf(a.role) - roleOrder.indexOf(b.role);
    });
  
  console.log(activeRarities)
  return (
    <Container className='new-container'>
      <Helmet>
        <title>Characters List - Sword of Convallaria Wiki</title>
        <meta name="description" content="SoC Global Characters List, All Rarities: Epic, Rare, Common units" />
        <link rel="canonical" href='/chars' />
      </Helmet>

      {/* MOBILE SIDEBAR */}
      <div className="sidebar">
        <div className='side-bar-filter text-center' ref={targetRarities} onClick={() => handleShowRarities()}>
          <img
            src={require('../assets/img/stage_Epic.png')}
            alt="Roles"
            className="sidebar-icon"
          />
          {(showRarities)? (
            <IoIosArrowBack />
          ):(
            <IoIosArrowForward />
          )}
          <label className='side-bar-filter-label side-bar-roles'>Rarity</label>
        </div>

        <Overlay target={targetRarities.current} show={showRarities} placement="right">
          {({
            placement: _placement,
            arrowProps: _arrowProps,
            show: _showRarities,
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
              {rarityOrder.map(rarity => (
                <img
                  key={rarity}
                  alt={rarity}
                  src={require(`../assets/img/stage_${rarity}.png`)}
                  style={{
                    width: '30px',
                    marginLeft: '5px',
                    cursor: 'pointer',
                    opacity: activeRarities.includes(rarity) ? '1' : '0.6',
                  }}
                  onClick={(activeRarities===rarity)?
                    (() => setActiveRarities('')):
                    (() => setActiveRarities(rarity))
                  }
                />
              ))}
            </div>
          )}
        </Overlay>

        <div className='side-bar-filter text-center' ref={targetRoles} onClick={() => handleShowRoles()}>
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

        <div className='side-bar-filter text-center' ref={targetFactions} onClick={() => handleShowFactions()}>
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
            
            <div className={`m-1`}>
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className='dark-input my-1'
              />
            </div>

            <div className='side-bar-filter mx-1'>
              <label className="filter-label mx-2">Filter Rarity</label>
              <hr/>
              {rarityOrder.map(rarity => (
                <img
                  key={rarity}
                  alt={rarity}
                  src={require(`../assets/img/stage_${rarity}.png`)}
                  style={{
                    width: '30px',
                    marginLeft: '5px',
                    cursor: 'pointer',
                    opacity: activeRarities.includes(rarity) ? '1' : '0.6',
                  }}
                  onClick={(activeRarities===rarity)?
                    (() => setActiveRarities('')):
                    (() => setActiveRarities(rarity))
                  }
                />
              ))}
            </div>

            
            <div className='side-bar-filter mx-1'>
              <label className="filter-label mx-2">Filter Role</label>
              <hr/>
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
              <hr/>
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
            {filteredChars.map((char, i) => (
              <Suspense fallback={<EventLoading height="4rem" key={i} />}>
                <CharsListItemRow bgImg={CharListBg} char={char} />
              </Suspense>
            ))}
          </div>
        ):(
          <div className='char-list-div d-flex justify-content-around flex-wrap'>
            {filteredChars.map((char, i) => (
              <Suspense fallback={<EventLoading height="4rem" key={i} />}>
                <CharsListItem char={char} />
              </Suspense>
            ))}
          </div>
        )}
        
      </div>
    </Container>
  )
  
}

export default CharsList;