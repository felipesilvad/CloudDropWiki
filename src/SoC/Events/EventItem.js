import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import LazyImage from './LazyImage';

function EventItem({event, side}) {
  const [timeRemaining, setTimeRemaining] = useState({ days: 0, hours: 0 });
  const today = new Date();
  const startDate = new Date(event.startDate);
  const endDate = new Date(event.endDate);

  useEffect(() => {
    if (endDate) {  
      const calculateTimeRemaining = () => {
        const currentTime = new Date();
        const timeDifference = endDate - currentTime; // Difference in milliseconds
  
        if (timeDifference > 0) {
          const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
          const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  
          setTimeRemaining({ days, hours });
        } else {
          setTimeRemaining({ days: 0, hours: 0 });
        }
      };
  
      const timer = setInterval(calculateTimeRemaining, 1000); // Update every second
  
      return () => clearInterval(timer); // Cleanup on unmount
    }
  }, [event]);

  return (
    <Link to={`/events/${event.id}`} className={`event-item ${side&&("w-100")}`}>
      <div className='event-col mt-2 mx-1'>  
        <LazyImage className='event-img' alt={event.id} 
        src={`https://firebasestorage.googleapis.com/v0/b/cdwiki-73e46.appspot.com/o/events%2F${event.id}.jpg?alt=media&token=d4a2187b-bfd6-4633-bb6f-7fc65a49c6ed`} />
        <div className='mx-1 mt-2 d-flex justify-content-center align-items-middle text-center'>
          <h5 className="">{event.title}</h5>
        </div>
        <div className="text-end negative-margin">
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
              Coming: {startDate.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

export default EventItem;