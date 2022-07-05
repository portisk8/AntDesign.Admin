import Dashboard from "../pages/Auth/Dashboard/Dashboard";
import Home from "../pages/Auth/Home";
import Test from "../pages/Auth/Test/Test";
import TestWithId from "../pages/Auth/Test/TestWithId";
import SignIn from "../pages/NoAuth/SignIn";
import SignUp from "../pages/NoAuth/SignUp";

export const authRoutes = [
  { path: "/", element: <Home /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/test", element: <Test /> },
  { path: "/test/:testId", element: <TestWithId /> },
];

export const noAuthRoutes = [
  { path: "/sign-up", element: <SignUp /> },
  { path: "/sign-in", element: <SignIn /> },
];
