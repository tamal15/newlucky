import { Outlet, useLocation } from "react-router-dom";
// import Navber from "./Pages/Shared/Navber/Navber";
import Navbar from "./Pages/Shared/Navbar/Navbar";
import Footer from "./Pages/Shared/Footer/Footer";

const Layout = () => {
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith("/dashboard");
  // const isHomeRoute = location.pathname === "/";

  return (
    <>
       <Navbar />
      <Outlet />
      {!isDashboardRoute && <Footer />}
    </>
  );
};

export default Layout;
