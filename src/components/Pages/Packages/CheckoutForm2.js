import { CardElement, PaymentElement } from '@stripe/react-stripe-js'
import { useEffect, useState } from 'react'
import { useStripe, useElements } from '@stripe/react-stripe-js'
import { client } from 'utils/utils'
import axios from 'axios'
import { API_PATH } from 'constants'
import { toast } from 'react-toastify'

export default function CheckoutForm2({
  Navigate,
  firstName,
  lastName,
  email,
  phone,
  password,
  packageID,
  onSuccess,
}) {
  const stripe = useStripe()
  const elements = useElements()
  console.log('packageID', packageID, firstName, lastName, email)
  const [message, setMessage] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [recurring, setRecurring] = useState(false)

  const createSubscription = async () => {
    setIsProcessing(true)
    try {
      const paymentMethod = await stripe.createPaymentMethod({
        card: elements.getElement('card'),
        type: 'card',
        billing_details: {
          name: `${firstName} ${lastName}`,
          email,
        },
      })
      console.log('paymentMethod', paymentMethod)
      if (paymentMethod.error) {
        setMessage(paymentMethod.error.message)
        setIsProcessing(false)
        return
      }
      const { data } = await axios(
        `${API_PATH}/api/order/usersignupsubscribe`,
        {
          method: 'POST',
          data: {
            packageID,
            paymentMethod: paymentMethod.paymentMethod.id,
            first_name: firstName,
            last_name: lastName,
            email,
            phone,
            password,
          },
        }
      )
      localStorage.removeItem('firstName')
      localStorage.removeItem('lastName')
      localStorage.removeItem('email')
      localStorage.removeItem('phone')
      localStorage.removeItem('password')

      // if (!response.ok) return alert("Payment unsuccessful!");
      const confirm = await stripe.confirmCardPayment(data.clientSecret)
      toast(
        'Registered Successfully!.You have subscribed a package, Please fill the form within 24 hours.',
        'success'
      )

      Navigate(`/`)

      if (confirm.error) return alert('Payment unsuccessful!')
      onSuccess()
    } catch (err) {
      console.error(err)
      setMessage(err.message)
    }
    setIsProcessing(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (recurring) {
      await createSubscription()
      return
    }
    // return;

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return
    }

    setIsProcessing(true)

    const result = await stripe.confirmPayment({
      elements,
      // card: elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/user/Signup/${packageID}`,
        // return_url: `http://localhost:4001/api/payment`,
      },
    })

    const { error } = result

    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message)
    } else {
      setMessage('An unexpected error occured.')
    }

    console.log(error, result)

    setIsProcessing(false)
  }

  return (
    <form id='payment-form' onSubmit={handleSubmit} className='py-5'>
      {!recurring && <PaymentElement id='payment-element' />}
      {recurring && (
        <CardElement
          onChange={(e) => {
            if (e.error) {
              setMessage(e.error.message)
            } else {
              setMessage('')
            }
          }}
          id='payment-element'
          options={{ hidePostalCode: true }}
        />
      )}
      {message && (
        <div className='text-danger' id='payment-message'>
          {message}
        </div>
      )}
      <div className='d-flex align-items-center mt-5'>
        <button
          disabled={isProcessing || !stripe || !elements}
          id='submit'
          className='btn btn-primary'
        >
          <span id='button-text'>
            {isProcessing ? 'Processing ... ' : 'Pay now'}
          </span>
        </button>
        <label>
          <input
            type='checkbox'
            onChange={(e) => setRecurring(e.target.checked)}
            defaultChecked={recurring}
          />{' '}
          Recurring
        </label>
      </div>
      {/* <button type="button" onClick={createSubscription}>Subscribe</button> */}
      {/* Show any error or success messages */}
    </form>
  )
}
