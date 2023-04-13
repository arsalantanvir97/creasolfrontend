import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { client } from "utils/utils";

const AdminContactScreen = () => {
  const [feedbacks, setFeedbacks] = useState(null);
  useEffect(() => {
    client("/api/feedback?fields=name email createdAt").then((res) => {
      setFeedbacks(res);
    });
  }, []);

  return (
    <section id="user_page" className="user-page">
      <div className="content-body">
        <div className="page-title mb-4">
          <div className="row">
            <div className="col-12">
              <h2>Customer Feedback</h2>
            </div>
          </div>
        </div>
        <div className="dataTables_wrapper">
          <div className="main-tabble table-responsive mx-n2">
            <table className="table table-borderless dataTable px-2">
              <thead>
                <tr>
                  <th className="sorting">Name</th>
                  <th className="sorting">Email</th>
                  <th className="sorting">Date Received</th>
                  <th className="sorting">Action</th>
                </tr>
              </thead>
              <tbody>
                {feedbacks !== null ? (
                  feedbacks.data.data.map((feedback) => (
                    <tr key={feedback._id}>
                      <td>{feedback.name}</td>
                      <td>{feedback.email}</td>
                      <td>{feedback.createdAt}</td>
                      <td>
                        <Link
                          to={`/feedback/${feedback._id}`}
                          className="text-purple text-decoration-underline fw-semibold"
                        >
                          <span className="status active">View</span>
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

export default AdminContactScreen;
