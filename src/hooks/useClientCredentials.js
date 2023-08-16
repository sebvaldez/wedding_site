import { useContext } from 'react'
import ApiContext from '../contexts/ApiContext';

export function useClientCredentials() {
  const context = useContext(ApiContext);

  if (context === undefined) {
    throw Error('useClientCredentials must be used within a ApiProvider')
  }

  return context;
};
