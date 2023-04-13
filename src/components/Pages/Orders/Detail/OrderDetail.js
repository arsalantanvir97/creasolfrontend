import { userSelector } from "features/auth/authSlice";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { client } from "utils/utils";

const OrderDetail = () => {
  const { user } = useSelector(userSelector);
  const isAdmin = user && user.is_admin;
  const Navigate = useNavigate();
  const { id } = useParams();
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentType, setPaymentType] = useState("");

  useEffect(() => {
    if (!isAdmin) Navigate("/");
    client(`/api/order/${id}`).then((res) => {
      const { data } = res;
      setCustomerName(data.user.first_name + " " + data.user.last_name);
      setPhone(data.user.phone);
      setPaymentType(data.payment_type);
    });
  }, [isAdmin, Navigate, id]);

  return (
    <section id="change_password" className="my-profile">
      <div className="content-body">
        <div className="page-title mb-4">
          <div className="row">
            <div className="col-12 col-lg-12">
              <h2>Order Detail</h2>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-xl-6 col-lg-8 col-md-10">
            <div className="mb-3">
              <label className="fs-14 fw-medium text-dark ms-4 ff-helve-normal">
                Order ID
              </label>
              <input
                type="text"
                className="form-control border"
                disabled=""
                placeholder="Order Id"
                value={id}
              />
            </div>
            <div className="mb-3">
              <label className="fs-14 fw-medium text-dark ms-4 ff-helve-normal">
                Customer Name
              </label>
              <input
                type="text"
                className="form-control border"
                disabled=""
                placeholder="John Smith"
                value={customerName}
              />
            </div>
            <div className="mb-3">
              <label className="fs-14 fw-medium text-dark ms-4 ff-helve-normal">
                Phone #
              </label>
              <input
                type="text"
                className="form-control border"
                disabled=""
                placeholder="+1 4086752406"
                value={phone}
              />
            </div>
            <div className="mb-3">
              <label className="fs-14 fw-medium text-dark ms-4 ff-helve-normal">
                Payment Type
              </label>
              <input
                type="text"
                className="form-control border"
                disabled=""
                placeholder="Recurring"
                value={paymentType}
              />
            </div>
            <Link to={`/posts/${id}`} className="btn btn-primary">
              View Post
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderDetail;
