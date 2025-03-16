import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../lib/redux/store";
import DashboardSlider from "../../components/dashboardSlide/DashboardSlider";

export default function ProtectedRoute() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return isAuthenticated ? (
    <div className="flex items-start justify-start">
      <DashboardSlider />
      <div className="w-full h-[calc(100vh-100px)] overflow-y-scroll  hide-scrollbar">
        <Outlet />
      </div>
    </div>
  ) : (
    <Navigate to="/login-admin" replace />
  );
}
