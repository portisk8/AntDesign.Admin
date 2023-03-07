import Dashboard from "../pages/Auth/Dashboard/Dashboard";
import Home from "../pages/Auth/Home";
import Test from "../pages/Auth/Test/Test";
import TestWithId from "../pages/Auth/Test/TestWithId";
import SignIn from "../pages/NoAuth/SignIn";
import SignUp from "../pages/NoAuth/SignUp";
import PageNotFound from "../components/Layout/PageNotFound";

export const authRoutes = [
  { path: "/", element: <Home /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/test", element: <Test /> },
  { path: "/test/:testId", element: <TestWithId /> },
  { path: "/*", element: <PageNotFound /> },
];

export const noAuthRoutes = [
  { path: "/sign-up", element: <SignUp /> },
  { path: "/sign-in", element: <SignIn /> },
];
