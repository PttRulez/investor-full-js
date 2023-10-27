'use client';

import { useState } from 'react';
import investorService from '@/axios/investor';
import DealsTable from '@/components/DealsTable';
import PortfolioTable from '../components/PortfolioTable/PortfolioTable';
import AddNewButton from '@/components/ui/AddNewButton';
import { emptyDeal } from '@/constants/empties';
import { Dialog, Tab } from '@mui/material';
import DealForm from '../components/DealForm';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { TabContext, TabList, TabPanel } from '@mui/lab';

export default function Portfolio({ params }: { params: { id: string } }) {
  const [dealToEdit, setDealToEdit] = useState<Deal | null>(null);
  const [activeTab, setActiveTab] = useState<string>('portfolio');

  const client = useQueryClient();
  const { data: portfolio } = useQuery({
    queryKey: ['portfolio', params.id],
    queryFn: async () => {
      const portfolio = await investorService.portfolio.getPortfolio(params.id);
      return portfolio;
    },
    onSuccess: () => {
      client.invalidateQueries(['prices']);
    },
    // initialData: initPortfolio,
  });
  console.log('portfolio', portfolio);
  return (
    <>
      <TabContext value={activeTab}>
        <TabList onChange={(_, v) => setActiveTab(v)}>
          <Tab label="Портфолио" value="portfolio"></Tab>
          <Tab label="Сделки" value="deals"></Tab>
        </TabList>
        <TabPanel value="portfolio">{portfolio && <PortfolioTable portfolio={portfolio} />}</TabPanel>
        <TabPanel value="deals">
          <DealsTable deals={portfolio?.deals ?? []} />
        </TabPanel>
      </TabContext>

      <AddNewButton onClick={() => setDealToEdit({ ...emptyDeal, portfolioId: Number(params.id) })} />
      <Dialog open={!!dealToEdit} onClose={() => setDealToEdit(null)}>
        {dealToEdit && <DealForm deal={dealToEdit} afterSuccessfulSubmit={() => setDealToEdit(null)} />}
      </Dialog>
    </>
  );
}

// export const getStaticPaths: GetStaticPaths = async () => {
//   const res = await investorService.portfolio.allPortfolios();
//   const paths = res.data.map((portfolio) => `/portfolios/${portfolio.id}`);
//   return {
//     paths,
//     fallback: true,
//   };
// };

// export const getStaticProps: GetStaticProps = async ({
//   params,
// }: GetStaticPropsContext<ParsedUrlQuery>) => {
//   if (!params) {
//     return {
//       notFound: true,
//     };
//   }

//   const res = await investorService.getPortfolio(params.id as string);
//   if (!res.data.data) {
//     return {
//       notFound: true,
//     };
//   }

//   return {
//     props: {
//       id: params.id,
//       initPortfolio: res.data.data,
//     },
//   };
// };
