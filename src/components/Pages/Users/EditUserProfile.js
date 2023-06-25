import React, { useEffect, useRef, useState } from 'react'
import { client } from 'utils/utils'
import { toast } from 'react-toastify'
import { API_PATH } from 'constants'
import Avatar from 'assets/images/avatar.png'
import { toastConstant } from 'constants'
import { useDispatch, useSelector } from 'react-redux'
import { setLoginDetails, userSelector } from 'features/auth/authSlice'
import { useNavigate, useParams } from 'react-router-dom'
const EditUserProfile = () => {
  // const [file, setFile] = useState();
  // const [fileName, setFileName] = useState("");
  const { id: UserToGetId } = useParams()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [status, setStatus] = useState('')
  const [fetchedUser, setFetchedUser] = useState({})
  const [profileImage, setProfileImage] = useState()
  const fileUploaderRef = useRef(null)
  const profileImageRef = useRef(null)

  const navigate = useNavigate()

  const auth = useSelector(userSelector)
  const user = { ...auth.user }
  const isAdmin = user && user.is_admin

  useEffect(() => {
    if (!isAdmin) navigate('/')
    client('/api/user/' + UserToGetId).then(({ status, data: FetchedUser }) => {
      setFetchedUser(FetchedUser)
      setName(FetchedUser.first_name + ' ' + FetchedUser.last_name)
      setEmail(FetchedUser.email)
      setPhone(FetchedUser.phone)
      setStatus(FetchedUser.status ? 'Active' : 'Inactive')
      const profileImageURL =
        API_PATH + FetchedUser.image + '?' + new Date().getTime()
      profileImageRef.current.src = profileImageURL
    })
  }, [UserToGetId, isAdmin, navigate])

  const onFileUploaderChange = (e) => {
    const imageData = new FormData()
    // console.log(e.target.files[0].arrayBuffer());
    imageData.append('user_id', fetchedUser._id)
    imageData.append('profile', e.target.files[0], e.target.files[0].name)
    client('/api/change-user-image-by-admin', {
      method: 'PUT',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: imageData,
    }).then((res) => {
      if (res.status === 202) {
        const profileImageURL =
          API_PATH + res.data.image + '?' + new Date().getTime()
        profileImageRef.current.src = profileImageURL
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
      client('/api/users-edited-admin', {
        method: 'PUT',
        data: {
          user_id: fetchedUser._id,
          first_name,
          last_name,
          email,
          phone,
          status: status === 'Active' ? true : false,
        },
      }).then((res) => {
        if (res.status === 202) {
          toast(res.data.message, toastConstant)
          navigate('/users')
        }
      })
    } else {
      toast('Kindly fill all required fields', { ...toastConstant })
    }
  }

  const onSendResetLink = (e) => {
    e.preventDefault()
    if (email) {
      client('/api/adminsenduser-forget-password', {
        method: 'POST',
        data: {
          email,
        },
      })
        .then((res) => {
          if (res.status === 200) toast(res.data.message, toastConstant)
        })
        .catch((err) => {
          toast('Email not found', { type: 'error' })
        })
    }
  }

  return (
    <section id='protfolio_page' className='profile-page'>
      <div className='content-body'>
        <div className='page-title mb-4'>
          <div className='row'>
            <div className='col-12 col-lg-12'>
              <h2>User Profile</h2>
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
              {name}
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
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className='row form-group'>
                <div className='col-12 col-lg-10 col-xl-6'>
                  <label className='fs-14 fw-medium text-dark ms-4 ff-helve-normal'>
                    Phone #
                  </label>
                  <input
                    type='number'
                    className='form-control'
                    placeholder='Email'
                    value={phone}
                    // readOnly={true}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
              <div className='row form-group'>
                <div className='col-12 col-lg-10 col-xl-6'>
                  <label className='fs-14 fw-medium text-dark ms-4 ff-helve-normal'>
                    Status
                  </label>
                  <select
                    className='form-control border bg-white'
                    aria-label='Default select example'
                    value={status}
                    // readOnly={true}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value='Active'>Active</option>
                    <option value='Inactive'>Inactive</option>
                  </select>
                </div>
              </div>

              <div className='row'>
                <div className='col-12 col-lg-10 col-xl-6'>
                  <div className='d-block d-sm-flex align-items-center justify-content-between'>
                    <button
                      className='btn btn-primary px-5 me-sm-3 mb-sm-0 mb-3 d-block'
                      onClick={onSaveClick}
                    >
                      Save
                    </button>
                    <a
                      href='#'
                      className='fs-16 fw-bold text-purple ff-helve text-decoration-underline'
                      onClick={onSendResetLink}
                    >
                      Send link to reset password
                    </a>
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

export default EditUserProfile
