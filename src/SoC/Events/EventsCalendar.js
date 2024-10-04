import React, { useEffect, useRef, lazy, Suspense } from 'react';
import { format, addDays, subDays, differenceInDays, isSameDay } from 'date-fns';
import LoadingScreen from '../LoadingScreen';
const EventsCalendarRow = lazy(() => import ('./EventsCalendarRow'));

const EventsCalendar = ({ events }) => {
  const today = new Date();
  const startDate = subDays(today, 14);
  const endDate = addDays(today, 14);

  Date.prototype.addHours = function(h) {
    this.setTime(this.getTime() + (h*60*60*1000));
    return this;
  }

  // Gera todos os dias do calendário
  const generateCalendarDays = (start, end) => {
    const days = [];
    let currentDay = start;
    while (currentDay <= end) {
      days.push(currentDay);
      currentDay = addDays(currentDay, 1);
    }
    return days;
  };

  const calendarDays = generateCalendarDays(startDate, endDate);
  const totalDays = calendarDays.length;

  // Referências para o scroll
  const calendarRef = useRef(null);
  const todayRef = useRef(null);

  useEffect(() => {
    // Centraliza o dia atual no calendário ao carregar o componente
    if (todayRef.current && calendarRef.current) {
      const calendarWidth = calendarRef.current.offsetWidth;
      const todayPosition = todayRef.current.offsetLeft;
      // Centraliza o scroll com base na posição do dia atual
      calendarRef.current.scrollLeft = todayPosition - calendarWidth / 2;
    }
    const handleWheelScroll = (e) => {
      if (calendarRef.current) {
        e.preventDefault(); // Impede o scroll vertical
        calendarRef.current.scrollLeft += e.deltaY; // Scroll horizontal com base no deltaY
      }
    };

    const calendarElement = calendarRef.current;
    if (calendarElement) {
      calendarElement.addEventListener('wheel', handleWheelScroll);
    }

    return () => {
      if (calendarElement) {
        calendarElement.removeEventListener('wheel', handleWheelScroll);
      }
    };
  }, []);

  // Função para calcular a posição inicial e a largura do evento no calendário
  const calculateEventPosition = (eventStart, eventEnd) => {
    const eventStartDate = eventStart < startDate ? startDate : eventStart;
    const eventEndDate = eventEnd > endDate ? endDate : eventEnd;

    const startIdx = differenceInDays(eventStartDate, startDate);
    const duration = differenceInDays(eventEndDate, eventStartDate) + 1; // Contar o dia final também

    return { startIdx, duration };
  };
  

  return (
    <div className="events-calendar">
      <div className="calendar-scrollable" ref={calendarRef}>
        {/* Cabeçalho com os dias */}
        <div 
          className="calendar-header" 
          style={{ gridTemplateColumns: `repeat(${totalDays}, minmax(80px, 1fr))` }}
        >
          {calendarDays.map((day, index) => (
            <div
              key={index}
              ref={isSameDay(day, today) ? todayRef : null} // Define ref no dia de hoje
              className={`calendar-day ${isSameDay(day, today) ? 'today' : ''}`}
              width="auto" height="auto" 
            >
              {format(day, 'MMM dd')}
            </div>
          ))}
        </div>

        {/* Eventos alinhados aos dias */}
        <div 
          className="calendar-events" 
          style={{ gridTemplateColumns: `repeat(${totalDays}, minmax(80px, 1fr))` }}
        >
          {events.map((event, index) => {
            const { startIdx, duration } = calculateEventPosition(
              new Date(event.startDate).addHours(26),
              new Date(event.endDate).addHours(16)
            );
            return (
              <Suspense fallback={<LoadingScreen />}>
                <EventsCalendarRow index={index} event={event} startIdx={startIdx} duration={duration} />
              </Suspense>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EventsCalendar;
