import { STRIPE_PK } from "constants";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import StripeCheckout from "react-stripe-checkout";
import { client } from "utils/utils";

// const ProductDisplay = () => {
//   const clickHandle = (e) => {};
//   return (
//     <section>
//       <div className="product">
//         <Logo />
//         <div className="description">
//           <h3>Starter plan</h3>
//           <h5>$20.00 / month</h5>
//         </div>
//       </div>
//       <form
//       // action="http://localhost:4001/create-checkout-session"
//       // method="POST"
//       >
//         {/* Add a hidden field with the lookup_key of your Price */}
//         <input type="hidden" name="lookup_key" value="PlanOnePrice" />
//         <button
//           id="checkout-and-portal-button"
//           type="submit"
//           onClick={clickHandle}
//         >
//           Checkout
//         </button>
//       </form>
//     </section>
//   );
// };

// const SuccessDisplay = ({ sessionId }) => {
//   return (
//     <section>
//       <div className="product Box-root">
//         <Logo />
//         <div className="description Box-root">
//           <h3>Subscription to starter plan successful!</h3>
//         </div>
//       </div>
//       <form action="/create-portal-session" method="POST">
//         <input
//           type="hidden"
//           id="session-id"
//           name="session_id"
//           value={sessionId}
//         />
//         <button id="checkout-and-portal-button" type="submit">
//           Manage your billing information
//         </button>
//       </form>
//     </section>
//   );
// };

// const Message = ({ message }) => (
//   <section>
//     <p>{message}</p>
//   </section>
// );

// const Logo = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     xmlnsXlink="http://www.w3.org/1999/xlink"
//     width="14px"
//     height="16px"
//     viewBox="0 0 14 16"
//     version="1.1"
//   >
//     <defs />
//     <g id="Flow" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
//       <g
//         id="0-Default"
//         transform="translate(-121.000000, -40.000000)"
//         fill="#E184DF"
//       >
//         <path
//           d="M127,50 L126,50 C123.238576,50 121,47.7614237 121,45 C121,42.2385763 123.238576,40 126,40 L135,40 L135,56 L133,56 L133,42 L129,42 L129,56 L127,56 L127,50 Z M127,48 L127,42 L126,42 C124.343146,42 123,43.3431458 123,45 C123,46.6568542 124.343146,48 126,48 L127,48 Z"
//           id="Pilcrow"
//         />
//       </g>
//     </g>
//   </svg>
// );

const PaymentModal = ({ show, handleClose }) => {
  const [modalShow, setModalShow] = useState(show);

  const [product, setProduct] = useState({
    name: "Bronze Package",
    price: 90,
  });

  useEffect(() => {
    setModalShow(show);
  }, [show]);

  // let [message, setMessage] = useState("");
  // let [success, setSuccess] = useState(false);
  // let [sessionId, setSessionId] = useState("");

  // useEffect(() => {
  //   // Check to see if this is a redirect back from Checkout
  //   const query = new URLSearchParams(window.location.search);

  //   if (query.get("success")) {
  //     setSuccess(true);
  //     setSessionId(query.get("session_id"));
  //   }

  //   if (query.get("canceled")) {
  //     setSuccess(false);
  //     setMessage(
  //       "Order canceled -- continue to shop around and checkout when you're ready."
  //     );
  //   }
  // }, [sessionId]);

  //   const handleShow = () => setShow(true);

  const handleToken = (token) => {
    const body = {
      token,
      product,
    };
    return client("/api/payment", {
      method: "POST",
      data: body,
    })
      .then((response) => {
        console.log(response);
        const { status } = response;
        console.log("STATUS ", status);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Modal className="payNow p-0" show={modalShow} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title></Modal.Title>
        <button type="button" className="btn close" onClick={handleClose}>
          <i className="fa fa-times"></i>
        </button>
      </Modal.Header>
      <Modal.Body>
        {/* {!success && message === "" ? (
          <ProductDisplay />
        ) : success && sessionId !== "" ? (
          <SuccessDisplay sessionId={sessionId} />
        ) : (
          <Message message={message} />
        )} */}
        <StripeCheckout
          stripeKey={STRIPE_PK}
          token={handleToken}
          amount={product.price * 100}
          name="BuyingPlanOne1"
          shippingAddress
        />
      </Modal.Body>
      {/* <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer> */}
    </Modal>
  );
};

export default PaymentModal;
