import { useAuth0 } from '@auth0/auth0-react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useAuthenticatedAxios } from './useAuthenticatedAxios';
import backend from '../api/backend';

// Fetch a specific member
export const useGetMember = (id) => {
  const axiosPrivate = useAuthenticatedAxios();

  const getMember = async ({ queryKey }) => {
    const [, id] = queryKey;
    const { data } = await axiosPrivate.get('/wedding/members', {
      params: { id }
    });
    return data[0]; // return the only member from the results
  };

  return useQuery(['member', id], getMember, {
    enabled: !!id, // we might disable this because user came from email lookup
    refetchOnWindowFocus: false, // Don't refetch on window focus
  });
};

export const useGetMemberByEmail = (email, shouldQuery) => {
  const axiosPrivate = useAuthenticatedAxios();  // handles injecting the token

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

    // Define a key for your localStorage data
    const localStorageKey = 'membersData';

  return useQuery(["members"], async () => {
    const claims = await getIdTokenClaims();
    const idToken = claims.__raw;

    const { data } = await backend.get('/wedding/members', {
      headers: { 'Authorization': `Bearer ${idToken}` }
    });

    return data; // returning only the data
  },
  {
    // Load initial data from localStorage if available
    initialData: () => {
      const storedData = localStorage.getItem(localStorageKey);
      return storedData ? JSON.parse(storedData) : undefined;
    },
    // Save fetched data to localStorage
    onSuccess: (data) => {
      localStorage.setItem(localStorageKey, JSON.stringify(data));
    },
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
    cacheTime: 24 * 60 * 60 * 1000,
  });
};

// BULK UPDATE members
export const useBulkUpdateMembers = () => {
  const axiosPrivate = useAuthenticatedAxios(); // handles injecting the token

  const bulkUpdateMembers = async (membersToUpdate) => {
    // Format payload: Flatten if nested array, wrap in array if object
    let formattedMembersToUpdate = [];

    if (Array.isArray(membersToUpdate)) {
      // Flatten nested arrays
      formattedMembersToUpdate = membersToUpdate.flat();
    } else if (typeof membersToUpdate === 'object') {
      // Wrap object in an array
      formattedMembersToUpdate = [membersToUpdate];
    } else {
      console.error('Invalid input for membersToUpdate');
      return;
    }

    // Ensure all items are objects
    if (formattedMembersToUpdate.some(member => typeof member !== 'object')) {
      console.error('All items in membersToUpdate must be objects');
      return;
    }

    console.log('bulk update members hook called with: ', JSON.stringify(formattedMembersToUpdate, null, 2));

    // Proceed with the PATCH request
    const { data } = await axiosPrivate.patch('/wedding/members/bulk', formattedMembersToUpdate);
    return data;
  };

  return useMutation(bulkUpdateMembers, {
    // onSuccess: (_, __, ___, queryClient) => {
    //   queryClient.invalidateQueries('members');
    // },
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

