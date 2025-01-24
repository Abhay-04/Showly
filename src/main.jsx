import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./store/appStore.jsx";
import Loading from "./components/Loading.jsx";

// const App = lazy(() => import("./App.jsx"));
const Browse = lazy(() => import("./components/Browse.jsx"));
const BrowseContent = lazy(() => import("./components/BrowseContent.jsx"));
const Error = lazy(() => import("./components/Error.jsx"));
const Trending = lazy(() => import("./components/Trending.jsx"));
const Popular = lazy(() => import("./components/Popular.jsx"));
const Movies = lazy(() => import("./components/Movies.jsx"));
const Tvshows = lazy(() => import("./components/Tvshows.jsx"));
const Person = lazy(() => import("./components/Person.jsx"));
const Saved = lazy(() => import("./components/Saved.jsx"));
const GptPage = lazy(() => import("./components/GptPage.jsx"));
const MovieDetails = lazy(() => import("./components/MovieDetails.jsx"));
const TvDetails = lazy(() => import("./components/TvDetails.jsx"));
const PersonDetails = lazy(() => import("./components/PersonDetails.jsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loading />}>
        <App />
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback={<Loading />}>
        <Error />
      </Suspense>
    ),
  },
  {
    path: "/browse",
    element: (
      <Suspense fallback={<Loading />}>
        <Browse />
      </Suspense>
    ),
    children: [
      {
        path: "/browse/trending",
        element: (
          <Suspense fallback={<Loading />}>
            <Trending />
          </Suspense>
        ),
      },
      {
        path: "/browse",
        element: (
          <Suspense fallback={<Loading />}>
            <BrowseContent />
          </Suspense>
        ),
      },
      {
        path: "/browse/popular",
        element: (
          <Suspense fallback={<Loading />}>
            <Popular />
          </Suspense>
        ),
      },
      {
        path: "/browse/movies",
        element: (
          <Suspense fallback={<Loading />}>
            <Movies />
          </Suspense>
        ),
      },
      {
        path: "/browse/tvshows",
        element: (
          <Suspense fallback={<Loading />}>
            <Tvshows />
          </Suspense>
        ),
      },
      {
        path: "/browse/peoples",
        element: (
          <Suspense fallback={<Loading />}>
            <Person />
          </Suspense>
        ),
      },
      {
        path: "/browse/saved",
        element: (
          <Suspense fallback={<Loading />}>
            <Saved />
          </Suspense>
        ),
      },
      {
        path: "/browse/gpt",
        element: (
          <Suspense fallback={<Loading />}>
            <GptPage />
          </Suspense>
        ),
      },
    ],
    errorElement: (
      <Suspense fallback={<Loading />}>
        <Error />
      </Suspense>
    ),
  },
  {
    path: "/movie/:id",
    element: (
      <Suspense fallback={<Loading />}>
        <MovieDetails />
      </Suspense>
    ),
  },
  {
    path: "/tv/:id",
    element: (
      <Suspense fallback={<Loading />}>
        <TvDetails />
      </Suspense>
    ),
  },
  {
    path: "/person/:id",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <PersonDetails />
      </Suspense>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={appStore}>
    <RouterProvider router={router} />
  </Provider>
);
