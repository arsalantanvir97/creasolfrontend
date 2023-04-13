import format from "date-fns/format";
import { userSelector } from "features/auth/authSlice";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { client } from "utils/utils";

const Notificaiton = () => {
  const [notifications, setNotifications] = useState([]);
  const { user } = useSelector(userSelector);
  const userType = user && (Boolean(user.is_admin) ? "admin" : "user");

  useEffect(() => {
    getNotification();
    setInterval(() => {
      getNotification();
    }, 50000);
  }, []);
  const getNotification = async () => {
    const { data: notif, status } = await client("/api/notification");
    if (status === 200) {
      setNotifications(notif);
    } else {
      setNotifications([]);
    }
  };

  const NotificationLinks = () => {
    return notifications?.length>0 && notifications?.map((notification) => {
      let name, sentence, url, date;
      switch (notification?.notification_type) {
        case "Purchase":
          // only shows to admin
          name =
            notification?.user?.first_name + " " + notification?.user?.last_name;
          url = "/order/" + notification?.order;
          break;
        case "PostUpdate":
          if (userType === "admin") {
            name =
              notification?.user?.first_name + " " + notification?.user?.last_name;
          } else {
            name =
              notification?.created_by?.first_name +
              " " +
              notification?.created_by?.last_name;
          }
          url = `/post/edit/${notification?.order}/${notification?.post}`;
          break;
        case "Comment":
          if (userType === "admin") {
            name =
              notification?.user?.first_name + " " + notification?.user?.last_name;
          } else {
            name =
              notification?.created_by?.first_name +
              " " +
              notification?.created_by?.last_name;
          }
          url = `/post/edit/${notification?.order}/${notification?.post}`;
          break;
        default:
          break;
      }
      if(name){
      sentence = name?.trim() + " " + notification?.notification_text;}

      date =
        format(new Date(notification?.createdAt), "MMM dd, yyyy") +
        " at " +
        format(new Date(notification?.createdAt), "hh:mm a");
      return (
        <Link to={url} key={notification?._id}>
          <div className="card">
            <div className="media d-flex">
              <div className="media-left flex-shrink-0 align-self-top">
                <i className="far fa-bell"></i>
              </div>
              <div className="media-body align-self-center unreadNotification">
                <p>{sentence}</p>
                <div className="meta mt-1">
                  <time className="time-meta" datetime="">
                    {date}
                  </time>
                </div>
              </div>
              <div className="media-left media-right flex-shrink-0 align-self-top">
                <i className="far fa-circle-dot"></i>{" "}
              </div>
            </div>
          </div>
        </Link>
      );
    });
  };

  return (
    <section id="configuration" className="notifications-page">
      <div className="row">
        <div className="col-12">
          <div className="content-body">
            <div className="page-title mb-0">
              <div className="row mb-4">
                <div className="col-12">
                  <h2 className="mb-0">Notifications</h2>
                </div>
              </div>
            </div>
            <div className=" row">
              <div className="col-12">
                <NotificationLinks />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Notificaiton;
