import { QueryClient, QueryClientProvider ,  } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { FC, ReactNode } from "react";

const queryClient = new QueryClient({});

const QueryProvider: FC<{ children: ReactNode }> = (props) => {
  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
      <ReactQueryDevtools/>
    </QueryClientProvider>
  );
};

export default QueryProvider;
