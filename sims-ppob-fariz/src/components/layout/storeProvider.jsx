'use client';

import { Provider } from 'react-redux';
import store from '@/lib/store';
import dynamic from 'next/dynamic';

const BrowserRouter = dynamic(() => import('react-router-dom').then(mod => mod.BrowserRouter), { ssr: false });

export default function StoreProvider ({
  children,
}) {
  return <Provider store={store}>
    <BrowserRouter>
      {children}</BrowserRouter></Provider>;
}
