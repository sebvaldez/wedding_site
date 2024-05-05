import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PARAMS_NONE = 'PARAMS_NONE';
const PARAMS_GROUP_ID = 'PARAMS_GROUP_ID';
const PARAMS_USER_ID = 'PARAMS_USER_ID';

export const CheckParams = ({ send }) => {
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const userId = queryParams.get('userId');
    const groupId = queryParams.get('groupId');


    if (groupId) {
      send({ type: PARAMS_GROUP_ID, groupId, userId  });
    } else if (userId) {
      send({ type: PARAMS_USER_ID, userId });
    } else {
      send({ type: PARAMS_NONE });
    }

  }, [location, send])

  return null
};
