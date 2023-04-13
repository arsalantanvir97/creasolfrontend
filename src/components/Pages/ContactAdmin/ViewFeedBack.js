import { toastConstant } from "constants";
import { userSelector } from "features/auth/authSlice";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { client } from "utils/utils";

const ViewFeedBack = ({}) => {
  const [email, setEmail] = useState("Loading...Loading...");
  const [name, setName] = useState("Loading...");
  const [subject, setSubject] = useState("Loading...");
  const [description, setDescription] = useState("Loading...");
  const { user } = useSelector(userSelector);
  const isAdmin = user && user.is_admin;
  const navigate = useNavigate();
  const { id } = useParams();
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isAdmin) navigate("/");
    if (id) {
      client(`/api/feedback/${id}?fields=name email subject description`).then(
        (res) => {
          if (res.status === 200) {
            setName(res.data.feedback.name);
            setEmail(res.data.feedback.email);
            setSubject(res.data.feedback.subject);
            setDescription(res.data.feedback.description);
          } else {
            toast(res.data.message, { ...toastConstant });
            setError(res.data.message);
          }
        }
      );
    }
  }, [id, isAdmin, navigate]);

  if (error) return <div>Something went wrong</div>;

  return (
    <section id="change_password" className="my-profile">
      <div className="content-body">
        <div className="page-title mb-4">
          <div className="row">
            <div className="col-12 col-lg-12">
              <h2>Customer Feedback</h2>
            </div>
          </div>
        </div>
        {id ? (
          <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-8 col-md-10">
              <div className="mb-3">
                <label className="fs-14 fw-medium text-dark ms-4 ff-helve-normal">
                  Email
                </label>
                <input
                  type="text"
                  className="form-control border"
                  disabled=""
                  value={email}
                  readOnly={true}
                />
              </div>
              <div className="mb-3">
                <label className="fs-14 fw-medium text-dark ms-4 ff-helve-normal">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control border"
                  disabled=""
                  value={name}
                  readOnly={true}
                />
              </div>
              <div className="mb-3">
                <label className="fs-14 fw-medium text-dark ms-4 ff-helve-normal">
                  Subject
                </label>
                <input
                  type="text"
                  className="form-control border"
                  disabled=""
                  value={subject}
                  readOnly={true}
                />
              </div>
              <div className="mb-3">
                <label className="fs-14 fw-medium text-dark ms-4 ff-helve-normal">
                  Description
                </label>
                <textarea
                  className="form-control border"
                  rows="5"
                  disabled=""
                  value={description}
                  readOnly={true}
                ></textarea>
              </div>
              <Link to="/customer-feedback" className="btn btn-primary">
                Back
              </Link>
            </div>
          </div>
        ) : (
          <div>
            Please provide a Feedback Id in order to get the feedback details.
          </div>
        )}
      </div>
    </section>
  );
};

export default ViewFeedBack;
