import React, {useState} from 'react';
import {IKImage} from 'imagekitio-react';
import { Image } from 'react-bootstrap';
function PicsSelector({chars, selectImage, selectedPic}) {
  // const [loadMorePics, setLoadMorePics] = useState(false)

  return (
    <div className='d-flex flex-wrap justify-content-center'>
      {!!chars && (chars.filter(char=> char.rarity === "Legendary").map(char => (
        <Image
          src={`https://ik.imagekit.io/clouddrop/soc/tr:h-105,w-105,cm-extract,x-69,y-16/chars/${char.slug}_cut.png`}
          alt={`${char.slug}_awaken`} key={`${char.slug}_awaken`}
          transformation={[
            {
              height: 105,  // Height of the cropped area
              width: 105,   // Width of the cropped area
              cropMode: 'extract', // Extracts the area based on width and height
              x: 69,        // X-coordinate from where the cropping starts
              y: 16,       // Y-coordinate from where the cropping starts
            },
          ]}
          width={"105"} height={"105"} 
          onClick={() => selectImage(`https://ik.imagekit.io/clouddrop/soc/tr:h-105,w-105,cm-extract,x-69,y-16/chars/${char.slug}_cut.png`)} 
          className={(selectedPic === `https://ik.imagekit.io/clouddrop/soc/tr:h-105,w-105,cm-extract,x-69,y-16/chars/${char.slug}_cut.png`) ? ('pic-select pic-select-active') : ('pic-select')}
        />
      )))}
      {/* <div className='load-mote-btn text-center p-1' onClick={() => setLoadMorePics(!loadMorePics)}>LOAD MORE</div>
      {loadMorePics&&(
        !!chars && (chars.map(char => (
          <IKImage
            urlEndpoint={'https://ik.imagekit.io/clouddrop/soc/'}
            path={`chars/${char.slug}_face.png`}
            alt={char.slug} key={char.slug}
            transformation={[
              {
                height: 158,  // Height of the cropped area
                width: 158,   // Width of the cropped area
                cropMode: 'extract', // Extracts the area based on width and height
                x: 90,        // X-coordinate from where the cropping starts
                y: 100,       // Y-coordinate from where the cropping starts
              },
            ]}
            width={"158"} height={"158"} 
            onClick={() => selectImage(char.slug)} 
            className={(selectedPic === char.slug) ? ('pic-select pic-select-active') : ('pic-select')}
          />
        )))
      )} */}
    </div>
  )
}
export default PicsSelector;
