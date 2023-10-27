import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Sidebar from '@/components/ui/Sidebar/Sidebar';
import { Box, CssBaseline } from '@mui/material';
import Providers from '@/utils/providers/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Сайт лютых инвесторов',
  description: 'Место где делаются деньги :)',
  icons: ['favicon.ico'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <CssBaseline />
      <Providers>
        <body>
          <Sidebar />
          <Box
            className={inter.className}
            component={'main'}
            sx={{ marginLeft: '240px', minHeight: '100vh', padding: '20px' }}
          >
            {children}
          </Box>
        </body>
      </Providers>
    </html>
  );
}
