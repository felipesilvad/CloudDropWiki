import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import {Helmet} from "react-helmet";
import {Container,Row,Col} from 'react-bootstrap';
import GearsListItem from './GearsListItem';
import Select from 'react-select';

function GearsList() {
  const [gears, setGears] = useState([])
  const [selectedWeaponType, setSelectedWeaponType] = useState('any');
  const [selectedRarity, setSelectedRarity] = useState('any');

  useEffect (() => {
    axios({method: 'post',url: "https://sa-east-1.aws.data.mongodb-api.com/app/data-wzzmwsl/endpoint/data/v1/action/find",
      data: {"collection":"gears","database":"soc","dataSource":"Sword",}
    }).then(res => {
      setGears(res.data.documents)
    }).catch(err => console.warn(err));
  }, [])

  const rarityOrder = ['Legendary', 'Epic', 'Rare', 'Common'];
  const rarityOptions = [{value:'Legendary', label: 'Legendary'}, {value:'Epic', label: 'Epic'}, {value:'Rare', label: 'Rare'}, {value:'Common', label: 'Common'}];

  const gearTypes = useMemo(() => {
    const types = gears.map(gear => gear.type);
    const uniqueTypes = [...new Set(types)];
    return [{ value: 'any', label: 'Any' }, ...uniqueTypes.map(type => ({ value: type, label: type }))];
  }, [gears]);

  const filteredGears = gears
    .filter(gear => selectedWeaponType==="any" || !selectedWeaponType || selectedWeaponType === gear.type)
    .filter(gear => selectedRarity==="any" || !selectedRarity || selectedRarity === gear.rarity)

  return (
    <Container className='new-container'>
      <Helmet>
        <title>Gears List - SoC Wiki</title>
        <meta name="description" content="Sword of Convallaria Equipments List, All Weapons, Armor, Trinkets." />
      </Helmet>
      <Row>
        <Col>
          <label>Filter Gear Type</label>
          <Select
            options={gearTypes}
            onChange={selectedOption => setSelectedWeaponType(selectedOption.value)}
            placeholder="Select skill types..."
            menuPortalTarget={document.body} 
            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
          />
        </Col>
        <Col>
          <label>Filter Rarity</label>
          <Select
            options={rarityOptions}
            onChange={selectedOption => setSelectedRarity(selectedOption.value)}
            placeholder="Select skill types..."
            menuPortalTarget={document.body} 
            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
          />
        </Col>
      </Row>
      <div className='d-flex flex-wrap'>
        {filteredGears.sort((a, b) => {
          const rarityComparison = rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity);
          if (rarityComparison !== 0) {
            return rarityComparison;
          }
        }).map(gear => (
          <GearsListItem gear={gear} />
        ))}
      </div>
    </Container>
  )
  
}

export default GearsList;