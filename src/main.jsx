
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
import Saved from "./components/Saved.jsx";
import GptPage from "./components/GptPage.jsx";
import BrowseContent from "./components/BrowseContent.jsx";

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
        path: "/browse/trending",
        element: <Trending />,
      },
      {
        path: "/browse",
        element: <BrowseContent />,
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
      {
        path: "/browse/saved",
        element: <Saved />,
      },
      {
        path: "/browse/gpt",
        element: <GptPage />,
      },
    ],
    errorElement: <Error />,
  },
  { path: "/gpt", element: <div>GPT Page</div> },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={appStore}>
    <RouterProvider router={router} />
  </Provider>
);
