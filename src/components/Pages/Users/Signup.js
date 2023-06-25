import { useEffect, useState } from 'react'
import {
  FaRegEnvelope,
  FaKey,
  FaEyeSlash,
  FaEye,
  FaUser,
  FaPhone,
} from 'react-icons/fa'
import {
  Link,
  Navigate,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from 'features/auth/authSlice'
import { ToastContainer, toast } from 'react-toastify'
import { toastConstant } from 'constants'
import { client } from 'utils/utils'
import { loadStripe } from '@stripe/stripe-js'
import { useStripe, useElements, Elements } from '@stripe/react-stripe-js'

import { Button, Modal } from 'react-bootstrap'
import { API_PATH } from 'constants'
import CheckoutForm2 from '../Packages/CheckoutForm2'
import axios from 'axios'

let dataa = []
let indexx
const Signup = () => {
  const { id } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const [successMessage, setSuccessMessage] = useState('')

  const [stripePromise, setStripePromise] = useState(null)
  const [clientSecret, setClientSecret] = useState('')
  const [packages, setPackages] = useState(null)
  const [activeSubscriptions, setActiveSubscriptions] = useState([])

  const [paymentModal, setPaymentModal] = useState({
    packageIndex: 0,
    show: false,
    recurring: false,
  })

  const [firstName, setFirstName] = useState(
    localStorage.getItem('firstName') || ''
  )
  const [lastName, setLastName] = useState(
    localStorage.getItem('lastName') || ''
  )
  const [email, setEmail] = useState(localStorage.getItem('email') || '')
  const [phone, setPhone] = useState(localStorage.getItem('phone') || '')
  const [password, setPassword] = useState(
    localStorage.getItem('password') || ''
  )
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState('')

  const [showConfirmPassword, setShowConfirmPassword] = useState('')
  //   const state = useSelector(userSelector);

  const Navigate = useNavigate()

  window.client = client

  useEffect(() => {
    client('/api/packages').then((res) => {
      dataa = res.data.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
      indexx = res.data.findIndex(
        (element) => element._id.toString() === id.toString()
      )
      console.log('indexx', indexx)

      console.log('dataa', dataa)
      setPackages(dataa)
    })
    loadStripeConfig()
  }, [])

  useEffect(() => {
    const redirectStatus = searchParams.get('redirect_status')

    if ('succeeded' !== redirectStatus) {
      console.log('abcccccccc')
      return
    }

    setTimeout(() => {
      createOrder()
    }, 2000)

    // console.log(paymentIntent, paymentIntentClientSecret, redirectStatus);
  }, [])

  useEffect(() => {
    // Update localStorage whenever firstName or lastName changes
    localStorage.setItem('firstName', firstName)
    localStorage.setItem('lastName', lastName)
    localStorage.setItem('email', email)
    localStorage.setItem('phone', phone)
    localStorage.setItem('password', password)
  }, [firstName, lastName, email, phone, password])

  const createOrder = async () => {
    console.log('abcccccccccccccc')
    const paymentIntent = searchParams.get('payment_intent')
    console.log('paymentIntent', paymentIntent)
    const paymentIntentClientSecret = searchParams.get(
      'payment_intent_client_secret'
    )
    console.log('asd', paymentIntent, paymentIntentClientSecret, searchParams)
    try {
      const firstName1 = localStorage.getItem('firstName')
      const lastName2 = localStorage.getItem('lastName')
      const email3 = localStorage.getItem('email')
      const phone4 = localStorage.getItem('phone')
      const password5 = localStorage.getItem('password')
      console.log('firstname', firstName1, lastName2, email3, phone4, password5)

      const res = await axios(`${API_PATH}/api/order/registerandsubscription`, {
        method: 'POST',
        data: {
          product: dataa[paymentModal.packageIndex],
          paymentIntent,
          paymentIntentClientSecret,
          first_name: firstName1,
          last_name: lastName2,
          email: email3,
          phone: phone4,
          password: password5,
        },
      })
      await toast(
        'Registered Successfully!.You have subscribed a package, Please fill the form within 24 hours.',
        'success'
      )
      localStorage.removeItem('firstName')
      localStorage.removeItem('lastName')
      localStorage.removeItem('email')
      localStorage.removeItem('phone')
      localStorage.removeItem('password')
      console.log(res)
      searchParams.delete('payment_intent')
      searchParams.delete('payment_intent_client_secret')
      searchParams.delete('redirect_status')
      setSearchParams(searchParams)
      setSuccessMessage('Payment Success!')

      setTimeout(() => setSuccessMessage(''), 3000)

      //   toast(
      //     'You have subscribed a package, Please fill the form within 24 hour.',
      //     'success'
      //   )
      Navigate(`/`)
    } catch (error) {
      alert('something went wrong!')
    }
  }
  //   const onRegisterSubmit = (e) => {
  //     e.preventDefault()
  //     if (password !== confirmPassword) {
  //       toast("👤 Password don't match", {
  //         ...toastConstant,
  //       })
  //     } else {
  //       const data = {
  //         first_name: firstName,
  //         last_name: lastName,
  //         email,
  //         phone,
  //         password,
  //       }
  //       dispatch(registerUser(data)).then((request) => {
  //         toast('👤 Registration success!', {
  //           ...toastConstant,
  //           onClose: () => {
  //             Navigate('/')
  //           },
  //         })
  //       })
  //     }
  //   }

  useEffect(() => {
    loadSubscriptions()
  }, [])

  const loadSubscriptions = async () => {
    // const { data } = await client('/api/subscriptions')
    // setActiveSubscriptions(data)
  }
  const openModal = async (e, index) => {
    await loadClientSecret()
    setPaymentModal({ ...paymentModal, packageIndex: index, show: true })
  }

  const loadStripeConfig = async () => {
    const response = await fetch(`${API_PATH}/api/stripe-config`, {
      headers: { 'Content-Type': 'application/json' },
    })
    const { publishableKey } = await response.json()
    setStripePromise(loadStripe(publishableKey))
  }

  const loadClientSecret = async () => {
    const response = await fetch(`${API_PATH}/api/create-payment-intent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        packageID: packages[paymentModal.packageIndex]._id,
        items: [{ id: packages[paymentModal.packageIndex].name }],
      }),
    })
    const { clientSecret } = await response.json()
    setClientSecret(clientSecret)
  }

  const handleClose = () => {
    setPaymentModal({ ...paymentModal, show: false })
  }
  const checkUserHandler = async (e, index) => {
    console.log('asdsadsa')
    if (password !== confirmPassword) {
      toast('Password does not match!', 'error')
    } else {
      try {
        const res = await client('/api/emailcheck', {
          method: 'POST',
          data: {
            email: email,
          },
        })
        console.log('res', res)
        if (res.status === 200) {
          toast('A User with this email already registered!', 'error')
        } else {
          console.log('elseblock')
          openModal(e, indexx)
        }
      } catch (error) {}
    }
  }
  return (
    <div className='login-card bg-img p-0'>
      <div className='right'>
        <h1 className='ff-helve mb-5'>Register</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault()
          }}
        >
          <div className='form-group position-relative'>
            <input
              type='text'
              className='form-control'
              placeholder='First Name'
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value)
              }}
            />
            <div className='inputIcon'>
              <FaUser />
            </div>
          </div>
          <div className='form-group position-relative'>
            <input
              type='text'
              className='form-control'
              placeholder='Last Name'
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value)
              }}
            />
            <div className='inputIcon'>
              <FaUser />
            </div>
          </div>
          <div className='form-group position-relative'>
            <input
              type='email'
              className='form-control'
              placeholder='Email'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />
            <div className='inputIcon'>
              <FaRegEnvelope />
            </div>
          </div>
          <div className='form-group position-relative'>
            <input
              type='number'
              className='form-control'
              placeholder='Phone'
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value)
              }}
            />
            <div className='inputIcon'>
              <FaPhone />
            </div>
          </div>
          <div className='form-group position-relative'>
            <div className='position-relative'>
              <input
                type={showPassword ? 'text' : 'password'}
                className='form-control pass-input'
                placeholder='Password'
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
              />
              <div className='inputIcon'>
                <FaKey />
              </div>
              <button
                className='btn view-btn position-absolute'
                onClick={(e) => {
                  e.preventDefault()
                  setShowPassword((prevState) => !prevState)
                }}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>
          <div className='form-group mb-1'>
            <div className='position-relative'>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                className='form-control pass-input'
                placeholder='Confirm Password'
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword((prevState) => e.target.value)
                }
              />
              <div className='inputIcon'>
                <FaKey />
              </div>
              <button
                className='btn view-btn position-absolute'
                onClick={(e) => {
                  e.preventDefault()
                  setShowConfirmPassword((prevState) => !prevState)
                }}
              >
                {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>
          <Modal
            show={paymentModal.show}
            onHide={handleClose}
            className='modal-dialog'
            centered
            size='lg'
          >
            <Modal.Header closeButton>
              <Modal.Title></Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {stripePromise && clientSecret && (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <CheckoutForm2
                    Navigate={Navigate}
                    firstName={firstName}
                    lastName={lastName}
                    email={email}
                    phone={phone}
                    password={password}
                    packageID={packages[paymentModal.packageIndex]._id}
                    onSuccess={(e) => {
                      setPaymentModal({
                        ...paymentModal,
                        show: false,
                      })

                      loadSubscriptions()
                    }}
                  />
                </Elements>
              )}
            </Modal.Body>
            {/* <Modal.Footer>
          
        </Modal.Footer> */}
          </Modal>
          <div className='form-group mt-3 mb-0'>
            <div className='d-flex align-items-center justify-content-between'>
              <div className='form-group text-center mb-0'>
                {/* <button
                  type='sumit'
                  className='btn btn-primary btn-login fw-bold'
                >
                  Register
                </button> */}
                <button
                  type='button'
                  onClick={(e) =>
                    firstName.length > 0 &&
                    lastName.length > 0 &&
                    email.length > 0 &&
                    phone.length > 0 &&
                    password.length > 0 &&
                    confirmPassword.length > 0
                      ? checkUserHandler(e, 0)
                      : toast('Please fill all the required fields.', 'error')
                  }
                  className='btn btn-primary'
                >
                  Pay now
                </button>

                <ToastContainer />
              </div>
              {/* <div className='forgot-pass'>
                <h6 className='ff-helve fs-14 fw-medium text-dark mb-0 d-flex justify-content-end'>
                  <Link className='ff-helve fs-14 fw-medium text-purple' to='/'>
                    Login Here
                  </Link>
                </h6>
                <h6 className='ff-helve fs-14 fw-medium text-dark mb-0'>
                  forgot your password?{' '}
                  <Link
                    to='/password-recovery'
                    className='ff-helve fs-14 fw-medium text-purple'
                  >
                    click here
                  </Link>
                </h6>
              </div> */}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup
