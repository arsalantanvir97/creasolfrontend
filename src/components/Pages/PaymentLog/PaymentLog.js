import { userSelector } from "features/auth/authSlice";
import { useSelector } from "react-redux";
import AdminPaymentLogs from "./AdminPaymentLogs";
import UserPaymentLogs from "./UserPaymentLogs";

const PaymentLog = () => {
  let { user } = useSelector(userSelector);
  user = user === null ? {} : user;
  const isAdmin = user && user.is_admin;
  return isAdmin ? <AdminPaymentLogs /> : <AdminPaymentLogs />;
};

export default PaymentLog;
