import MainPage from "pages/main/MainPage";
import NotFoundPage from "pages/not-found/NotFoundPage";
import RegisterPage from "pages/register/RegisterPage";
import { useRoutes } from "react-router-dom";

const AppRouter = () => {
  const Routes = useRoutes([
    {
      path: "/",
      element: <MainPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ]);
  return Routes;
};

export default AppRouter;
