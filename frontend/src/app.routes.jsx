import { createBrowserRouter } from "react-router";
import { Login } from "./features/auth/pages/login";
import { Register } from "./features/auth/pages/Register";
import { Protected } from "./features/auth/components/Protected";
import { Home } from "./features/interview/pages/Home";
import { RecentPlans } from "./features/interview/pages/RecentPlans";
import Interview from "./features/interview/pages/Interview";
import { PublicRoute } from "./features/auth/components/PublicRoute";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
    {
        path: '/login',
        element: <PublicRoute> <Login /> </PublicRoute>
    },
    {
        path: '/register',
        element: <PublicRoute> <Register /> </PublicRoute>
    },
    {
        path: '/',
        element: <Protected><Home /></Protected>
    },
    {
        path: '/recent-plans',
        element: <Protected><RecentPlans /></Protected>
    },
    {
        path: '/interview/:interviewId',
        element: <Protected><Interview /></Protected>
    },
    {
        path: '*',
        element: <NotFound />
    }
])