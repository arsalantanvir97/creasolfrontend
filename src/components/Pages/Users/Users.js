import { userSelector } from "features/auth/authSlice";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { client } from "utils/utils";

const Users = () => {
  const [users, setUsers] = useState(null);
  const [q, setq] = useState('');

  const navigate = useNavigate();
  const { user } = useSelector(userSelector);
  const isAdmin = user && user.is_admin;

  useEffect(() => {
    if (!isAdmin) navigate("/");
    getUsers();
  }, [isAdmin, navigate,q]);

  const getUsers = (perPage = 1000, page = 1) => {
    client(
      `/api/users?perPage=${perPage}&page=${page}&q=${q}`
    ).then((res) => {
      setUsers(res);
    });
  };

  return (
    <section id="user_page" className="user-page">
      <div className="content-body">
        <div className="page-title mb-4">
          <div className="row">
            <div className="col-12">
              <h2>User Listing</h2>
            </div>
          </div>
        </div>
        <div className="dataTables_wrapper">
          <div className="user-listing-top">
            <div className="row align-items-end d-flex mb-3">
              <div className="col-12">
                <div className="dataTables_filter d-flex justify-content-start flex-shrink-1">
                  <div className="search-wrap flex-grow-1">
                    <input
                      type="search"
                      className="form-control"
                      placeholder="Search"
                      value={q}
                      onChange={(e)=>{
                        setq(e.target.value)
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="main-tabble table-responsive mx-n2">
            <table className="table table-borderless dataTable px-2">
              <thead>
                <tr>
                  <th className="sorting">Name</th>
                  <th className="sorting">Email</th>
                  <th className="sorting">Phone #</th>
                  <th className="sorting">Status</th>
                  <th className="sorting">Action</th>
                </tr>
              </thead>
              <tbody>
                {users !== null ? (
                  users.data.data.map((user) => (
                    <tr key={user._id}>
                      <td>{`${user.first_name} ${user.last_name}`}</td>
                      <td>{`${user.email}`}</td>
                      <td>{`${user.phone}`}</td>
                      <td>
                        <span className="status active">
                          {user.status ? "active" : "inactive"}
                        </span>
                      </td>
                      <td>
                        <Link
                          to={`/user/${user._id}`}
                          className="text-purple text-decoration-underline fw-semibold"
                        >
                          Click to Edit
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      Loading...
                    </td>
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

export default Users;
