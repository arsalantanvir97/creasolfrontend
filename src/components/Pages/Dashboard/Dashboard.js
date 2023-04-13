import { userSelector } from "features/auth/authSlice";
import { useSelector } from "react-redux";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";

const Dashboard = () => {
  const { user } = useSelector(userSelector);
  const isAdmin = user && user.is_admin;
  return isAdmin ? <AdminDashboard /> : <UserDashboard />;
};

export default Dashboard;
