import { CookiesProvider } from 'react-cookie';
import { QueryClient, QueryClientProvider } from 'react-query';
import './App.css';
import Router from './shared/Router';
import { useEffect } from 'react';
import { initAmplitude } from './util/amplitude';

const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    initAmplitude();
  },[]);
  return (
    <QueryClientProvider client={queryClient}>
      <CookiesProvider>
        <Router />
      </CookiesProvider>
    </QueryClientProvider>
  );
}

export default App;
