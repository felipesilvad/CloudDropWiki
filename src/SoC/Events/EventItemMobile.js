import React, {useEffect, useState, lazy, Suspense} from 'react';
import { Link } from 'react-router-dom';
import { dotPulse } from 'ldrs'
import EventLoading from './EventLoading';
const LazyImageEvent = lazy(() => import ('./LazyImage'));

function EventItemMobile({event, side, i}) {
  const [timeRemaining, setTimeRemaining] = useState({ days: 0, hours: 0 });
  const today = new Date();
  const startDate = new Date(event?(event.startDate):(today));
  const endDate = new Date(event?(event.endDate):(today));
  dotPulse.register()

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
    <Link key={i} to={event&&(`/events/${event.id}`)} className={`event-item ${side&&("w-100")}`}>
      <div className='event-col mt-2 mx-1 d-flex'>
        <div className='w-50'>
          <Suspense fallback={<EventLoading />}>
            <LazyImageEvent alt={`event-${i}`} i={i}
            publicID={`/events/${event.id}`} width={200} id={event.id} />
          </Suspense>
        </div>
        <div className='w-50'>
          <div className='d-flex justify-content-end'>
            <div className={`news-tag-mobile ${event.type}-tag`}>{event.type}</div>
          </div>
          <div className='mx-2'>
            {event?(
              <h6 className="event-title-mobile">{event&&(event.title)}</h6>
            ):(
              <div className='my-2'>
                <l-dot-pulse
                  size="43"
                  speed="1.3" 
                  color="white"
                ></l-dot-pulse>
              </div>
            )}
          </div>
          {event&&(
            <div className="d-flex align-items-center justify-content-end">
              {(startDate < today)?(
                (timeRemaining.days===0&&timeRemaining.hours>0)?(
                  <span className="event-item-time event-item-time-ending mx-2">
                    {timeRemaining.hours}H left
                  </span>
                ):(
                  (timeRemaining.days+timeRemaining.hours===0)?(
                    <span className="event-item-time event-item-time-over mx-2">
                      OVER
                    </span>
                  ):(
                    <span className="event-item-time mx-2">
                      {timeRemaining.days}D {timeRemaining.hours}H left
                    </span>
                  )
                )
              ):(
                <span className="event-item-time event-item-time-coming mx-2">
                  Coming: {startDate.addHours(4).toLocaleString()}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export default EventItemMobile;