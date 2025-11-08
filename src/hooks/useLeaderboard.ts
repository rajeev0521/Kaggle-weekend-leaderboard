import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';

export const useLeaderboard = () => {
  return useQuery({
    queryKey: ['leaderboard'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('points', { ascending: false });

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};
