'use client';

import MoexSearch from '@/components/ui/StocksSearch/MoexSearch';
import { MoexSearchHandler } from '@/components/ui/StocksSearch/types';
import Box from '@mui/material/Box';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/api/auth/signin?callbackUrl=/');
    },
  });

  if (!session?.user) return;

  const changeHandler: MoexSearchHandler = async (e, value, reason) => {
    console.log('[changeHandler]', value);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <MoexSearch handleChange={changeHandler} />
    </Box>
  );
}
