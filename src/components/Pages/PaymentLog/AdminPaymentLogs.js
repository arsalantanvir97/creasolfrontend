import React, { useEffect, useState } from "react";
import DotOne from "assets/images/dot-1.png";
import DotTwo from "assets/images/dot-2.png";
import DotThree from "assets/images/dot-3.png";
import Chart from "assets/images/chart.png";
import { client } from "utils/utils";
import { useSelector } from "react-redux";
import { userSelector } from "features/auth/authSlice";
import { Link } from "react-router-dom";
import UserChart from "components/common/UserChart";

const AdminPaymentLogs = () => {
  const [payments, setPayments] = useState();
  const [totalSales, setTotalSales] = useState();
  const [startMonth, setStartMonth] = useState();
  const [startYear, setStartYear] = useState();
  const [endMonth, setEndMonth] = useState();
  const [filter, setFilter] = useState({
    status: undefined,
    year: new Date().getFullYear(),
  });

  const [endYear, setEndYear] = useState();
  let { user } = useSelector(userSelector);
  user = user === null ? {} : user;
  const isAdmin = user && user.is_admin;
  const [userChart, setUserChart] = useState({
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Popular usage",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        backgroundColor: [
          "#602080",
          "#602080",
          "#602080",
          "#602080",
          "#602080",
          "#602080",
          "#602080",
          "#602080",
          "#602080",
          "#602080",
          "#602080",
          "#602080",
        ],
        borderColor: [
          "#602080",
          "#602080",
          "#602080",
          "#602080",
          "#602080",
          "#602080",
          "#602080",
          "#602080",
          "#602080",
          "#602080",
          "#602080",
          "#602080",
        ],
        borderWidth: 1,
      },
    ],
  });

  const loadDashboardData = async () => {
    const {
      data: { graph },
    } = await client(`/api/paymentloggs?year=${filter.year}`);
    debugger;
    setUserChart({
      ...userChart,
      datasets: [{ ...userChart.datasets, data: graph }],
    });
  };

  useEffect(() => {
    loadDashboardData();
  }, [filter]);


  useEffect(() => {
    getPayments();
  }, []);

  const getPayments = async (queryString) => {
    const { status, data } = await client(
      "/api/get-user-payments" + (queryString ? "?" + queryString : "")
    );
    if (status === 200) {
      setPayments(data);
      console.log(data);
      setTotalSales(
        data.reduce((start, value) => {
          return start + parseFloat(value.amount);
        }, 0)
      );
    }
  };

  const HandleFilterClick = () => {
    let queryString = "";
    if (startYear) {
      queryString += "start=" + startMonth + "," + startYear + "&";
    }
    if (endYear) {
      queryString += "end=" + endMonth + "," + endYear;
    }
    getPayments(queryString);
  };

  const generateArrayOfYears = () => {
    var max = new Date().getFullYear();
    var min = max - 2;
    var years = [];

    for (var i = max; i >= min; i--) {
      years.push(i);
    }
    return years.sort((a, b) => a - b);
  };

  const FormatMoney = (amount) => {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    });
    return formatter.format(amount);
  };

  return (
    <section id="configuration" className="dashboard">
      <div className="row">
        <div className="col-12">
          <div className="content-body">
            <div className="page-title mb-0">
              <div className="row align-items-center mb-4">
                <div className="col-lg-7">
                  <div className="d-flex align-items-center justify-content-between mb-4">
                    <h2 className="mb-0">Payment Log</h2>
                    {isAdmin ? (
                      <div>
                        <h6
                          href="#"
                          className="fs-16 text-dark ff-helve fw-bold"
                        >
                          Legends:
                        </h6>
                        <div className="d-flex align-items-center">
                          <div className="me-3">
                            <img
                              src={DotOne}
                              alt=""
                              className="img-fluid d-inline-block me-2"
                            />
                            <h6 className="fs-16 fw-medium text-dark ff-helve d-inline-block">
                              Approved
                            </h6>
                          </div>
                          <div className="me-3">
                            <img
                              src={DotTwo}
                              alt=""
                              className="img-fluid d-inline-block me-2"
                            />
                            <h6 className="fs-16 fw-medium text-dark ff-helve d-inline-block">
                              Pending
                            </h6>
                          </div>
                          <div className="me-3">
                            <img
                              src={DotThree}
                              alt=""
                              className="img-fluid d-inline-block me-2"
                            />
                            <h6 className="fs-16 fw-medium text-dark ff-helve d-inline-block">
                              Rejected
                            </h6>
                          </div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  {isAdmin ? (
                    <>
                      <div className="d-block d-sm-flex align-items-center justify-content-between mb-4">
                        <h3 className="mb-sm-0 mb-3">Sales Per Month</h3>
                        <div className="">
                          <div className="select-wrapper d-block d-sm-inline-block mt-1 mt-sm-0 me-0 me-sm-2">
                          <select
                          name="year"
                          value={filter.year}
                          className="form-control"
                          onChange={(e) =>
                            setFilter({ ...filter, year: e.target.value })
                          }
                        >
                          {generateArrayOfYears().map((year) => (
                            <option value={year}>{year}</option>
                          ))}
                        </select>
                          </div>
                        </div>
                      </div>
                      <UserChart chartData={userChart} />
                    </>
                  ) : (
                    ""
                  )}
                </div>
                {isAdmin ? (
                  <div className="col-lg-5">
                    <div className="paymentLogBox text-center">
                      <div className="paymentLogHeader">
                        <h4 className="fs-22 fw-bold ff-helve text-white mb-0">
                          Total Sales
                        </h4>
                      </div>
                      <div className="paymentLogBody">
                        <h2 className="fs-60 fw-bold ff-helve text-purple mb-0">
                          {FormatMoney(totalSales)}
                        </h2>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="d-block d-md-flex align-items-center">
              <div className="select-wrapper d-block d-sm-inline-block mt-1 mt-sm-0 me-0 me-sm-2 mb-md-0 mb-2">
                <select
                  className="form-control"
                  value={startMonth}
                  onChange={(e) => {
                    setStartMonth(e.target.value);
                  }}
                >
                  <option value="">Month</option>
                  <option value="1">Jan</option>
                  <option value="2">Feb</option>
                  <option value="3">Mar</option>
                  <option value="4">April</option>
                  <option value="5">May</option>
                  <option value="6">June</option>
                  <option value="7">July</option>
                  <option value="8">August</option>
                  <option value="9">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
              </div>
              <div className="select-wrapper d-block d-sm-inline-block mt-1 mt-sm-0">
                <select
                  className="form-control"
                  value={startYear}
                  onChange={(e) => {
                    if (!startMonth) setStartMonth(1);
                    setStartYear(e.target.value);
                  }}
                >
                  <option value="">Year</option>
                  {generateArrayOfYears().map((year) => (
                    <option value={year} key={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
              <span className="px-sm-4 mx-sm-3 py-md-3 py-2 filterTo my-md-0 my-2 d-inline-block">
                To
              </span>
              <div className="select-wrapper d-block d-sm-inline-block mt-1 mt-sm-0 me-0 me-sm-2 mb-md-0 mb-2">
                <select
                  className="form-control"
                  value={endMonth}
                  onChange={(e) => {
                    setEndMonth(e.target.value);
                  }}
                >
                  <option value="">Month</option>
                  <option value="1">Jan</option>
                  <option value="2">Feb</option>
                  <option value="3">Mar</option>
                  <option value="4">April</option>
                  <option value="5">May</option>
                  <option value="6">June</option>
                  <option value="7">July</option>
                  <option value="8">August</option>
                  <option value="9">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
              </div>
              <div className="select-wrapper d-block d-sm-inline-block mt-1 mt-sm-0 me-0 me-sm-2 mb-md-0 mb-2">
                <select
                  className="form-control"
                  value={endYear}
                  onChange={(e) => {
                    if (!endMonth) setEndMonth(1);
                    setEndYear(e.target.value);
                  }}
                >
                  <option value="">Year</option>
                  {generateArrayOfYears().map((year) => (
                    <option value={year} key={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
              <button
                className="btn btn-secondary bg-green rounded-5"
                onClick={HandleFilterClick}
              >
                Filter
              </button>
            </div>
            <div className="card shadow-none bg-transparent p-0 d-block card-chart border-none align-items-center">
              <div className="card-header d-block d-sm-flex justify-content-between bg-transparent border-0 p-0 "></div>
              <div className="card-body p-0">
                <div className="chartbox position-relative text-center">
                  <div className="main-tabble table-responsive">
                    <table className="table table-borderless dataTable">
                      <thead>
                        <tr>
                          <th className="sorting">Transaction ID</th>
                          <th className="sorting">Order ID</th>
                          <th className="sorting">
                            {isAdmin ? "Email" : "Package"}
                          </th>
                          <th className="sorting">Payment Type</th>
                          <th className="sorting">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {payments ? (
                          payments.length ? (
                            payments.map((payment) => (
                              <tr key={payment._id}>
                                <td>{payment._id}</td>
                                <td>
                                  {payment.order._id + "  "}
                                  <Link
                                    to={`/posts/${payment.order._id}`}
                                    className="status active"
                                  >
                                    View
                                  </Link>
                                </td>
                                <td>
                                  {isAdmin
                                    ? payment.user.email
                                    : payment.order.pkg_name}
                                </td>
                                <td>{payment.order.payment_type}</td>
                                <td>{FormatMoney(payment.amount)}</td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="8">No payments to show</td>
                            </tr>
                          )
                        ) : (
                          <tr>
                            <td colSpan="8">Loading...</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminPaymentLogs;
