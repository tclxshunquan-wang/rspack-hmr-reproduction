import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";




const AppPage = () => {


  useEffect(() => {
    const moduleA = (module as any);

if (moduleA.hot) {
  moduleA.hot.accept("B/page", () => {
    console.log('1212')
  });
}

  }, []);
  let MyLibrary;
  if ((window as any)["hyperse-hub/dashboard/library"]) {
    MyLibrary = (window as any)["hyperse-hub/dashboard/library"].AppPage;
  } else {
    MyLibrary = (window as any)["MyLibrary"].AppPage;
  }

  return (
    <div>
      Hello, Rspack!111111111
      <MyLibrary />
    </div>
  );
};

createRoot(document.getElementById("app") as HTMLDivElement).render(
  <StrictMode>
    <AppPage />
  </StrictMode>
);
