import React, {useEffect, useState, lazy, Suspense} from 'react';
import { Link } from 'react-router-dom';
import {IKImage} from 'imagekitio-react';


function EventCurrent({event}) {
  const [timeRemaining, setTimeRemaining] = useState({ days: 0, hours: 0 });
  const today = new Date();
  const startDate = new Date(event?(event.startDate):(today));
  const endDate = new Date(event?(event.endDate):(today));

  Date.prototype.addHours = function(h) {
    this.setTime(this.getTime() + (h*60*60*1000));
    return this;
  }

  useEffect(() => {
    if (endDate) {  
      const currentTime = new Date();
      const timeDifference = endDate - currentTime; // Difference in milliseconds
      if (timeDifference > 0) {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))+4;
        setTimeRemaining({ days, hours });
      } else {
        setTimeRemaining({ days: 0, hours: 0 });
      }
    }
  }, [event]);

  return (
    <Link key={event.id} to={event&&(`/events/${event.id}`)} className={`d-flex align-items-center bg-lighter my-1`}>
      <IKImage
        urlEndpoint={'https://ik.imagekit.io/clouddrop/soc/'}
        path={`events/${event.id}b.png`}
        alt={event.id}
        transformation={[{
          height: 40
        }]}
        width="auto"
        height="40"
      />
      <h6 className='mx-1 event-item-time mt-2'>
        {(startDate>today)?(
          <>
            {startDate.addHours(4).toLocaleString()}
          </>
        ):(
          <>
            {timeRemaining.days}D {timeRemaining.hours}H left
          </>
        )}
      </h6>
    </Link>
  );
}

export default EventCurrent;