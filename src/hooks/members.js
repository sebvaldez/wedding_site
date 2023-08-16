import { useAuth0 } from '@auth0/auth0-react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useAuthenticatedAxios } from './useAuthenticatedAxios';
import backend from '../api/backend';

// Fetch a specific member
export const useGetMember = (id) => {
  const { getIdTokenClaims } = useAuth0();

  const getMember = async ({ queryKey }) => {
    // _key,
    const [, id] = queryKey;
    const claims = await getIdTokenClaims();
    const idToken = claims.__raw;

    const { data } = await backend.get('/wedding/members', {
      headers: { 'Authorization': `Bearer ${idToken}` },
      params: { id }
    });
    return data[0]; // return the only member from the results
  };

  return useQuery(['member', id], getMember, {
    enabled: !!id,  // Ensure that id is provided
  });
};

export const useGetMemberByEmail = (email, shouldQuery) => {
  const axiosPrivate = useAuthenticatedAxios();  // Use the custom hook

  const getMemberByEmail = async ({ queryKey }) => {
    const [, email] = queryKey;
    const { data } = await axiosPrivate.get('/wedding/members', {
      params: { email }  // use email as the query parameter
    });
    return data[0]; // return the only member from the results
  };

  return useQuery(['memberByEmail', email], getMemberByEmail, {
    enabled: !!email && shouldQuery, // Ensure that email is provided and lookup has been clicked
    retry: false, // Don't retry the query upon failure
  });
};


// Fetch all members
export const useGetAllMembers = () => {
  const { getIdTokenClaims } = useAuth0();

  return useQuery(["members"], async () => {
    const claims = await getIdTokenClaims();
    const idToken = claims.__raw;

    const { data } = await backend.get('/wedding/members', {
      headers: { 'Authorization': `Bearer ${idToken}` }
    });

    return data; // returning only the data
  });
};

// Todo - get below working

// CREATE member
export const useCreateMember = () => {
  return useMutation({
    mutationFn: (newMember) => backend.post('/members', newMember),
    onSuccess: (_, __, ___, queryClient) => {
      queryClient.invalidateQueries('members');
    },
  });
};

// BULK CREATE members
export const useBulkCreateMembers = () => {
  return useMutation({
    mutationFn: (newMembers) => backend.post('/members/bulk', newMembers),
    onSuccess: (_, __, ___, queryClient) => {
      queryClient.invalidateQueries('members');
    },
  });
};

// DELETE member
export const useDeleteMember = () => {
  return useMutation({
    mutationFn: (memberId) => backend.delete(`/members/${memberId}`),
    onSuccess: (_, __, ___, queryClient) => {
      queryClient.invalidateQueries('members');
    },
  });
};

// UPDATE member
export const useUpdateMember = () => {
  return useMutation({
    mutationFn: ({ memberId, updatedData }) => backend.put(`/members/${memberId}`, updatedData),
    onSuccess: (_, __, ___, queryClient) => {
      queryClient.invalidateQueries('members');
    },
  });
};

// BULK UPDATE members
export const useBulkUpdateMembers = () => {
  return useMutation({
    mutationFn: (membersToUpdate) => backend.put('/members/bulk', membersToUpdate),
    onSuccess: (_, __, ___, queryClient) => {
      queryClient.invalidateQueries('members');
    },
  });
};
