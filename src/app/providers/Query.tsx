import { queryClient } from '@shared/lib';
import { QueryClientProvider } from '@tanstack/react-query';
import type { PropsWithChildren } from 'react';

export const QueryProvider = ({
  children,
}: PropsWithChildren): React.JSX.Element => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
