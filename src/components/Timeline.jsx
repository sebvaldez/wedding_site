import React from 'react';
import styled from 'styled-components';
import { animated, useSpring } from 'react-spring';
import { useInView } from 'react-intersection-observer';

const TimelineContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 30px;
    width: calc(55vw);
    margin-bottom: 6rem;
    justify-content: center;
    padding: 20px;
    @media (min-width: 601px) {
        grid-template-columns: repeat(5, 1fr);
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

const AnimatedEventItem = animated(EventItem);

const AnimatedTimelineItem = ({ event, time }) => {
  const [inViewRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const animationProps = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0px)' : 'translateY(30px)',
    delay: 100,
  });

  return (
    <AnimatedEventItem style={animationProps} ref={inViewRef}>
      <Event>{event}</Event>
      <Time>{time}</Time>
    </AnimatedEventItem>
  );
}

const Timeline = () => {
  const events = [
    { event: 'Arrival', time: '4:00 PM' },
    { event: 'Ceremony', time: '4:30 PM' },
    { event: 'Cocktail Hour', time: '5:00 PM' },
    { event: 'Find Seating', time: '6:00 PM' },
    { event: 'First Dance', time: '6:05 PM' },
    { event: 'Dinner', time: '6:15 PM' },
    { event: 'Toasts', time: '7:15 PM' },
    { event: 'Dancing', time: '7:30 PM' },
    { event: 'Last Dance', time: '9:55 PM' },
    { event: 'Departure', time: '10:00 PM' },

  ];

  return (
    <TimelineContainer>
      {events.map((e, index) => (
        <AnimatedTimelineItem key={index} event={e.event} time={e.time} />
      ))}
    </TimelineContainer>
  );
}

export default Timeline;
