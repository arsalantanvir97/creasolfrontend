import { userSelector } from 'features/auth/authSlice'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { client } from 'utils/utils'
import { Parser } from 'html-to-react'

const PostListing = () => {
  const htmlToReactParser = new Parser()

  const { id: OrderId } = useParams()
  const [Order, setOrder] = useState(null)
  let { user } = useSelector(userSelector)
  user = user === null ? {} : user
  const isAdmin = user && user.is_admin

  useEffect(() => {
    client(`/api/order/${OrderId}`).then((order) => {
      console.log(order.data)
      setOrder(order.data)
      console.log(Order)
    })
  }, [])

  // useEffect(() => {
  // console.log('Order?.current_period_end',moment(),moment(Order?.current_period_end),moment()>moment(Order?.current_period_end)?'yes':'no')
  // }, [Order])

  return (
    <section id='user_page' className='user-page'>
      <div className='content-body'>
        <div className='page-title mb-4'>
          <div className='row'>
            <div className='col-12'>
              <h2>
                {isAdmin ? 'Order Listing / Post Listing' : 'Order Detail'}
              </h2>
            </div>
          </div>
        </div>
        {isAdmin && moment(Order?.current_period_end) > moment() ? (
          <div className='mb-4 text-end'>
            <Link to={`/post/add/${OrderId}`} className='btn btn-primary'>
              Add Post
            </Link>
          </div>
        ) : Order ? (
          <>
            <div className='row mb-3'>
              <div className='col-lg-6 mb-lg-0 mb-3'>
                <label className='fs-14 fw-medium text-dark ms-4 ff-helve-normal'>
                  Order ID
                </label>
                <input
                  type='text'
                  className='form-control bg-gray border'
                  readOnly={true}
                  value={Order._id}
                />
              </div>
              <div className='col-lg-6'>
                <label className='fs-14 fw-medium text-dark ms-4 ff-helve-normal'>
                  Customer Name
                </label>
                <input
                  type='text'
                  className='form-control bg-gray border'
                  readOnly={true}
                  value={Order.user.first_name + ' ' + Order.user.last_name}
                />
              </div>
            </div>
            <div className='row mb-4'>
              <div className='col-lg-6 mb-lg-0 mb-3'>
                <label className='fs-14 fw-medium text-dark ms-4 ff-helve-normal'>
                  Phone #
                </label>
                <input
                  type='text'
                  className='form-control bg-gray border'
                  readOnly={true}
                  value={Order.user.phone}
                />
              </div>
              <div className='col-lg-6'>
                <label className='fs-14 fw-medium text-dark ms-4 ff-helve-normal'>
                  Package
                </label>
                <input
                  type='text'
                  className='form-control bg-gray border'
                  readOnly={true}
                  value={Order.pkg_name}
                />
              </div>
            </div>
          </>
        ) : (
          ''
        )}

        <div className='dataTables_wrapper'>
          <div className='main-tabble table-responsive mx-n2'>
            <table className='table table-borderless dataTable px-2'>
              <thead>
                <tr>
                  <th className='sorting'>Post ID</th>
                  <th className='sorting'>Title</th>
                  <th className='sorting'>Description</th>
                  <th className='sorting'>Post Medium</th>
                  <th className='sorting'>Status</th>
                  <th className='sorting'>Action</th>
                </tr>
              </thead>
              <tbody>
                {Order ? (
                  Order.posts.length ? (
                    Order.posts.map((post) => (
                      <tr key={post._id}>
                        <td>{post._id}</td>
                        <td>{post.title}</td>
                        <td>
                          {htmlToReactParser.parse(
                            post.description.slice(0, 14)
                          )}
                        </td>
                        <td>{post.post_medium}</td>
                        <td>{post.status}</td>
                        <td>
                          <Link to={`/post/edit/${Order._id}/${post._id}`}>
                            <span className='status active'>View</span>
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className='text-center' colSpan='10'>
                        No posts added.
                      </td>
                    </tr>
                  )
                ) : (
                  <tr>
                    <td colSpan='10'>Loading...</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PostListing
