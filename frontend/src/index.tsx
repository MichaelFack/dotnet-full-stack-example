import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FirstQuestionAnnotated from "./pages/philosophy/firstQuestionAnnotated";
import Main from "./pages/main";
import PhilosophyMain from "./pages/philosophy/main";
import Error from "./pages/error";
import FirstQuestion from "./pages/philosophy/firstQuestion";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/philosophy",
    element: <PhilosophyMain />
  },
  {
    path: "/philosophy/first-question",
    element: <FirstQuestion />
  },
  {
    path: "/philosophy/first-question-annotated",
    element: <FirstQuestionAnnotated />
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} fallbackElement={Error()} />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
