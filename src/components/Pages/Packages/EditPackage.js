import { userSelector } from 'features/auth/authSlice'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { client } from 'utils/utils'

const EditPackage = () => {
  const { user } = useSelector(userSelector)
  const isAdmin = user && user.is_admin
  const Navigate = useNavigate()
  const { id } = useParams()
  const [name, setname] = useState('')
  const [price, setprice] = useState('')
  const [description, setdescription] = useState('')
  const [totalposts, settotalposts] = useState('')
  const [duration, setduration] = useState('')

  useEffect(() => {
    if (!isAdmin) Navigate('/')
    client(`/api/packages/${id}`).then((res) => {
      const { data } = res
      setname(data.name)
      setprice(data.price)
      setdescription(data.description)
      settotalposts(data.totalposts)
      setduration(data.duration)
    })
  }, [isAdmin, Navigate, id])

  const HandleClick = async () => {
    try {
      const res = await client('/api/packages/edit', {
        method: 'POST',
        data: {
          id,
          name,
          price,
          description,
          totalposts,
          duration,
        },
      })
      toast('Package Edited Successfully.', 'success')
      Navigate('/packages')
    } catch (error) {
      alert('something went wrong!')
    }
  }

  return (
    <section id='change_password' className='my-profile'>
      <div className='content-body'>
        <div className='page-title mb-4'>
          <div className='row'>
            <div className='col-12 col-lg-12'>
              <h2>Pacakge Detail</h2>
            </div>
          </div>
        </div>
        <div className='row justify-content-center'>
          <div className='col-xl-6 col-lg-8 col-md-10'>
            <div className='mb-3'>
              <label className='fs-14 fw-medium text-dark ms-4 ff-helve-normal'>
                Name
              </label>
              <input
                type='text'
                className='form-control border'
                placeholder='Name'
                value={name}
                onChange={(e) => {
                  setname(e.target.value)
                }}
              />
            </div>
            <div className='mb-3'>
              <label className='fs-14 fw-medium text-dark ms-4 ff-helve-normal'>
                Price
              </label>
              <input
                type='number'
                className='form-control border'
                placeholder='Price'
                value={price}
                onChange={(e) => {
                  setprice(e.target.value)
                }}
              />
            </div>
            <div className='mb-3'>
              <label className='fs-14 fw-medium text-dark ms-4 ff-helve-normal'>
                Total Posts
              </label>
              <input
                type='number'
                className='form-control border'
                placeholder='totalposts'
                value={totalposts}
                onChange={(e) => {
                  settotalposts(e.target.value)
                }}
              />
            </div>
            <div className='mb-3'>
              <label className='fs-14 fw-medium text-dark ms-4 ff-helve-normal'>
                Duration(in Months)
              </label>
              <input
                type='number'
                className='form-control border'
                placeholder='duration'
                value={duration}
                onChange={(e) => {
                  setduration(e.target.value)
                }}
              />
            </div>
            {/* <div className="mb-3">
              <label className="fs-14 fw-medium text-dark ms-4 ff-helve-normal">
                Payment Type
              </label>
              <input
                type="text"
                className="form-control border"
                disabled=""
                placeholder="Recurring"
                value={paymentType}
              />
            </div> */}
            <button className='btn btn-primary px-5' onClick={HandleClick}>
              Edit
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EditPackage
