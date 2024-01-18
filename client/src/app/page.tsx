'use client';

import MoexSearch from '@/components/ui/StocksSearch/MoexSearch';
import { MoexSearchHandler } from '@/components/ui/StocksSearch/types';
import Box from '@mui/material/Box';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { getSecurityTypeFromMoexSecType } from '@/utils/helpers';
import { SecurityType } from '@contracts/index';

export default function Home() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/api/auth/signin?callbackUrl=/');
    },
  });

  const router = useRouter();

  // const { data: stocksOptions, refetch } = useQuery<
  //   IMoexSearchResults,
  //   AxiosError,
  //   MoexSearchAutocompleteOption[],
  //   [string, string]
  // >({
  //   queryKey: ['search', debouncedValue],
  //   queryFn: ({ queryKey }) => moexService.search(queryKey[1]),
  //   enabled: false,
  //   select: data => {
  //     return data.securities.data.map(
  //       (sec, index) =>
  //         ({
  //           board: sec[14],
  //           group: sec[13],
  //           jsxKey: `${sec[0]} ${sec[1]} ${index}`,
  //           name: sec[4],
  //           shortName: sec[2],
  //           ticker: sec[1],
  //           type: sec[12],
  //         }) satisfies MoexSearchAutocompleteOption,
  //     );
  //   },
  // });

  if (!session?.user) return;

  const changeHandler: MoexSearchHandler = async (e, value, reason) => {
    console.log(value);
    const type = getSecurityTypeFromMoexSecType(value.type);
    const url = type === SecurityType.SHARE ? 'shares' : 'bonds';
    router.push(`/${url}/moex/${value.ticker}`);
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
      <MoexSearch onChange={changeHandler} />
    </Box>
  );
}
