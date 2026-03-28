import { createBrowserRouter } from "react-router";
import { Login } from "./features/auth/pages/Login";
import { Register } from "./features/auth/pages/Register";
import { Protected } from "./features/auth/components/Protected";
import { Home } from "./features/interview/pages/Home";
import { RecentPlans } from "./features/interview/pages/RecentPlans";
import Interview from "./features/interview/pages/Interview";
import { PublicRoute } from "./features/auth/components/PublicRoute";
import { NotFound } from "./pages/NotFound";

import Layout from "./layout/Layout";
import Landing from "./pages/Landing";

export const router = createBrowserRouter([

  {
    path: "/welcome", 
    element: <Landing />
  },

  {
    path: '/',
    element: (
      <Protected>
        <Layout />
      </Protected>
    ),
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'recent-plans',
        element: <RecentPlans />
      },
      {
        path: 'interview/:interviewId',
        element: <Interview />
      }
    ]
  },

  {
    path: '/login',
    element: <PublicRoute><Login /></PublicRoute>
  },
  {
    path: '/register',
    element: <PublicRoute><Register /></PublicRoute>
  },
  {
    path: '*',
    element: <NotFound />
  }
]);