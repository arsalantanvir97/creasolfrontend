import IconOne from "assets/images/icon-1.png";
import { toastConstant } from "constants";
import { STRIPE_PK } from "constants";
// import IconTwo from "assets/images/icon-2.png";
// import IconThree from "assets/images/icon-3.png";
import { userSelector } from "features/auth/authSlice";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import { toast } from "react-toastify";
import { client } from "utils/utils";
import { loadStripe } from "@stripe/stripe-js";
import { useStripe, useElements, Elements } from "@stripe/react-stripe-js";
import { API_PATH } from "constants";
import CheckoutForm from "./CheckoutForm";
let dataa=[]
const Packages = () => {

  const stripe = useStripe();
  const elements = useElements();
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const [packages, setPackages] = useState(null);
  const [activeSubscriptions, setActiveSubscriptions] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  
  const [paymentModal, setPaymentModal] = useState({
    packageIndex: 0,
    show: false,
    recurring: false,
  });
  const { user } = useSelector(userSelector);
  const isAdmin = user && user.is_admin;
  const email = user && user.email;
  const Navigate = useNavigate();

  useEffect(() => {
    client("/api/packages").then((res) => {
      dataa=res.data.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
      console.log('dataa',dataa)
      setPackages(
        dataa
      );
    });
    loadStripeConfig();
  }, []);

  useEffect(() => {
    loadSubscriptions()
  }, []);

  useEffect(() => {
    const redirectStatus = searchParams.get("redirect_status");

    if ('succeeded' !== redirectStatus) {
      return
    }

    setTimeout(() => {
      createOrder();
    }, 2000);

    // console.log(paymentIntent, paymentIntentClientSecret, redirectStatus);
  }, []);

  const loadSubscriptions = async () => {
    const {data} = await client("/api/subscriptions")
    setActiveSubscriptions(data);
  }

  const createOrder = async () => {

    const paymentIntent = searchParams.get("payment_intent");
    console.log('paymentIntent',paymentIntent)
    const paymentIntentClientSecret = searchParams.get("payment_intent_client_secret");
console.log('asd',dataa,paymentIntent,
paymentIntentClientSecret,searchParams)
    try {
      const res = await client("/api/order/create", {
        method: "POST",
        data: {
          product: dataa[paymentModal.packageIndex],
          paymentIntent, 
          paymentIntentClientSecret, 
          email:email
        },
      })
      toast("You have subscribed a package, Please fill the form within 24 hours.", 'success');

      console.log(res);
      searchParams.delete('payment_intent');
      searchParams.delete('payment_intent_client_secret');
      searchParams.delete('redirect_status');
      setSearchParams(searchParams);
      setSuccessMessage("Payment Success!")
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      alert('something went wrong!');
    }
  }

  const loadStripeConfig = async () => {
    const response = await fetch(`${API_PATH}/api/stripe-config`, {
      headers: { "Content-Type": "application/json" },
    });
    const { publishableKey } = await response.json();
    setStripePromise(loadStripe(publishableKey));
  };

  const loadClientSecret = async () => {
    const response = await fetch(`${API_PATH}/api/create-payment-intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        packageID: packages[paymentModal.packageIndex]._id,
        items: [{ id: packages[paymentModal.packageIndex].name }],
      }),
    });
    const { clientSecret } = await response.json();
    setClientSecret(clientSecret);
  };

  const HandleClick = (id) => {
    // e.preventDefault();
    if (isAdmin) {
      // Admin Click
      Navigate(`/EditPackage/${id}`);
    }
  };

  const unSubscribe = async (subscriptionID) => {
    const {data} = await client('/api/order/unsubscribe', {
      method: "POST",
      data: {subscriptionID}
    })

    loadSubscriptions();
  }

  const openModal = async (e, index) => {
    await loadClientSecret();
    setPaymentModal({ ...paymentModal, packageIndex: index, show: true });
  };

  const handleClose = () => {
    setPaymentModal({ ...paymentModal, show: false });
  };

  return (
    <section id="configuration" className="dashboard">
      {successMessage && <div className="alert alert-success">
        {successMessage}
      </div>}
      <div className="row">
        <div className="col-12">
          <div className="content-body">
            <div className="page-title mb-0">
              <div className="row mb-5">
                <div className="col-12">
                  <div className="d-flex align-items-center justify-content-between">
                    <h2 className="mb-0">Packages</h2>
                    {!isAdmin && (
                      <Link
                        to="/subscribed-packages"
                        className="fs-22 fw-bold text-purple text-decoration-underline"
                      >
                        Subscribed Packages
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="row text-center mb-3">
              {/* <PaymentModal show={modalShow} handleClose={handleClose} /> */}
              {packages
                ? packages.map((pkg, index) => (
                  <div className="col-lg-4 col-md-6 mb-md-0 mb-3" key={index}>
                    {console.log("index", index)}
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
                            onClick={()=>{HandleClick(pkg._id)}}
                          >
                            Edit
                          </button>
                        ) : (
                          <></>
                          // <StripeCheckout
                          //   stripeKey={STRIPE_PK}
                          //   token={(token) => handleToken(token, pkg)}
                          //   amount={pkg.price * 100}
                          //   name={pkg.name}
                          //   email={email}
                          // >
                          //   <button className="btn btn-primary px-5">
                          //     Pay Now
                          //   </button>
                          // </StripeCheckout>
                        )}
                        {isAdmin ? null :
                        activeSubscriptions.filter(s => s.package === pkg._id).length > 0 
                          ? <button type="button" onClick={e => unSubscribe(activeSubscriptions.filter(s => s.package === pkg._id)[0]._id)} className="btn btn-primary">UnSubscribe</button> 
                          : <button onClick={(e) => openModal(e, index)} className="btn btn-primary">Pay now</button>}
                      </div>
                    </div>
                  </div>
                ))
                : "Loading..."}
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={paymentModal.show}
        onHide={handleClose}
        className="modal-dialog"
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {stripePromise && clientSecret && (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm packageID={packages[paymentModal.packageIndex]._id} onSuccess={e => {
                setPaymentModal({
                  ...paymentModal,
                  show: false,
                });
                loadSubscriptions();
              }} />
            </Elements>
          )}
        </Modal.Body>
        {/* <Modal.Footer>
          
        </Modal.Footer> */}
      </Modal>
    </section>
  );
};

export default Packages;