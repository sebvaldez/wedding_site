import React from 'react';
import styled from "styled-components";
import { faUser, faUsers } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "@xstate/react";
import Greeting from '../../Greeting';
import Card from "../../common/Card";

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const UserMultiAttendance = ({ actor, send }) => {
  const { lastName } = useSelector(actor, state => state.context);

  const handleSubmit = (event) => send({ type: event });

  return (
    <div>
      <Greeting firstName={'Valdez'} lastName={'Family'} />
      <CardContainer>
        <Card onClick={() => handleSubmit('USER_CHECK_IN')}>
          <Card.Title>Self Check in</Card.Title>
          <Card.Icon icon={faUser} />
        </Card>
        <Card onClick={() => handleSubmit('USER_GROUP_CHECK_IN')}>
          <Card.Title>Group Check in</Card.Title>
          <Card.Icon icon={faUsers} />
        </Card>
      </CardContainer>
    </div>
  );
};
