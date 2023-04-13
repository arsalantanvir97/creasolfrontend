import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { client } from "utils/utils";

const SubscribedPackages = () => {
  const [orders, setOrders] = useState(null);
  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    const { data } = await client("/api/orders?perPage=50000000")
    setOrders(data);
  }

  const cancelSubscription = async (e, orderID) => {
    e.preventDefault();
    const { data } = await client('/api/order/unsubscribe', {
      method: "POST",
      data: { orderID }
    })

    loadOrders();
  }
  return (
    <section id="user_page" className="user-page">
      <div className="content-body">
        <div className="page-title mb-4">
          <div className="row">
            <div className="col-12">
              <h2>Subscribed Packages</h2>
            </div>
          </div>
        </div>
        <div className="dataTables_wrapper">
          <div className="main-tabble table-responsive mx-n2">
            <table className="table table-borderless dataTable px-2">
              <thead>
                <tr>
                  <th className="sorting">Package Name</th>
                  <th className="sorting">Package Status</th>
                  <th className="sorting">Start Date</th>
                  <th className="sorting">End Date</th>
                  <th className="sorting">Form Status</th>
                  <th className="sorting">Type</th>
                  <th className="sorting">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders ? (
                  orders.data.map((order) => (
                    <tr key={order._id}>
                      <td>{order.pkg_name}</td>
                      <td>{order.status}</td>
                      <td> {moment
                        .utc(order?.createdAt)
                        .format("LL")}</td>
                      <td> {moment
                        .utc(order?.current_period_end)
                        .format("LL")}</td>

                      <td>{order.form_status}</td>
                      <td>{order.payment_type}</td>
                      <td>
                        {order.payment_type !== "Non Recurrent" ? (
                          order.subscription_detail.cancel_at_period_end ? "Canceled" :
                            <a href="#" onClick={e => cancelSubscription(e, order._id)} className="text-purple">
                              Cancel Recurring Payment
                            </a>
                        ) : (
                          ""
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10">Loading...</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubscribedPackages;
