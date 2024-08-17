import React, { useEffect, useState } from 'react';

const EventCalendar = ({ events }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    const now = new Date();
    const start = new Date(now);
    start.setMonth(now.getMonth() - 1);
    start.setDate(1);

    const end = new Date(now);
    end.setMonth(now.getMonth() + 1);
    end.setDate(0);

    setStartDate(start);
    setEndDate(end);
  }, []);

  const getEventStyle = (event) => {
    const eventStart = new Date(event.startDate);
    const eventEnd = new Date(event.endDate);

    const totalDays = Math.round((endDate - startDate) / (1000 * 60 * 60 * 24));
    const eventStartDay = Math.max(0, Math.round((eventStart - startDate) / (1000 * 60 * 60 * 24)));
    const eventDuration = Math.min(totalDays, Math.round((eventEnd - eventStart) / (1000 * 60 * 60 * 24)));

    return {
      marginLeft: `${(eventStartDay / totalDays) * 100}%`,
      width: `${(eventDuration / totalDays) * 100}%`,
    };
  };

  if (!startDate || !endDate) return null;

  // Get unique rows needed
  const uniqueRows = Array.from(new Set(events.map(event => event.row)));

  return (
    <div className="event-calendar">
      <div className="timeline">
        <div className="days">
          {Array.from({ length: Math.round((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1 }, (_, i) => {
            const date = new Date(startDate);
            date.setDate(date.getDate() + i);
            return (
              <div key={i} className="day">
                {`${date.getDate()} ${date.toLocaleString('default', { month: 'short' })}`}
              </div>
            );
          })}
        </div>
        {uniqueRows.map((row, rowIndex) => (
          <div key={rowIndex} className="event-row">
            {events
              .filter(event => event.row === row)
              .map((event, index) => (
                <div key={index} className="event" style={getEventStyle(event)}>
                  {event.name}
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCalendar;
