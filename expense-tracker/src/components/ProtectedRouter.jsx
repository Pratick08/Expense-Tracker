import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {

   const { accessToken,authChecked} =
      useSelector(state => state.auth);

   if (!authChecked) {
      return <div>Loading...</div>;
   }

   if (!accessToken) {
      return <Navigate to="/login" />;
   }

   return children;
};

export default ProtectedRoute;