import React from 'react';
import styled from 'styled-components';

const TimelineContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
    justify-content: center;
    padding: 20px;
    @media (min-width: 601px) {
        grid-template-columns: repeat(4, 1fr);
    }
`;

const EventItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5px;
`;

const Event = styled.p`
    margin: 0;
    font-weight: bold;
`;

const Time = styled.p`
    margin: 0;
`;

const Timeline = () => {
  return (
    <TimelineContainer>
      <EventItem><Event>Arrival</Event> <Time>4:00 PM</Time></EventItem>
      <EventItem><Event>Ceremony</Event> <Time>4:30 PM</Time></EventItem>
      <EventItem><Event>Cocktail Hour</Event> <Time>5:00 PM</Time></EventItem>
      <EventItem><Event>Find Seating</Event> <Time>6:00 PM</Time></EventItem>
      <EventItem><Event>Introductions</Event> <Time>6:15 PM</Time></EventItem>
      <EventItem><Event>First Dance</Event> <Time>6:20 PM</Time></EventItem>
      <EventItem><Event>Dinner</Event> <Time>6:30 PM</Time></EventItem>
      <EventItem><Event>Toasts</Event> <Time>7:15 PM</Time></EventItem>
      <EventItem><Event>Dancing</Event> <Time>7:45 PM</Time></EventItem>
      <EventItem><Event>Last Call</Event> <Time>9:30 PM</Time></EventItem>
      <EventItem><Event>Send Off Toast</Event> <Time>9:50 PM</Time></EventItem>
      <EventItem><Event>Departure</Event> <Time>10:00 PM</Time></EventItem>
    </TimelineContainer>
  );
}

export default Timeline;
