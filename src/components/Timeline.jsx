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
    { event: 'Guests Arrival', time: '3:30' },
    { event: 'Guests Seated', time: '3:55' },
    { event: 'Ceremony Processional', time: '4:00' },
    { event: 'Cocktail Hour', time: '4:30' },
    { event: 'First Dance', time: '5:30' },
    { event: 'Dinner Toast', time: '5:35' },
    { event: 'Service Begins', time: '5:40' },
    { event: 'Guest Toasts', time: '6:15' },
    { event: 'Group Photo Opt', time: '6:40' },
    { event: 'Dessert & Dancing', time: '6:50' },
    { event: 'Last Call', time: '9:30' },
    { event: 'Last Dance', time: '9:40' },
    { event: 'Grand Exit', time: '9:45' },
    { event: 'Guests Departed', time: '10:00' }
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
