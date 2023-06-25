import React, { useEffect, useRef, useState } from 'react'
import { client } from 'utils/utils'
import { toast } from 'react-toastify'
import { API_PATH } from 'constants'
import Avatar from 'assets/images/avatar.png'
import { toastConstant } from 'constants'
import { useDispatch, useSelector } from 'react-redux'
import { setLoginDetails, userSelector } from 'features/auth/authSlice'
import { Link, useNavigate } from 'react-router-dom'
import { FaPhone } from 'react-icons/fa'
const UserProfile = () => {
  const navigate = useNavigate()

  // const [file, setFile] = useState();
  // const [fileName, setFileName] = useState("");
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [fblink, setfblink] = useState('')
  const [instalink, setinstalink] = useState('')
  const [address, setaddress] = useState('')

  const [profileImage, setProfileImage] = useState()
  const fileUploaderRef = useRef(null)
  const profileImageRef = useRef(null)

  const dispatch = useDispatch()

  const auth = useSelector(userSelector)

  const user = { ...auth.user }
  const isAdmin = user && user.is_admin

  useEffect(() => {
    user.email && setEmail(user.email)
    user.fblink && setfblink(user.fblink)
    user.instalink && setinstalink(user.instalink)
    user.address && setaddress(user.address)
    user.phone && setPhone(user.phone)

    user.first_name &&
      user.last_name &&
      setName(user.first_name + ' ' + user.last_name)
    setProfileImage(user.image)
    user.image && (profileImageRef.current.src = user.image)
  }, [user.email, user.first_name, user.last_name, user.image])

  const onFileUploaderChange = (e) => {
    const imageData = new FormData()
    // console.log(e.target.files[0].arrayBuffer());
    imageData.append('profile', e.target.files[0], e.target.files[0].name)
    client('/api/profile-image', {
      method: 'PUT',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: imageData,
    }).then((res) => {
      if (res.status === 202) {
        const profileImageURL =
          API_PATH + res.data.image + '?' + new Date().getTime()
        // setProfileImage(profileImageURL);
        console.log(profileImageURL)
        profileImageRef.current.src = profileImageURL
        dispatch(
          setLoginDetails({
            ...user,
            image: res.data.image + '?' + new Date().getTime(),
          })
        )
        toast('Profile image changed successfully.', { ...toastConstant })
      } else {
        toast('Image upload unsuccessful.', { ...toastConstant })
      }
    })
  }

  const onSaveClick = (e) => {
    e.preventDefault()
    const splittedName = name.split(' ')
    const first_name = splittedName[0]
    splittedName.splice(0, 1)
    const last_name = splittedName.join(' ')
    if (name && email) {
      client('/api/users', {
        method: 'PUT',
        data: { first_name, last_name, fblink, instalink, address, phone },
      }).then((res) => {
        if (res.status === 202) {
          dispatch(setLoginDetails(res.data.user))
          toast('Profile Updated Successfully.', 'success')
          navigate(-1)
        }
      })
    } else {
      toast('Kindly fill all required fields', { ...toastConstant })
    }
  }

  return (
    <section id='protfolio_page' className='profile-page'>
      <div className='content-body'>
        <div className='page-title mb-4'>
          <div className='row'>
            <div className='col-12 col-lg-12'>
              <h2>Edit your profile</h2>
            </div>
          </div>
        </div>
        <div className='detail-block media d-lg-flex d-block'>
          <div className='media-left flex-shrink-0 mb-5 mb-lg-0'>
            <div className='profile-img text-center mx-lg-0 mx-auto'>
              <div className='attached'>
                <img
                  // src={profileImage ? profileImage : Avatar}
                  src={Avatar}
                  className='img-fluid ml-0'
                  style={{ borderRadius: '50%' }}
                  alt=''
                  ref={profileImageRef}
                />
                <button
                  name='file'
                  className='btn camera-btn'
                  onClick={() => fileUploaderRef.current.click()}
                >
                  <i className='fa fa-camera'></i>
                </button>
                <input
                  type='file'
                  id='upload'
                  name='file'
                  ref={fileUploaderRef}
                  onChange={onFileUploaderChange}
                />
              </div>
            </div>
            <h6 className='fs-16 fw-medium text-dark text-center mt-3'>
              {user.first_name + ' ' + user.last_name}
            </h6>
          </div>

          <div className='media-body flex-grow-1 ps-0 ps-lg-5 ms-0 ms-lg-3'>
            <form action=''>
              <div className='row form-group'>
                <div className='col-12 col-lg-10 col-xl-6'>
                  <label className='fs-14 fw-medium text-dark ms-4 ff-helve-normal'>
                    Name*
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div className='row form-group'>
                <div className='col-12 col-lg-10 col-xl-6'>
                  <label className='fs-14 fw-medium text-dark ms-4 ff-helve-normal'>
                    Email Address
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Email'
                    value={email}
                    // readOnly={true}
                    onChange={(e) => setEmail(email)}
                  />
                </div>
              </div>

              {!isAdmin && (
                <>
                  <div className='form-group position-relative'>
                    <div className='col-12 col-lg-10 col-xl-6'>
                      <label className='fs-14 fw-medium text-dark ms-4 ff-helve-normal'>
                        Phone*
                      </label>
                      <input
                        type='number'
                        className='form-control'
                        placeholder='Phone'
                        value={phone}
                        onChange={(e) =>
                          setPhone((prevState) => e.target.value)
                        }
                      />
                    </div>

                    {/* <div className="inputIcon">
              <FaPhone />
            </div> */}
                  </div>
                  <div className='form-group position-relative'>
                    <div className='col-12 col-lg-10 col-xl-6'>
                      <label className='fs-14 fw-medium text-dark ms-4 ff-helve-normal'>
                        Address*
                      </label>
                      <input
                        type='text'
                        className='form-control'
                        placeholder='Address'
                        value={address}
                        onChange={(e) =>
                          setaddress((prevState) => e.target.value)
                        }
                      />
                    </div>

                    {/* <div className="inputIcon">
              <FaPhone />
            </div> */}
                  </div>
                  <div className='form-group position-relative'>
                    <div className='col-12 col-lg-10 col-xl-6'>
                      <label className='fs-14 fw-medium text-dark ms-4 ff-helve-normal'>
                        Facebook Link*
                      </label>
                      <input
                        type='text'
                        className='form-control'
                        placeholder='Facebook Link'
                        value={fblink}
                        onChange={(e) =>
                          setfblink((prevState) => e.target.value)
                        }
                      />
                    </div>

                    {/* <div className="inputIcon">
              <FaPhone />
            </div> */}
                  </div>
                  <div className='form-group position-relative'>
                    <div className='col-12 col-lg-10 col-xl-6'>
                      <label className='fs-14 fw-medium text-dark ms-4 ff-helve-normal'>
                        Instagram Link*
                      </label>
                      <input
                        type='text'
                        className='form-control'
                        placeholder='Instagram Link'
                        value={instalink}
                        onChange={(e) =>
                          setinstalink((prevState) => e.target.value)
                        }
                      />
                    </div>

                    {/* <div className="inputIcon">
              <FaPhone />
            </div> */}
                  </div>
                </>
              )}
              <div className='row'>
                <div className='col-12 col-lg-10 col-xl-6'>
                  <div className='d-block d-sm-flex align-items-center justify-content-between'>
                    <button
                      className='btn btn-primary px-5 me-sm-3 mb-sm-0 mb-3 d-block'
                      onClick={onSaveClick}
                    >
                      Save
                    </button>
                    <Link
                      to='/ChangePassword'
                      className='fs-16 fw-bold text-purple ff-helve text-decoration-underline'
                    >
                      Change Password
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default UserProfile
