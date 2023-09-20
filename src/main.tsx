// import '@ee/shared-ui/css';

import { enableReactComponents } from "@legendapp/state/config/enableReactComponents";
import { enableReactUse } from '@legendapp/state/config/enableReactUse';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import '@unocss/reset/tailwind.css';
import { ReactNode, Suspense, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, useLocation, useRoutes } from 'react-router-dom';
import 'uno.css';
// import 'virtual:unocss-devtools';
// import '~/_app/styles/app.css';
// import ErrorBoundary from '~/_shared/components/helper/ErrorBoundary';
import generatedRoutes from '~react-pages';

import './main.css';

enableReactUse() // This adds the use() function to observables
enableReactComponents()

function Loading() {
  // return <Spinner size={20} />;
  return <></>;
}

function AppRoutes() {
  return useRoutes(generatedRoutes);
}

function Routes() {
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    const pageTitle = currentPath.substring(currentPath.lastIndexOf('/') + 1);
    document.title = pageTitle || 'Default Title';
  }, [location]);

  return (
    // <ErrorBoundary key={location.pathname} name="Route">
    <Suspense fallback={<Loading />}>
      <AppRoutes />
    </Suspense>
    // </ErrorBoundary>
  );
}

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

function Layout({ children, className = '' }: LayoutProps) {
  return (
    <div className="flex w-screen h-screen overflow-hidden">
      {/* <aside className="w-[50px] flex-none bg-gradient-to-b from-gray-900 to-gray-800" /> */}
      <main className="w-full h-full bg-gradient-to-r from-[#e7eee3] to-[#e9dcf1]">
        {/* linear-gradient(45deg, #e7eee3, #e9dcf1)  */}
        {children}
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes />
      </Layout>
    </Router>
  );
}

const container = document.querySelector('#root');

if (container !== null) {
  const root = createRoot(container);
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
        cacheTime: 1000 * 60 * 60 * 24,
        staleTime: Number.POSITIVE_INFINITY,
      },
    },
  });

  const persister = createSyncStoragePersister({
    storage: window.localStorage,
  });
  //
  // const trpcClient = trpc.createClient({
  // 	links: [httpBatchLink({ url: 'http://localhost:4001/api' })],
  // });

  root.render(
    <>
      {/* <trpc.Provider client={trpcClient} queryClient={queryClient}> */}
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{ persister }}
      >
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </PersistQueryClientProvider>
      {/* </trpc.Provider> */}
    </>
  );
}

// ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
// 	<React.StrictMode>
// 		<div>--</div>
// 		<TextToSpeech text="Skynet is a fictional artificial neural network-based conscious group mind and artificial general superintelligence system that serves as the antagonistic force of the Terminator franchise. In the first film, it is stated that Skynet was created by Cyberdyne Systems for SAC-NORAD." />
// 	</React.StrictMode>,
// );
