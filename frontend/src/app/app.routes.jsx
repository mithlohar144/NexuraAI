import { createBrowserRouter } from "react-router";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import Dashboard from "../features/chat/pages/Dashboard";
import Protected from "../features/auth/component/Protected";
import Landing from "../features/landing/Landing";
import AccountDashboard from "../features/account/pages/AccountDashboard";
import Pricing from "../features/pages/Pricing";
import About from "../features/pages/About";
import Contact from "../features/pages/Contact";
import Docs from "../features/pages/Docs";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Landing />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/account",
        element: <Protected><AccountDashboard /></Protected>
    },
    {
        path: "/app",
        element: <Protected><Dashboard /></Protected>
    },
    {
        path: "/pricing",
        element: <Pricing />
    },
    {
        path: "/about",
        element: <About />
    },
    {
        path: "/contact",
        element: <Contact />
    },
    {
        path: "/docs",
        element: <Docs />
    }

])