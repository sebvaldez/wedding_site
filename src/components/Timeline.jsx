import React from 'react';
import styled from 'styled-components';
import { animated, useSpring } from 'react-spring';
import { useInView } from 'react-intersection-observer';

const TimelineContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 25px;
    width: calc(55vw);
    margin-bottom: 6rem;
    justify-content: center;
    padding: 20px;
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
    { event: 'Find Seating', time: '4:00' },
    { event: 'Ceremony Begins', time: '4:30' },
    { event: 'Cocktail Hour', time: '5:00' },
    { event: 'Reception Introductions', time: '6:00' },
    { event: 'Our First Dance', time: '6:05' },
    { event: 'Dinner Begins', time: '6:15' },
    { event: 'Guest Toasts', time: '7:15' },
    { event: 'Time to Party', time: '7:30' },
    { event: 'The Last Dance', time: '9:55' },
    { event: 'Our Departure', time: '10:00' },
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
