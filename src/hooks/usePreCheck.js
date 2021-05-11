import { useQuery } from 'react-query';
import { preCheckUser } from '../api/userAPI';

const usePreCheck = (history) =>
  useQuery('preCheck', () => preCheckUser(history));

export default usePreCheck;
