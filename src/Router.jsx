import { createBrowserRouter } from "react-router-dom";
import Home from "./Pages/Authenticated/Home";
import Requests from "./Pages/Authenticated/Requests";
import Chats from "./Pages/Authenticated/Chats";
import AppLayout from "./AppLayout";
import Profile from "./Pages/Authenticated/Profile";
import Login from "./Pages/UnAuthenticated/Login";
import Register from "./Pages/UnAuthenticated/Register";
import ForgotPassword from "./Pages/UnAuthenticated/ForgotPassword";
import NotFoundPage from "./Pages/Others/NotFoundPage";
import RootLayout from "./RootLayout";
import AuthWrapper from "./Auth/AuthWraper";
import UnAuthWraper from "./Auth/UnAuthWraper";
import PrivacyPolicyPage from "./Pages/Others/PrivacyPolicy";

const router = createBrowserRouter([
    {
      path: "/",
      Component: AuthWrapper(AppLayout),
      children: [
          {
              index: true,
              Component: Home,
          },
          {
              path: 'chats',
              Component: AuthWrapper(Chats),
          },
          {
              path: 'requests',
              Component: AuthWrapper(Requests),
          },
          {
              path: 'profile',
              Component: AuthWrapper(Profile),
          }
        ]
    },
    {
      path: "/",
      Component: RootLayout,
      children: [
          {
              path: 'login',
              Component: UnAuthWraper(Login),
          },
          {
            path:'register',
            Component : UnAuthWraper(Register)
          },
          {
            path:'forgot-password',
            Component : UnAuthWraper(ForgotPassword)
          },
          {
            path:'privacy-policy',
            Component : UnAuthWraper(PrivacyPolicyPage)
          }
      ],
    },
    {
      path: '*',
      Component: NotFoundPage,
    },
  ])

  export default router