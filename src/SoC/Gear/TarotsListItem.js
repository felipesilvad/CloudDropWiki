import React from 'react';
import { Image } from 'react-bootstrap';
import EffectTxt from '../Effect/EffectTxt';

function TarotsListItem({tarot, sideMenu, compact}) {
  const tarot_img = `https://firebasestorage.googleapis.com/v0/b/cdwiki-73e46.appspot.com/o/tarot%2F${tarot.img}.png?alt=media`
  const gem = require('../assets/img/icon_charm_ssr.png')
  if (tarot) {

    return (
      <div className={`skill-list-item ${sideMenu&&("w-100")}`}>       
        <div className={`skill-detail-bg mx-1`}>
          <div className={`skill-detail-div text-center`}>

            <div className='trait-div d-flex align-items-center mx-1'>
              <div className='trait-title d-flex align-items-center'>
                <div className="trait-img-container m-1"
                onClick={() =>  navigator.clipboard.writeText(tarot.slug)}>
                  <Image src={tarot_img} alt='tarot_img'  className="trait-img" />
                </div>
                <b className='tarot-title-txt'>
                  {tarot.title}
                </b>
              </div>
            </div>

            <div className='mx-2 text-center'>
              <EffectTxt text={tarot.effect}/>
            </div>

            <div className='tarot-gem-div d-flex align-items-center'>
              <Image className='mx-2 tarot-gem' src={gem} />
              <b className='tarot-gem-txt d-flex align-items-center'>
                Hidden Effect at Lv.60
              </b>
            </div>
            <div className='mx-2 text-center'>
              <EffectTxt text={tarot.effect_new}/>
            </div>

            {!compact&&(
              <div className='gear-desc mt-2'>
                <div className='black-label-div gear-desc'>
                  Description
                </div>
                <div className='mx-2 text-center bg-lighter'>
                  {tarot.desc}
                </div>
              </div>
            )}

            <div className='black-label-div gear-desc mt-2'>
              Source
            </div>
            <div className='mx-2 text-center bg-lighter mb-2'>
              {tarot.source}
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default TarotsListItem;