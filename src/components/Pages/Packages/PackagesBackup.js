import IconOne from "assets/images/icon-1.png";
import { toastConstant } from "constants";
import { STRIPE_PK } from "constants";
// import IconTwo from "assets/images/icon-2.png";
// import IconThree from "assets/images/icon-3.png";
import { userSelector } from "features/auth/authSlice";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import { toast } from "react-toastify";
import { client } from "utils/utils";

const Packages = () => {
  const [packages, setPackages] = useState(null);
  const { user } = useSelector(userSelector);
  const isAdmin = user && user.is_admin;
  const email = user && user.email;
  const Navigate = useNavigate();

  useEffect(() => {
    client("/api/packages").then((res) => {
      setPackages(
        res.data.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
      );
    });
  }, []);

  const HandleClick = (e) => {
    e.preventDefault();
    if (isAdmin) {
      // Admin Click
      Navigate("/packages");
    }
  };

  const handleToken = (token, pkg) => {
    const body = {
      stripe_token: token,
      pkg,
    };
    return client("/api/payment", {
      method: "POST",
      data: body,
    })
      .then((response) => {
        console.log(response);
        const { status, data } = response;
        if (status === 201) {
          toast("Order has been created.", toastConstant);
          Navigate(`/posts/${data._id}`);
        }
        console.log("STATUS ", status);
      })
      .catch((error) => {
        console.log(error);
        toast("An error occurred.", toastConstant);
      });
  };

  return (
    <section id="configuration" className="dashboard">
      <div className="row">
        <div className="col-12">
          <div className="content-body">
            <div className="page-title mb-0">
              <div className="row mb-5">
                <div className="col-12">
                  <div className="d-flex align-items-center justify-content-between">
                    <h2 className="mb-0">Packages</h2>
                    {!isAdmin && (
                      <a
                        href="subscribed-packages.php"
                        className="fs-22 fw-bold text-purple text-decoration-underline"
                      >
                        Subscribed Packages
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="row text-center mb-3">
              {/* <PaymentModal show={modalShow} handleClose={handleClose} /> */}
              {packages
                ? packages.map((pkg, index) => (
                    <div
                      className="col-lg-4 col-md-6 mb-md-0 mb-3"
                      key={index}
                    >
                      <div className="pricing">
                        <div className="pricingHeader">
                          <h6 className="fs-20 fw-semibold ff-rubik text-dark">
                            {pkg.name}
                          </h6>
                          <img src={IconOne} alt="" className="img-fluid" />
                          <h2 className="fs-60 fw-bold ff-rubik text-orange mb-0">
                            ${pkg.price}
                          </h2>
                        </div>
                        <div className="pricingBody">
                          <ul className="text-start m-0 p-0 pb-4">
                            {pkg.description &&
                              pkg.description.map((desc) => <li>{desc}</li>)}
                          </ul>
                          {isAdmin ? (
                            <button
                              className="btn btn-primary px-5"
                              onClick={HandleClick}
                            >
                              Edit
                            </button>
                          ) : (
                            <StripeCheckout
                              stripeKey={STRIPE_PK}
                              token={(token) => handleToken(token, pkg)}
                              amount={pkg.price * 100}
                              name={pkg.name}
                              email={email}
                            >
                              <button className="btn btn-primary px-5">
                                Pay Now
                              </button>
                            </StripeCheckout>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                : "Loading..."}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Packages;
