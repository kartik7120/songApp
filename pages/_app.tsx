import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';
import type { AppType } from 'next/app';
import { trpc } from '../utils/trpc';
import { rtlCache } from '../rtl-cache';
import { useState } from 'react';
import Navbar from '@/components/Navbar';

const MyApp: AppType = ({ Component, pageProps }) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        // emotionCache={rtlCache}
        theme={{
          colorScheme: "dark",
          // dir: "rtl",
        }}
      >
        <Navbar />
        <Component {...pageProps} />
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export default trpc.withTRPC(MyApp);
// <div dir='ltr'>
{/* </div> */ }