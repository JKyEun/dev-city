import React from "react";
import { useRoutes } from "react-router-dom";
import Study from "../pages/MyCity/study";
import Todo from "../pages/MyCity/todo";

const routeList = [
  // {
  //   path: `/`,
  //   element: <Main />,
  // },
  {
    path: `/mycity`,
    element: <Study />,
  },
  {
    path: `/mycity/todo`,
    element: <Todo />,
  },
  // {
  //   path: `/faq`,
  //   element: < />,
  // },
];
const RenderRouter = () => {
  return useRoutes(routeList);
};

export default RenderRouter;
