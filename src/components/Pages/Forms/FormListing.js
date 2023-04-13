import { userSelector } from "features/auth/authSlice";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { client } from "utils/utils";
import FormListingAdmin from "./FormListingAdmin";
import FormTable from "./FormTable";

const FormListing = () => {
  let { user } = useSelector(userSelector);
  user = user === null ? {} : user;
  const isAdmin = user && user.is_admin;
  const [orders, setOrders] = useState(null);
  useEffect(() => {
    client("/api/orders?perPage=50000000").then((res) => {
      const { data } = res;
      setOrders(data);
    });
  }, []);

  // const OrderList = ({ orderData }) => {
  //   // if (isAdmin) {
  //   return orderData ? (
  //     orderData.data.map((order) => (
  //       <tr key={order._id}>
  //         <td>{order._id}</td>
  //         <td>{order.pkg_name}</td>
  //         <td>{order.medium}</td>
  //         <td>{order.form_status}</td>
  //         <td>32:43:00</td>
  //         <td>
  //           {order.form_status === "Not Submitted" ? (
  //             <Link to={`/form/${order._id}`}>
  //               <span className="status canceled">Fill</span>
  //             </Link>
  //           ) : (
  //             <Link to={`/view/form/${order._id}`}>
  //               <span className="status active">View</span>
  //             </Link>
  //           )}
  //         </td>
  //       </tr>
  //     ))
  //   ) : (
  //     <tr>
  //       <td colSpan="10">Loading...</td>
  //     </tr>
  //   );
  //   // }
  // };

  return isAdmin ? (
    <FormListingAdmin Orders={orders} />
  ) : (
    <section id="user_page" className="user-page">
      <div className="content-body">
        <div className="page-title mb-4">
          <div className="row">
            <div className="col-12">
              <h2>Form Status</h2>
            </div>
          </div>
        </div>
        <div className="dataTables_wrapper">
          <div className="main-tabble table-responsive mx-n2">
            <FormTable Orders={orders} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FormListing;
