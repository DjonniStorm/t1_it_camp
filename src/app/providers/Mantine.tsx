import { MantineProvider } from '@mantine/core';
import type { PropsWithChildren } from 'react';

export const ThemeProvider = ({
  children,
}: PropsWithChildren): React.JSX.Element => {
  return <MantineProvider>{children}</MantineProvider>;
};
