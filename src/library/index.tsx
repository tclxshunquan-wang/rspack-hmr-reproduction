import { lazy, Suspense } from 'react';

export const AppPage = () => {
  const Chunk = lazy(() => import('./Chunk'));

  return (
    <div>
      Hello, Library
      <Suspense fallback={<div>Loading...</div>}>
        <Chunk />
      </Suspense>
    </div>
  );
};
