import React from 'react';
import styled from "styled-components";
import { faUser, faUsers } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "@xstate/react";
import { useFetchGroup } from '../../../hooks/members';
import Greeting from '../../Greeting';
import Card from "../../common/Card";
import Loading from "../../common/Loading";

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const UserMultiAttendance = ({ actor, send }) => {
  const { groupId } = useSelector(actor, state => state.context);
  const { data, isLoading, isError } = useFetchGroup(groupId);

  const handleSubmit = (event) => send({ type: event });

  if (isError) return <div>Oops Something went wrong.</div>;

  if (isLoading) {
    return <Loading fullscreen />;
  }

  return (
    <div>
      <Greeting groupName={data.name || 'Party Checkin'} />
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
