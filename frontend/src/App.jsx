import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import ViewCreator from "./pages/ViewCreator.jsx";
import ShowCreators from "./pages/ShowCreators.jsx";
import EditCreator from "./pages/EditCreator.jsx";
import AddCreator from "./pages/AddCreator.jsx";

// Optionally import actions if needed
import { action as addAction } from "./pages/AddCreator.jsx";

import { loader as editCreatorLoader } from "./pages/EditCreator.jsx";
import { action as editCreatorAction } from "./pages/EditCreator.jsx";

import { loader as viewAllCreatorsLoader } from "./pages/ShowCreators.jsx"

import { loader as viewCreatorLoader } from "./pages/ViewCreator.jsx"
import { action as deleteAction } from "./pages/ViewCreator.jsx";

const router = createBrowserRouter([
  { path: "/", element: <HomePage />,  children: [ { path: "showCreators", element: <ShowCreators />, loader: viewAllCreatorsLoader } ] },
  // Hu: HomePage functionality is good;
  { path: "showCreators", element: <ShowCreators />, loader: viewAllCreatorsLoader },
  // Hu: showCreators functionality is good;
  { path: "addCreator", element: <AddCreator />, action: addAction },
  // Hu: addCreator functionality is good;
  { path: "showCreators/creators/:creatorId", element: <ViewCreator />, loader: viewCreatorLoader, action: deleteAction },
  // Hu: add delete option;
  // Hu: add edit page redirect;
  // Hu: ViewCreator functionality is good;
  { path: "showCreators/creators/:creatorId/edit", element: <EditCreator />, loader: editCreatorLoader, action: editCreatorAction },
  // Hu:
]);
// // ***
// Understanding Path Resolution in React Router
// Absolute Paths:

// When you specify a path starting with a /, it is considered an absolute path. This path will be resolved from the root of the application.
// Relative Paths:

// When you specify a path that doesn't start with /, it is considered relative to the current route's path.
// In your case, if you want to navigate to an edit page for a creator using navigate, you must construct the path correctly to ensure it's treated as intended.

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
