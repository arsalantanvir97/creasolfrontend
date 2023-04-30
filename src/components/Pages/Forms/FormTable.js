import moment from "moment";
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { client, timer } from "utils/utils";

const FormTable = ({ Orders, Filter = "", isAdmin = false }) => {
  const interval = useRef();
  useEffect(() => {
    interval.current = setInterval(() => {
      Array.from(document.querySelectorAll("[data-time]")).forEach((td) => {
        const endTime = new Date(td.getAttribute("data-time"));
        const timerObject = timer(new Date(), endTime);
        td.innerHTML = timerObject.status
          ? timerObject.hours +
            " : " +
            timerObject.minutes +
            " : " +
            timerObject.seconds
          : timerObject.message;
      });
    }, 1000);
    return () => {
      clearInterval(interval.current);
    };
  }, []);
  const sentReminder = async (id) => {

    try {
      const res = await client("/api/order/reminder", {
        method: "POST",
        data: {
          id
        },
      })
      toast("Reminder sent successfully.", 'success');


    } catch (error) {
      alert('something went wrong!');
    }
  }

  const OrderList = () => {
    if (Orders) {
      const o =
        Filter === ""
          ? Orders.data
          : Filter === "Submitted"
          ? Orders.data.filter((order) => order.form_status === "Submitted")
          : Orders.data.filter(
              (order) => order.form_status === "Not Submitted"
            );
            console.log('ooooooo',o)
      return o.map((order) => (
        <tr key={order._id}>
          <td>{order._id}</td>
          <td>{order.pkg_name}</td>
          <td>{order.medium}</td>
          <td>{order.form_status}</td>
          <td data-time={order.form_filltime}></td>
          <td>
            {order.form_status === "Not Submitted" ? (
              !isAdmin ? (
                <Link onClick={()=>{moment(order.form_filltime)<moment() &&      toast("Timer has expired!", { type: 'error' })}
              } to={moment(order.form_filltime)>moment()? `/form/${order._id}`:'#'} >
                  <span className="status canceled">Fill</span>
                </Link>
              ) : (
                <Link to={"#"} onClick={()=>{sentReminder(order._id)}}>
                <span className="status canceled">Send Reminder</span>
              </Link>
              )
            ) : (
              <Link to={`/view/form/${order._id}`}>
                <span className={`status active ${isAdmin ? "d-block" : ""}`}>
                  View
                </span>
              </Link>
            )}
          </td>
        </tr>
      ));
    } else {
      return (
        <tr>
          <td colSpan="10">Loading...</td>
        </tr>
      );
    }
  };

  return (
    <table className="table table-borderless dataTable px-2">
      <thead>
        <tr>
          <th className="sorting">Order ID</th>
          <th className="sorting">Package Name</th>
          <th className="sorting">Medium</th>
          <th className="sorting">Form Status</th>
          <th className="sorting">Time Left</th>
          <th className="sorting">Action</th>
        </tr>
      </thead>
      <tbody>
        <OrderList />
      </tbody>
    </table>
  );
};

export default FormTable;
