import LogoAdmin from "assets/images/logo-admin.png";
import OnlineAvatar from "assets/images/online-avatar.png";
import { Dropdown } from "react-bootstrap";
import { Link,useNavigate } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useDispatch, useSelector } from "react-redux";
import { logout, userSelector } from "features/auth/authSlice";
import { useEffect, useRef, useState } from "react";
import { client } from "utils/utils";
import { format } from "date-fns";
import { API_PATH } from "../../../constants";
const MainHeader = () => {
  const history = useNavigate();

  const dispatch = useDispatch();
  const { user } = useSelector(userSelector);
  // console.log('usser',user)
  const username = user && `${user.first_name} ${user.last_name}`;
  const userImage = user && user.image 
    // const userImage = OnlineAvatar

  const userType = user && (Boolean(user.is_admin) ? "admin" : "user");
  const [notifications, setNotifications] = useState([]);
  const [countOfUnreadNotification, setCountOfUnreadNotification] = useState(0);
  const GetNotificationIntervalFunc = useRef()

  useEffect(() => {
    getNotification();
    GetNotificationIntervalFunc.current = setInterval(() => {
      getNotification();
    }, 5000);
  }, []);

  const getNotification = async () => {
    const { data: notif, status } = await client("/api/notification");
    if (status === 200) {
      setNotifications(notif);
      setCountOfUnreadNotification(
        notif.filter((notification) => notification.isRead === false).length
      );
    } else {
      setNotifications([]);
      setCountOfUnreadNotification(0);
      clearInterval(GetNotificationIntervalFunc.current);
    }
  };

  const NotificationLinks = () => {
    return notifications.length ? notifications.map((notification) => {
      let name, sentence, url, date;
      switch (notification.notification_type) {
        case "Purchase":
          // only shows to admin
          name =
            notification.user.first_name + " " + notification.user.last_name;
          url = "/order/" + notification.order;
          break;
        case "PostUpdate":
          if (userType === "admin") {
            name =
              notification.user.first_name + " " + notification.user.last_name;
          } else {
            name =
              notification.created_by.first_name +
              " " +
              notification.created_by.last_name;
          }
          url = `/post/edit/${notification.order}/${notification.post}`;
          break;
        case "Comment":
          if (userType === "admin") {
            name =
              notification.user.first_name + " " + notification.user.last_name;
          } else {
            name =
              notification.created_by.first_name +
              " " +
              notification.created_by.last_name;
          }
          url = `/post/edit/${notification.order}/${notification.post}`;
          break;
        default:
          break;
      }
      console.log('name',name)
      if(name){
      sentence = name.trim() + " " + notification.notification_text;}

      date =
        format(new Date(notification.createdAt), "MMM dd, yyyy") +
        " at " +
        format(new Date(notification.createdAt), "hh:mm a");
      return (
        <Link to={url} key={notification._id}>
          <div className="media d-flex white-space-normal">
            <div className="media-left flex-shrink-0 align-self-top">
              <i className="far fa-bell"></i>{" "}
            </div>
            <div className="media-body flex-grow-1">
              <h6 className="media-heading">{sentence}</h6>
              <small>
                {}
                {/* <time className="date-meta">Jul 23, 2022 at 09:15 AM</time> */}
                <time className="date-meta">{date}</time>
              </small>
            </div>
            <div className="media-left media-right flex-shrink-0 align-self-top">
              <i className="far fa-circle-dot"></i>{" "}
            </div>
          </div>
        </Link>
      );
    }) : '';
  };

  return (
    <div id="header">
      <nav className="header-navbar navbar-expand-md navbar navbar-with-menu fixed-top navbar-light navbar-border">
        <div className="navbar-wrapper w-100 d-md-flex">
          <div className="navbar-header d-flex">
            <ul className="nav navbar-nav flex-row flex-grow-1 d-flex">
              <li className="nav-item d-md-none align-self-center ps-3">
                <Link className="nav-link menu-toggle hidden-xs p-0">
                  <i className="ft-menu font-large-1"></i>
                </Link>
              </li>
              <li className="nav-item align-self-center flex-grow-1 text-center">
                <Link className="navbar-brand p-0" to="/">
                  <img
                    className="brand-logo img-fluid"
                    alt="stack admin logo"
                    src={LogoAdmin}
                  />
                </Link>
              </li>
              <li className="nav-item d-md-none align-self-center pe-3">
                <Link
                  className="nav-link open-navbar-container p-0"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbar-mobile"
                >
                  <i className="fa fa-ellipsis-v"></i>
                </Link>
              </li>
            </ul>
          </div>

          <div className="navbar-container flex-grow-1 align-self-center">
            <div className="collapse navbar-collapse" id="navbar-mobile">
              <ul className="nav navbar-nav ms-auto justify-content-end">
                <Dropdown
                  as="li"
                  className="dropdown-notification nav-item d-flex"
                >
                  <Dropdown.Toggle
                    as="a"
                    className="nav-link nav-link-label align-self-center mt-2"
                    id="dropdown-basic"
                  >
                    <i className="far fa-bell"></i>{" "}
                    {countOfUnreadNotification ? (
                      <span className="badge badge-pill badge-default badge-danger badge-default badge-up">
                        {countOfUnreadNotification}
                      </span>
                    ) : (
                      ""
                    )}
                  </Dropdown.Toggle>

                  <Dropdown.Menu
                    as="ul"
                    align="end"
                    className="me-3 me-md-0 ms-3 ms-md-0"
                  >
                    <Dropdown.Header as="li" className="dropdown-menu-header">
                      <h6 className="fs-16 text-dark ff-helve fw-bold mb-2 pt-2">
                        Notification
                      </h6>
                    </Dropdown.Header>
                    <Dropdown.Item
                      className="scrollable-container media-list ps-container ps-theme-dark"
                      as="li"
                    >
                      <PerfectScrollbar>
                        <NotificationLinks />
                      </PerfectScrollbar>
                    </Dropdown.Item>
                    <li className="dropdown-menu-footer border-top mt-3">
                      <Dropdown.Item onClick={()=>{
                                history('/notifications');

                      }}>
                        View all notifications
                      </Dropdown.Item>
                    </li>
                  </Dropdown.Menu>
                </Dropdown>
                <Dropdown as="li" className="dropdown-user nav-item">
                  <Dropdown.Toggle
                    as="a"
                    className="nav-link dropdown-user-link"
                    id="dropdown-basic"
                  >
                    <span className="avatar avatar-online">
                      {" "}
                      <img src={userImage ? `${userImage}`: OnlineAvatar} alt="avatar" />{" "}
                    </span>
                    <div>
                      <span className="user-name fw-medium">{username}</span>
                      <br />
                      <span className="user-role fw-medium">{userType}</span>
                    </div>
                  </Dropdown.Toggle>
                  <Dropdown.Menu
                    as="ul"
                    align="end"
                    className="dropdown-menu-right me-3 me-md-0 ms-3 ms-md-0"
                  >
                    <Dropdown.Item as="li">
                      <Link className="dropdown-item" to="/profile">
                        <i className="fa fa-user"></i>Profile
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item as="li">
                      <Link
                        className="dropdown-item"
                        data-bs-toggle="modal"
                        data-bs-target=".profile-logout"
                        onClick={async() => {
                        await  dispatch(logout());
                          window.location.reload();
                        }}
                      >
                        <i className="fa fa-power-off"></i>Logout
                      </Link>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                <li className="nav-item d-block d-lg-none align-self-center">
                  <Link
                    className="nav-link nav-menu-main menu-toggle hidden-xs is-active"
                    href="#"
                  >
                    <i className="ft-menu"></i>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default MainHeader;
