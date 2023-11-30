import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { FC, ReactNode } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60,
    },
  },
  queryCache: new QueryCache({
    onSuccess(data, query) {
      if (typeof query.meta.onSuccess === "function") {
        query.meta.onSuccess(data);
      }
    },
    onError(error, query) {
      if (typeof query.meta.onError === "function") {
        query.meta.onError(error);
      }
    },
  }),
});

const QueryProvider: FC<{ children: ReactNode }> = (props) => {
  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default QueryProvider;
