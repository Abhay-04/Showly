import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Browse from "./components/Browse.jsx";

import Error from "./components/Error.jsx";
import Trending from "./components/Trending.jsx";
import Popular from "./components/Popular.jsx";
import Movies from "./components/Movies.jsx";
import Tvshows from "./components/Tvshows.jsx";
import Peoples from "./components/Peoples.jsx";
import { Provider } from "react-redux";
import appStore from "./store/appStore.jsx";



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
  },
  {
    path: "/browse",
    element: <Browse />,
    children: [
      {
        path: "/browse",
        element: <Trending />,
      },
      {
        path: "/browse/popular",
        element: <Popular />,
      },
      {
        path: "/browse/movies",
        element: <Movies />,
      },
      {
        path: "/browse/tvshows",
        element: <Tvshows />,
      },
      {
        path: "/browse/peoples",
        element: <Peoples />,
      },
    ],
    errorElement: <Error />,
  },
]);



createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={appStore}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
