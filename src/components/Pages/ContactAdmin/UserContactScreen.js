import { toastConstant } from "constants";
import { userSelector } from "features/auth/authSlice";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { client } from "utils/utils";

const UserContactScreen = () => {
  const { user } = useSelector(userSelector);
  const email = user && user.email;
  const name = user && user.first_name + " " + user.last_name;
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");

  const onClickHandler = (e) => {
    e.preventDefault();
    try {
      debugger;
      if (subject && description) {
        client("/api/feedback", {
          method: "POST",
          data: {
            name,
            email,
            subject,
            description,
          },
        }).then((res) => {
          if (res.status === 201)
            toast("Query submitted successfully.", toastConstant);
        });
      } else toast("Kindly fill your subject & description.", toastConstant);
    } catch (error) {
      toast(error.message, toastConstant);
    }
  };
  return (
    <section id="change_password" className="my-profile">
      <div className="content-body">
        <div className="page-title mb-4">
          <div className="row">
            <div className="col-12 col-lg-12">
              <h2>Submit your query</h2>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-xl-6 col-lg-8 col-md-10">
            <div className="mb-3">
              <label className="fs-14 fw-medium text-dark ms-4 ff-helve-normal">
                Email
              </label>
              <input
                type="text"
                className="form-control border"
                placeholder="Johnsmith@gmai.com"
                value={email}
                disabled={true}
              />
            </div>
            <div className="mb-3">
              <label className="fs-14 fw-medium text-dark ms-4 ff-helve-normal">
                Name
              </label>
              <input
                type="text"
                className="form-control border"
                placeholder="John Smith"
                value={name}
                disabled={true}
              />
            </div>
            <div className="mb-3">
              <label className="fs-14 fw-medium text-dark ms-4 ff-helve-normal">
                Subject
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Please type the subject here"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="fs-14 fw-medium text-dark ms-4 ff-helve-normal">
                Description
              </label>
              <textarea
                rows="5"
                className="form-control"
                placeholder="Please type the Description here"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <button className="btn btn-primary" onClick={onClickHandler}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserContactScreen;
