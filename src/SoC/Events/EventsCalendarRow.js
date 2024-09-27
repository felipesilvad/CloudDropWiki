import React from 'react';
import {IKImage} from 'imagekitio-react';

const EventsCalendarRow = ({index, event, startIdx, duration}) => {
  // const [imageExists, setImageExists] = useState(null);

  return (
    <div
      key={index}
      className="event-row"
      style={{
        gridColumn: `${startIdx + 1} / span ${duration}`,
        backgroundColor: event.color
      }}
    >
      <div className="event-content">
        <IKImage
          urlEndpoint={'https://ik.imagekit.io/clouddrop/soc/'}
          path={`events/${event.id}b.png`}
          alt={event.id}
          className='banner-img'
          transformation={[{
            height: 80
          }]}
          width="auto"
          height="50"
        />
        {/* <ImageBootstrap className='banner-img' loading='lazy' alt={event.id} width={"auto"} height={"auto"}
        src={`https://ik.imagekit.io/clouddrop/tr:h-50/soc/events/${event.id}b.png`} /> */}
        {event.title}
      </div>
    </div>
  );
};

export default EventsCalendarRow;
