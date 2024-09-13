import React from 'react';
import {Engravings, EngravingStats} from '../Data/data.ts';
import {Container, Image, Table} from 'react-bootstrap';
import {Helmet} from "react-helmet-async";
import EngravingSingle from './EngravingSingle.js';

function EngravingsComponent() {

  return (
    <Container className='new-container'>
      <Helmet>
        <title>Gear Engravings | Sword of Convallaria Wiki</title>
        <meta name="description" content="Gear Engravings and Engraving and Resonance List and Max Stats. Engraving Resonance refers to the passive skill effect resulting from the combination of the two engravings on the weapon and trinket worn by the same character. The following is a list of all the skill effects based on Engraving Resonances:" />
        <link rel="canonical" href={`/engravings`} />
      </Helmet>
      <div className='black-label-div mt-2'>
        <h1 className='h5 py-1'>
          Engraving and Resonance List
        </h1>
      </div>
      {Engravings.map(x => (
        <EngravingSingle x={x} />
      ))}
      <div className='black-label-div mt-2'>
        <h1 className='h5 py-1'>
          Engraving Max Stats Table
        </h1>
      </div>
      <Table striped bordered hover variant="dark">
        <tbody>
          <tr>
            <td></td>
            <td className='text-center'>
              <Image alt={"Wand"} className='engraving-icon'src={require(`../assets/img/engraving_Wand_icon.png`)} />
              <span className='engraving-title d-none d-md-block'>Wand</span>
            </td>
            <td className='text-center'>
              <Image alt={"Sword"} className='engraving-icon'src={require(`../assets/img/engraving_Sword_icon.png`)} />
              <span className='engraving-title d-none d-md-block'>Sword</span>
            </td>
            <td className='text-center'>
              <Image alt={"Pentacle"} className='engraving-icon'src={require(`../assets/img/engraving_Pentacle_icon.png`)} />
              <span className='engraving-title d-none d-md-block'>Pentacle</span>
            </td>
            <td className='text-center'>
              <Image alt={"Cup"} className='engraving-icon'src={require(`../assets/img/engraving_Cup_icon.png`)} />
              <span className='engraving-title d-none d-md-block'>Cup</span>
            </td>
          </tr>
          {EngravingStats.map(stat => (
            <tr>
              <th>{stat.label}</th>
              {stat.values.map(value => (
                <td className='text-center'>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      <br />
    </Container>
  );
}

export default EngravingsComponent;