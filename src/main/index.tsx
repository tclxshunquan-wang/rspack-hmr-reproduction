import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

const AppPage = () => {
  const MyLibrary = (window as any).MyLibrary.AppPage;

  return (
    <div>
      Hello, Rspack!
      <MyLibrary />
    </div>
  );
};

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <StrictMode>
    <AppPage />
  </StrictMode>
);
