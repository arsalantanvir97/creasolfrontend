import { toastConstant } from "constants";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { client } from "utils/utils";

const ViewForm = () => {
  const [form, setForm] = useState({});
  const { OrderId } = useParams();

  useEffect(() => {
    client("/api/form/" + OrderId).then(({ status, data }) => {
      if (status === 200) {
        setForm(data);
        console.log(data);
      } else {
        toast("Something went wrong!", toastConstant);
      }
    });
  }, [OrderId]);

  return (
    <section id="configuration" className="dashboard">
      <div className="row">
        <div className="col-12">
          <div className="content-body">
            <div className="page-title mb-0">
              <div className="row mb-2">
                <div className="col-12">
                  <div className="d-block d-sm-flex align-items-center justify-content-between">
                    <h2 className="backBtn mb-sm-0 mb-3">
                      <Link to="/forms">
                        <i className="fas fa-arrow-left"></i>
                      </Link>{" "}
                      Back
                    </h2>
                    <div className="d-flex align-items-center">
                      <div className="me-3">
                        <h6 className="fs-14 text-dark fw-medium">
                          Form Status
                        </h6>
                        <h6 className="status active">
                          {form ? "Complete" : "Incomplete"}
                        </h6>
                      </div>
                      <div>
                        <h6 className="fs-14 text-dark fw-medium">Order ID:</h6>
                        <h6 className="fs-16 text-dark fw-bold">
                          {form ? form.order : ""}
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <h2 className="text-purple mb-4">Help us get to know you?</h2>
              {form.questions !== undefined
                ? form.questions.map((q, i) => (
                    <div className="d-flex mb-4">
                      <div className="me-3">
                        <h6 className="fs-20 text-orange fw-bold m-0">
                          {i + 1}:
                        </h6>
                      </div>
                      <div>
                        <h6 className="fs-16 text-dark fw-bold mb-3">{q[0]}</h6>
                        <h6 className="fs-16 text-gray fw-medium">{q[1]}</h6>
                      </div>
                    </div>
                  ))
                : ""}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ViewForm;
