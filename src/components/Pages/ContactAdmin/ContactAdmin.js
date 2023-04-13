import { userSelector } from "features/auth/authSlice";
import { useSelector } from "react-redux";
import AdminContactScreen from "./AdminContactScreen";
import UserContactScreen from "./UserContactScreen";

const ContactAdmin = () => {
  const { user } = useSelector(userSelector);
  const isAdmin = user && user.is_admin;

  return isAdmin ? <AdminContactScreen /> : <UserContactScreen />;
};

export default ContactAdmin;
