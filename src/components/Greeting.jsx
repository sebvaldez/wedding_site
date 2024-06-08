import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';

const StyledGreeting = styled(animated.div)`
    font-size: 2.8rem;          // Large header
    font-weight: 300;         // Thin font weight
    text-align: center;
`;

const GuestName = styled(animated.div)`
    font-size: 2.5rem;
    font-weight: 300;
    text-align: center;
    padding: 0 0 1.2rem 0;
`;

const Greeting = ({ firstName, lastName, groupName }) => {
    const helloProps = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
        config: { duration: 1000 }  // Adjust as needed.
    });

    const nameProps = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
        config: { duration: 1000 },  // Adjust as needed.
        delay: 1000   // Delays the animation for the guest name by 1 second after "Hello,"
    });

    return (
        <>
            <StyledGreeting style={helloProps}>Hello,</StyledGreeting>
            { groupName
                ? <GuestName style={nameProps}>{groupName}</GuestName>
                : <GuestName style={nameProps}>{`${firstName} ${lastName}`}</GuestName>
            }
        </>
    );
}

export default Greeting;
