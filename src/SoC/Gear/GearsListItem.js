import React from 'react';
import EffectTxt from '../Effect/EffectTxt';
import { Link } from 'react-router-dom';
import Gearicon from './Gearicon';

function GearsListItem({gear, sideMenu}) {
  if (gear) {

    return (
      <div className={`skill-list-item ${sideMenu&&("w-100")}`}>       
        <div className={`skill-detail-bg mx-1`}>
          <div className={`skill-detail-div `}>

            <div className='d-flex justify-content-between'>
              <div className='skill-category-div'>
                <span className={`skill-category`} 
                onClick={() =>  navigator.clipboard.writeText(gear.img)}>
                  {gear.type}
                </span>
              </div>
            </div>
            <Link className="gear-title" to={`/gears/${gear.img}`}>
              <div className='trait-div d-flex align-items-center mx-1'>
                <div className='trait-title d-flex align-items-center'>
                  <Gearicon gear={gear} />
                  <b className='trait-title-txt gear-title'>
                    {gear.title}
                  </b>
                </div>
              </div>
            </Link>
            <div className='mx-2 text-center mb-2'>
              <EffectTxt text={gear.skill}/>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default GearsListItem;