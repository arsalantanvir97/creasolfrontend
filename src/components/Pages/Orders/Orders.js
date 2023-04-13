import { userSelector } from "features/auth/authSlice";
import { useSelector } from "react-redux";
import AdminOrdersScreen from "./AdminOrdersScreen";
import UserOrdersScreen from "./UserOrdersScreen";

const Orders = () => {
  let { user } = useSelector(userSelector);
  user = user === null ? {} : user;
  const isAdmin = user && user.is_admin;

  return <AdminOrdersScreen isAdmin={isAdmin} />;
};

export default Orders;
