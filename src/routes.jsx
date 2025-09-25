import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import DashboardHome from "./Pages/Dashboard/DashboardHome/DashboardHome";


// import PrivetRoute from "./Pages/Shared/PrivetRoute/PrivetRoute";

import ErrorPage from "./Pages/Shared/Errorpage";
import Layout from "./Layout";
import MakeAdmin from "./Pages/Dashboard/MakeAdmin/MakeAdmin";
import UserAllData from "./Pages/Dashboard/UserAllData/UserAllData";
import PendingProduct from "./Pages/Dashboard/PendingProduct/PendingProduct";
import BannerPost from "./Pages/Dashboard/BannerPost/BannerPost";
import EditBanners from "./Pages/Dashboard/BannerPost/EditBanners";
import AllProductShow from "./Pages/Dashboard/AllProductShow/AllProductShow";
// import PrivetRoute from "./Pages/Shared/PrivetRoute/PrivetRoute";
import SubAdmin from "./Pages/Dashboard/MakeAdmin/SubAdmin/SubAdmin";
import ProductUpload from "./Pages/Dashboard/ProductUpload/ProductUpload";
import EditNavber from "./Pages/Dashboard/GetNavber/EditNavber";
import GetFooter from "./Pages/Dashboard/GetFooter/GetFooter";
import EditFooter from "./Pages/Dashboard/GetFooter/EditFooter";
import GetProduct from "./Pages/Dashboard/ProductUpload/GetProduct";
import EditProduct from "./Pages/Dashboard/ProductUpload/EditProduct";
import UpdateOrder from "./Pages/Dashboard/UpdateOrder/UpdateOrder";
// import PrivateRoute from "./Pages/Shared/PrivetRoute/PrivetRoute";
import AllUserOrder from "./Pages/Dashboard/UpdateOrder/AllUserOrder";
import Home from "./Pages/HomePage/Home/Home/Home";
import ProductDetailsPage from "./Pages/HomePage/ProductPage/ProductDetailsPage/ProductDetailsPage";
import AllTopSelling from "./Pages/HomePage/Home/TopSelling/AllTopSelling/AllTopSelling";
import AllPremiumProduct from "./Pages/HomePage/Home/PremimumProduct/AllPremiumProduct/AllPremiumProduct";
import AllLatestDeals from "./Pages/HomePage/Home/LatestDeals/AllLatestDeals/AllLatestDeals";
import AllLatestProduct from "./Pages/HomePage/Home/LatestProduct/AllLatestProduct/AllLatestProduct";
import Login from "./Auth/Login/Login";
import Registration from "./Auth/Registration/Registration";
import WinnerStatics from "./Pages/HomePage/Home/WinnerStatics/WinnerStatics";
import OrderReview from "./Pages/HomePage/OrderReview/OrderReview";
import Payment from "./Pages/HomePage/Payment/Payment";
import AddCategory from "./Pages/Dashboard/CategoryPage/AddCategory/AddCategory";
import SubCategory from "./Pages/Dashboard/CategoryPage/SubCategory/SubCategory";
import ChildCategory from "./Pages/Dashboard/CategoryPage/ChildCategory/ChildCategory";
import AllUploadProduct from "./Pages/Dashboard/CategoryPage/AllUploadProduct/AllUploadProduct";
import UploadTopSelling from "./Pages/Dashboard/UploadTopSelling/UploadTopSelling";
// import PrivateRoute from "./Pages/Shared/PrivetRoute/PrivetRoute";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: (
      <>
       <ErrorPage/>
      </>
    ),
    children: [
     
      
      {
    path: "/",
    element: <Home />,
  },
  {
    path: "/productdetails",
    element: <ProductDetailsPage />,
  },
  {
    path: "/alltopselling",
    element: <AllTopSelling />,
  },
  {
    path: "/allpremiumproduct",
    element: <AllPremiumProduct />,
  },
  {
    path: "/alllatestdeals",
    element: <AllLatestDeals/>,
  },
  {
    path: "/alllatestproducts",
    element: <AllLatestProduct />,
  },
  {
    path: "/orderreview",
    element: <OrderReview/>,
  },
  {
    path: "/payment",
    element: <Payment />,
  },
  {
    path: "/winnerstatics",
    element: <WinnerStatics />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/registration",
    element: <Registration />,
  },
 
     
     
     
   
    
     
      // {
      //   path:"bookDetails/:id",
      //   element: <ProductDetails />,
      // },
   
     
      
      // {
      //   path: "/category/:categoryName",
      //   element: <CategoryPage />,
      // },
     

        ],
      },



   

      {
        path: "/dashboard",
        element: (
          // <PrivateRoute>
            <Dashboard />
          //  </PrivateRoute>
        ),
        children: [
          {
            path: "/dashboard",
            element: 
            // <PrivateRoute>
              <DashboardHome />
            // </PrivateRoute>
         
          },
          {
            path: "/dashboard/makeadmin",
            element: <MakeAdmin />,
          },
          {
            path: "/dashboard/addcategory",
            element: <AddCategory />,
          },
          {
            path: "/dashboard/subcategory",
            element: <SubCategory />,
          },
          {
            path: "/dashboard/childcategory",
            element: <ChildCategory />,
          },
          {
            path: "/dashboard/alluploadproduct",
            element: <AllUploadProduct />,
          },
          {
            path: "/dashboard/uploadtopselling",
            element: <UploadTopSelling />,
          },
          {
            path: "/dashboard/subadmin",
            element: <SubAdmin />,
          },
          {
            path: "/dashboard/useralldata",
            element: <UserAllData />,
          },
          {
            path: "/dashboard/pendingproduct",
            element: <PendingProduct />,
          },
         
          {
            path: "/dashboard/updateorder",
            element: <UpdateOrder />,
          },
          {
            path: "/dashboard/AllUserorder",
            element: <AllUserOrder />,
          },
          {
            path: "/dashboard/allproductshows",
            element: <AllProductShow />,
          },
          {
            path: "/dashboard/showproducts",
            element: <GetProduct />,
          },
          {
            path: "/dashboard/productupload",
            element: <ProductUpload />,
          },
          
        
          {
            path: "/dashboard/getFooter",
            element: <GetFooter />,
          },
          // {
          //   path: "/dashboard/getnavber",
          //   element: <GetNavber />,
          // },
          {
            path: "/dashboard/bannerpost",
            element: <BannerPost />,
          },
        
          {
            path: "/dashboard/editbanners/:id",
            element: <EditBanners/>,
          },
          {
            path: "/dashboard/editnavber/:id",
            element: <EditNavber/>,
          },
          {
            path: "/dashboard/editfooter/:id",
            element: <EditFooter/>,
          },
          
         
        
          {
            path: "/dashboard/editproductdatas/:id",
            element: <EditProduct/>,
          },
         
    
    ],
  },
]);
export default router;
