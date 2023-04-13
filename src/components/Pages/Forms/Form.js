import { toastConstant } from "constants";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { client } from "utils/utils";

const Form = () => {
  const [q1, setQ1] = useState("");
  const [q2, setQ2] = useState("");
  const [q3, setQ3] = useState("");
  const [q4, setQ4] = useState("");
  const [q5, setQ5] = useState("");
  const [q6, setQ6] = useState("");
  const [q7, setQ7] = useState("");
  const [q8, setQ8] = useState("");
  const [q9, setQ9] = useState("");
  const [q10, setQ10] = useState("");
  const [q11, setQ11] = useState("");
  const [q12, setQ12] = useState("");
  const [q13, setQ13] = useState("");
  const [q14, setQ14] = useState("");
  const [q15, setQ15] = useState("");
  const [q16, setQ16] = useState("");
  const [q17, setQ17] = useState("");
  const [q18, setQ18] = useState("");

  const { OrderId } = useParams();
  const navigate = useNavigate();

  const onSubmitClick = async (e) => {
    try {
      const { status, data } = await client("/api/form/", {
        method: "POST",
        data: {
          OrderId,
          questions: [
            ["What is your business name?", q1],
            ["What is your website URL?", q2],
            ["Please provide us links to your social media profiles.", q3],
            ["Please describe your business.?", q4],
            ["What services do you offer?", q5],
            [
              "Is there any particular service that you want us to promote?",
              q6,
            ],
            ["Are there any hoshtags you want us to use?", q7],
            ["What are your target keywords?", q8],
            ["What is your primary target market?", q9],
            [
              "Who are your biggest competitors? Please list any names and provide any links or URLs that could help us in competitor analysis.",
              q10,
            ],
            [
              "Are there any blogs or channels your target audience may follow?",
              q11,
            ],
            [
              "Are there any information sources you trust and want us to follow?",
              q12,
            ],
            [
              "Are there any festivals, occasions, or days you want us to watch out for and create special posts for?",
              q13,
            ],
            ["Are there any organizations you are affiliated with?", q14],
            [
              "Do you hove a logo or specific color scheme you wont us to use?",
              q15,
            ],
            ["Is there anything you would to like us to not do?", q16],
            [
              "What do you hope to achieve through your collaboration with us?",
              q17,
            ],
            ["Feel free to drop us any additional instructions!", q18],
          ],
        },
      });
      toast(data.message, toastConstant);
    } catch (error) {
      if (error.response.status === 500)
        return toast("Something went wrong!", toastConstant);
      toast(error.response.data.message, toastConstant);
    }
    setTimeout(() => {
      navigate("/forms");
    }, 2000);
  };
  return (
    <section id="configuration" className="dashboard">
      <div className="row">
        <div className="col-12">
          <div className="content-body">
            <div className="page-title mb-0">
              <div className="row mb-5">
                <div className="col-12">
                  <div className="d-block d-sm-flex align-items-center justify-content-between">
                    <h2 className="text-purple">Help us get to know you?</h2>
                    <div className="d-flex">
                      <div className="me-3">
                        <h6 className="fs-14 text-dark ff-helve fw-medium">
                          Form Status
                        </h6>
                        <h6 className="status pending ff-helve">Incomplete</h6>
                      </div>
                      <div>
                        {/* <h6 className="fs-14 text-dark ff-helve fw-medium d-inline-block me-2">
                          Time Left:
                        </h6>
                        <h6 className="fs-16 text-purple ff-helve fw-bold d-inline-block">
                          (32:40:59)
                        </h6> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex mb-4">
                <div className="me-3">
                  <h6 className="fs-20 text-orange fw-bold m-0">1:</h6>
                </div>
                <div className="flex-grow-1">
                  <h6 className="fs-16 text-dark fw-bold mb-3">
                    What is your business name
                  </h6>
                  <input
                    type="text"
                    className="form-control rounded-5 w-100"
                    value={q1}
                    onChange={(e) => setQ1(e.target.value)}
                  />
                </div>
              </div>
              <div className="d-flex mb-4">
                <div className="me-3">
                  <h6 className="fs-20 text-orange fw-bold m-0">2:</h6>
                </div>
                <div className="flex-grow-1">
                  <h6 className="fs-16 text-dark fw-bold mb-3">
                    What is your website URL?
                  </h6>
                  <input
                    type="text"
                    className="form-control rounded-5 w-100"
                    value={q2}
                    onChange={(e) => setQ2(e.target.value)}
                  />
                </div>
              </div>
              <div className="d-flex mb-4">
                <div className="me-3">
                  <h6 className="fs-20 text-orange fw-bold m-0">3:</h6>
                </div>
                <div className="flex-grow-1">
                  <h6 className="fs-16 text-dark fw-bold mb-3">
                    Please provide us links to your social media profiles.{" "}
                  </h6>
                  <input
                    type="text"
                    className="form-control rounded-5 w-100"
                    value={q3}
                    onChange={(e) => setQ3(e.target.value)}
                  />
                </div>
              </div>
              <div className="d-flex mb-4">
                <div className="me-3">
                  <h6 className="fs-20 text-orange fw-bold m-0">4:</h6>
                </div>
                <div className="flex-grow-1">
                  <h6 className="fs-16 text-dark fw-bold mb-3">
                    Please describe your business.?
                  </h6>
                  <input
                    type="text"
                    className="form-control rounded-5 w-100"
                    value={q4}
                    onChange={(e) => setQ4(e.target.value)}
                  />
                </div>
              </div>
              <div className="d-flex mb-4">
                <div className="me-3">
                  <h6 className="fs-20 text-orange fw-bold m-0">5:</h6>
                </div>
                <div className="flex-grow-1">
                  <h6 className="fs-16 text-dark fw-bold mb-3">
                    What services do you offer?{" "}
                  </h6>
                  <input
                    type="text"
                    className="form-control rounded-5 w-100"
                    value={q5}
                    onChange={(e) => setQ5(e.target.value)}
                  />
                </div>
              </div>
              {/* <div className="d-flex mb-4">
                <div className="me-3">
                  <h6 className="fs-20 text-orange fw-bold m-0">1:</h6>
                </div>
                <div className="flex-grow-1">
                  <h6 className="fs-16 text-dark fw-bold mb-3"></h6>
                  <input type="text" className="form-control rounded-5 w-100" />
                </div>
              </div> */}
              <div className="d-flex mb-4">
                <div className="me-3">
                  <h6 className="fs-20 text-orange fw-bold m-0">6:</h6>
                </div>
                <div className="flex-grow-1">
                  <h6 className="fs-16 text-dark fw-bold mb-3">
                    Is there any particular service that you want us to promote?{" "}
                  </h6>
                  <input
                    type="text"
                    className="form-control rounded-5 w-100"
                    value={q6}
                    onChange={(e) => setQ6(e.target.value)}
                  />
                </div>
              </div>
              <div className="d-flex mb-4">
                <div className="me-3">
                  <h6 className="fs-20 text-orange fw-bold m-0">7:</h6>
                </div>
                <div className="flex-grow-1">
                  <h6 className="fs-16 text-dark fw-bold mb-3">
                    Are there any hoshtags you want us to use?{" "}
                  </h6>
                  <input
                    type="text"
                    className="form-control rounded-5 w-100"
                    value={q7}
                    onChange={(e) => setQ7(e.target.value)}
                  />
                </div>
              </div>
              <div className="d-flex mb-4">
                <div className="me-3">
                  <h6 className="fs-20 text-orange fw-bold m-0">8:</h6>
                </div>
                <div className="flex-grow-1">
                  <h6 className="fs-16 text-dark fw-bold mb-3">
                    What are your target keywords?
                  </h6>
                  <input
                    type="text"
                    className="form-control rounded-5 w-100"
                    value={q8}
                    onChange={(e) => setQ8(e.target.value)}
                  />
                </div>
              </div>
              <div className="d-flex mb-4">
                <div className="me-3">
                  <h6 className="fs-20 text-orange fw-bold m-0">9:</h6>
                </div>
                <div className="flex-grow-1">
                  <h6 className="fs-16 text-dark fw-bold mb-3">
                    What is your primary target market?
                  </h6>
                  <input
                    type="text"
                    className="form-control rounded-5 w-100"
                    value={q9}
                    onChange={(e) => setQ9(e.target.value)}
                  />
                </div>
              </div>
              <div className="d-flex mb-4">
                <div className="me-3">
                  <h6 className="fs-20 text-orange fw-bold m-0">10:</h6>
                </div>
                <div className="flex-grow-1">
                  <h6 className="fs-16 text-dark fw-bold mb-3">
                    Who are your biggest competitors? Please list any names and
                    provide any links or URLs that could help us in competitor
                    analysis.{" "}
                  </h6>
                  <input
                    type="text"
                    className="form-control rounded-5 w-100"
                    value={q10}
                    onChange={(e) => setQ10(e.target.value)}
                  />
                </div>
              </div>
              <div className="d-flex mb-4">
                <div className="me-3">
                  <h6 className="fs-20 text-orange fw-bold m-0">11:</h6>
                </div>
                <div className="flex-grow-1">
                  <h6 className="fs-16 text-dark fw-bold mb-3">
                    Are there any blogs or channels your target audience may
                    follow?{" "}
                  </h6>
                  <input
                    type="text"
                    className="form-control rounded-5 w-100"
                    value={q11}
                    onChange={(e) => setQ11(e.target.value)}
                  />
                </div>
              </div>
              <div className="d-flex mb-4">
                <div className="me-3">
                  <h6 className="fs-20 text-orange fw-bold m-0">12:</h6>
                </div>
                <div className="flex-grow-1">
                  <h6 className="fs-16 text-dark fw-bold mb-3">
                    Are there any information sources you trust and want us to
                    follow?
                  </h6>
                  <input
                    type="text"
                    className="form-control rounded-5 w-100"
                    value={q12}
                    onChange={(e) => setQ12(e.target.value)}
                  />
                </div>
              </div>
              <div className="d-flex mb-4">
                <div className="me-3">
                  <h6 className="fs-20 text-orange fw-bold m-0">13:</h6>
                </div>
                <div className="flex-grow-1">
                  <h6 className="fs-16 text-dark fw-bold mb-3">
                    Are there any festivals, occasions, or days you want us to
                    watch out for and create special posts for?{" "}
                  </h6>
                  <input
                    type="text"
                    className="form-control rounded-5 w-100"
                    value={q13}
                    onChange={(e) => setQ13(e.target.value)}
                  />
                </div>
              </div>
              <div className="d-flex mb-4">
                <div className="me-3">
                  <h6 className="fs-20 text-orange fw-bold m-0">14:</h6>
                </div>
                <div className="flex-grow-1">
                  <h6 className="fs-16 text-dark fw-bold mb-3">
                    Are there any organizations you are affiliated with?{" "}
                  </h6>
                  <input
                    type="text"
                    className="form-control rounded-5 w-100"
                    value={q14}
                    onChange={(e) => setQ14(e.target.value)}
                  />
                </div>
              </div>
              <div className="d-flex mb-4">
                <div className="me-3">
                  <h6 className="fs-20 text-orange fw-bold m-0">15:</h6>
                </div>
                <div className="flex-grow-1">
                  <h6 className="fs-16 text-dark fw-bold mb-3">
                    Do you hove a logo or specific color scheme you wont us to
                    use?{" "}
                  </h6>
                  <input
                    type="text"
                    className="form-control rounded-5 w-100"
                    value={q15}
                    onChange={(e) => setQ15(e.target.value)}
                  />
                </div>
              </div>
              <div className="d-flex mb-4">
                <div className="me-3">
                  <h6 className="fs-20 text-orange fw-bold m-0">16:</h6>
                </div>
                <div className="flex-grow-1">
                  <h6 className="fs-16 text-dark fw-bold mb-3">
                    Is there anything you would to like us to not do?{" "}
                  </h6>
                  <input
                    type="text"
                    className="form-control rounded-5 w-100"
                    value={q16}
                    onChange={(e) => setQ16(e.target.value)}
                  />
                </div>
              </div>
              <div className="d-flex mb-4">
                <div className="me-3">
                  <h6 className="fs-20 text-orange fw-bold m-0">17:</h6>
                </div>
                <div className="flex-grow-1">
                  <h6 className="fs-16 text-dark fw-bold mb-3">
                    What do you hope to achieve through your collaboration with
                    us?{" "}
                  </h6>
                  <input
                    type="text"
                    className="form-control rounded-5 w-100"
                    value={q17}
                    onChange={(e) => setQ17(e.target.value)}
                  />
                </div>
              </div>
              <div className="d-flex mb-4">
                <div className="me-3">
                  <h6 className="fs-20 text-orange fw-bold m-0">18:</h6>
                </div>
                <div className="flex-grow-1">
                  <h6 className="fs-16 text-dark fw-bold mb-3">
                    Feel free to drop us any additional instructions!{" "}
                  </h6>
                  <input
                    type="text"
                    className="form-control rounded-5 w-100"
                    value={q18}
                    onChange={(e) => setQ18(e.target.value)}
                  />
                </div>
              </div>
              <button className="btn btn-primary" onClick={onSubmitClick}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Form;
