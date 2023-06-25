import { userSelector } from 'features/auth/authSlice'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { client } from 'utils/utils'
import { toast } from 'react-toastify'
import { toastConstant } from 'constants'
import { API_PATH } from 'constants'
import { format } from 'date-fns'
import { Editor } from '@tinymce/tinymce-react'
import { Parser } from 'html-to-react'
import OnlineAvatar from 'assets/images/online-avatar.png'

// Getting Images
import img1 from 'assets/images/img-1.png'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
const htmlToReactParser = new Parser()

const AddEditPost = ({ mode, OrderId, PostId }) => {
  const [title, setTitle] = useState('')
  const [medium, setMedium] = useState('Facebook')
  const [status, setstatus] = useState('')

  const [description, setDescription] = useState('')
  const [comment, setComment] = useState('')
  let { user } = useSelector(userSelector)
  user = user === null ? {} : user
  const isAdmin = user && user.is_admin
  console.log('user?.image', user?.image)
  const userImage =
    user && user?.image?.includes('undefined') ? null : user.image

  const isAdding = mode === 'Add'
  const [isLoading, setIsLoading] = useState(false)
  const [post, setPost] = useState()
  const [comments, setComments] = useState([])
  const [images, setImages] = useState([])
  const [binaryImages, setBinaryImages] = useState([])
  const FileUploader = useRef()
  const navigation = useNavigate()
  const editorRef = useRef(null)

  useEffect(() => {
    if (!isAdding) {
      client(`/api/post/${PostId}`).then(({ status, data: post }) => {
        post = { ...post, images: post.images.map((i) => API_PATH + i) }
        if (status === 200) {
          setPost(post)
          setComments(post.comments)
          setTitle(post.title)
          setstatus(post.status)

          setMedium(post.post_medium)
          setDescription(post.description)
          setImages(post.images)
        }
      })
    }
  }, [isAdding])
  useEffect(() => {
    const array = [1, 2, 3, 4, 5]
    const indexToRemove = 3 // Index of the element to remove

    // Remove the element at the specified index
    array.splice(indexToRemove, 1)

    console.log(array) // Output: [1, 2, 4, 5]
  }, [])
  useEffect(() => {
    console.log('binaryImages', binaryImages)
  }, [binaryImages])

  const HandleSubmit = async (e) => {
    setIsLoading(true)
    if (isAdding) {
      const data = new FormData()
      data.append('OrderId', OrderId)
      data.append('title', title)
      data.append('description', description)
      data.append('status', 'Pending Approval')
      data.append('post_medium', medium)

      // const data = {
      //   OrderId,
      //   title,
      //   description,
      //   status: "Pending Approval",
      //   post_medium: medium,
      // };

      for (let i = 0; i < binaryImages.length; i++) {
        let file = binaryImages[i]
        data.append(`profile[${i}]`, file, file.name)
      }

      try {
        const post = await client('/api/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          data,
        })
        if (post.status === 201) {
          toast('Post has been created successfully!', toastConstant)
        }
      } catch (error) {
        console.log(error)
        toast('An error occured!', { ...toastConstant, type: 'error' })
      }
    } else {
      const data = {
        title,
        description,
        status: 'Pending Approval',
        post_medium: medium,
      }
      if (!isAdmin) {
        delete data.title
        delete data.post_medium
        data.status = 'Approved'
      }
      try {
        const post = await client(`/api/post/${PostId}`, {
          method: 'PUT',
          data,
        })
        if (post.status === 204) {
          toast('Post is sent for approval', toastConstant)
        }
      } catch (error) {
        console.log(error)
        if (error.response.status === 400) {
          toast(error.response.data.message, toastConstant)
        } else {
          toast('An error occured!', toastConstant)
        }
      }
    }
    setIsLoading(false)
    await navigation(-1)
  }

  const HandleComment = async (e) => {
    const data = {
      user: user._id,
      post: post._id,
      text: comment,
    }
    try {
      const fetchedComment = await client('/api/comment', {
        method: 'POST',
        data,
      })
      setComment('')
      if (fetchedComment.status === 201 && !isAdmin) {
        setComments((prevState) => [...prevState, fetchedComment.data])
        setPost((prevState) => {
          prevState.status = 'Rejected with Comments'
          return prevState
        })
      }
      navigation(-1)
    } catch (error) {
      console.log(error)
    }
  }

  const HandleFileSubmit = async (e) => {
    if (images?.length >= 5) {
      return toast('Only 5 pictures could be uploaded', {
        ...toastConstant,
        type: 'error',
      })
    }
    const files = e.target.files
    const imageData = new FormData()
    console.log('filess', files)
    if (!PostId) {
      for (let i = 0; i < files.length; i++) {
        let file = files.item(i)
        // imageData.append(`profile[${i}]`, file, file.name);
        setBinaryImages([...binaryImages, file])
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function () {
          setImages([...images, reader.result])
        }
      }
      return
    }

    for (let i = 0; i < files.length; i++) {
      console.log('filesfiles', files)
      let file = files.item(i)
      imageData.append(`profile[${i}]`, file, file.name)
    }
    console.log('imageData', imageData)
    try {
      const res = await client(`/api/post-images/${PostId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: imageData,
      })
      console.log('ress', res)
      // console.log("status", res.status);
      // console.log(res);
      if (res.status === 200) {
        const images = res.data.images.map((i) => API_PATH + i)
        setImages(images)
        toast(res.data.message, toastConstant)
      }
    } catch (error) {
      if (error.response.status === 400) {
        toast(error.response.data.message, { ...toastConstant, type: 'error' })
      } else {
        console.log(error)
        toast('An error occured', { ...toastConstant, type: 'error' })
      }
    }
  }
  const editorHandler = (value) => {
    setDescription(value)
  }
  const deletefile = async (index) => {
    if (!PostId) {
      const temp_data = [...images]
      temp_data.splice(index, 1)
      binaryImages.splice(index, 1)
      console.log('tempdata', temp_data)
      setImages(temp_data)
    } else {
      console.log('index', index)
      try {
        const res = await axios(`${API_PATH}/api/delete-image/${PostId}`, {
          method: 'PUT',

          data: { index },
        })
        console.log('ress', res)
        // console.log("status", res.status);
        // console.log(res);
        if (res.status === 200) {
          const temp_data = [...images]
          temp_data.splice(index, 1)
          console.log('tempdata', temp_data)
          setImages(temp_data)

          toast(res.data.message, toastConstant)
        }
      } catch (error) {
        if (error.response.status === 400) {
          toast(error.response.data.message, {
            ...toastConstant,
            type: 'error',
          })
        } else {
          console.log(error)
          toast('An error occured', { ...toastConstant, type: 'error' })
        }
      }
    }
  }
  return (
    <>
      <div className='page-title mb-4'>
        <div className='row'>
          <div className='col-12'>
            <div className='d-flex align-items-center justify-content-between'>
              <h2 className='mb-0'>
                {isAdding ? 'Add Post Details' : 'Post Details'}{' '}
              </h2>
              <div>
                <h6 className='fs-14 fw-medium text-dark ff-helve'>Status</h6>
                <input
                  type='text'
                  className='form-control border'
                  readOnly
                  value={post ? post.status : 'In Process'}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='row mb-4'>
        {isAdmin && status !== 'Approved' ? (
          <div className='col-xl-2 col-lg-3 col-md-4 col-sm-6 mb-xl-0 mb-3'>
            <input
              type='file'
              name='postfiles'
              id='postfiles'
              ref={FileUploader}
              onChange={HandleFileSubmit}
              multiple
              className='d-none'
            />
            <img
              src={img1}
              alt=''
              className='img-fluid w-100'
              onClick={() => {
                FileUploader.current.click()
              }}
            />
          </div>
        ) : (
          ''
        )}

        {images
          ? images.map((image, index) => (
              <div className='col-xl-2 col-lg-3 col-md-4 col-sm-6 mb-xl-0 mb-3'>
                <div className='position-relative'>
                  <img
                    src={image}
                    // src={API_PATH + image}
                    alt=''
                    className='img-fluid w-100'
                  />
                  {isAdmin ? (
                    <span
                      href='#'
                      onClick={() => {
                        deletefile(index)
                      }}
                      className='deleteBtn'
                    >
                      <i className='fas fa-times'></i>
                    </span>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            ))
          : ''}
      </div>
      <div className='row mb-3'>
        <div className='col-md-6 mb-md-0 mb-3'>
          <label className='fs-14 fw-medium text-dark ms-4 ff-helve-normal'>
            Title
          </label>

          <input
            type='text'
            disabled={status == 'Approved' && true}
            className={`form-control ${!isAdmin ? 'border' : ''}`}
            placeholder='Post Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            readOnly={!isAdmin}
          />
        </div>
        <div className='col-md-6'>
          <label className='fs-14 fw-medium text-dark ms-4 ff-helve-normal'>
            Post Medium
          </label>
          {isAdmin && status !== 'Approved' ? (
            <select
              value={medium}
              onChange={(e) => setMedium(e.target.value)}
              className='form-control'
            >
              <option>Select</option>

              <option value='Facebook'>Facebook</option>
              <option value='Instagram'>Instagram</option>
            </select>
          ) : (
            <p className='ms-4'> {medium}</p>
          )}
          {/* <input
                      disabled={status=='Approved' && true}

            type="text"
            className={`form-control ${!isAdmin ? "border" : ""}`}
            placeholder="Post Medium"
            value={medium}
            onChange={(e) => setMedium(e.target.value)}
            readOnly={!isAdmin}
          /> */}
        </div>
      </div>
      <div className='row'>
        <div className='col-12'>
          <div className='mb-3'>
            <label className='fs-14 fw-medium text-dark ms-4 ff-helve-normal'>
              Description
            </label>
            {isAdmin && status !== 'Approved' ? (
              <Editor
                onInit={(evt, editor) => (editorRef.current = editor)}
                init={{
                  height: 500,
                  menubar: true,
                  plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount',
                  ],
                  toolbar:
                    'undo redo | formatselect | ' +
                    'fontsizeselect | bold italic backcolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                  content_style:
                    'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                }}
                value={description}
                onEditorChange={(value) => editorHandler(value)}
              />
            ) : (
              <p className='ms-4'> {htmlToReactParser.parse(description)}</p>
            )}
            {/* <textarea
              className={`form-control ${!isAdmin ? "border" : ""}`}
              rows="8"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              readOnly={!isAdmin}
            ></textarea> */}
          </div>
          {isAdmin == true ? null : (!isAdmin && status == 'Approved') ||
            status == 'Rejected with Comments' ? null : (
            <button
              className='btn btn-primary'
              disabled={isLoading}
              onClick={HandleSubmit}
            >
              {isLoading
                ? 'Sending...'
                : isAdmin
                ? 'Submit for Approval'
                : 'Approve'}
            </button>
          )}
          {isAdmin == false ? null : isAdmin && status == 'Approved' ? null : (
            <button
              className='btn btn-primary'
              disabled={isLoading}
              onClick={HandleSubmit}
            >
              {isLoading
                ? 'Sending...'
                : isAdmin
                ? 'Submit for Approval'
                : 'Approve'}
            </button>
          )}
        </div>
      </div>
      {/* Comment Row will only show when the post is editing*/}
      {!isAdding && (
        <div className='row mt-4'>
          <div className='col-12'>
            <h5 className='fs-18 fw-medium text-dark ff-helve mb-3'>
              Comments
            </h5>
            {comments.length
              ? comments.map((com) => (
                  <div
                    className='commentSection d-flex pb-3 mb-3'
                    key={com._id}
                  >
                    <div className='commentImg flex-shrink-0 me-3'>
                      <img
                        src={API_PATH + com.user.image}
                        alt=''
                        className='img-fluid'
                      />
                    </div>
                    <div className='commentContect'>
                      <div className='mb-3'>
                        <h6 className='fs-16 fw-bold text-purple'>
                          {com.user.first_name + ' ' + com.user.last_name}
                        </h6>
                        <h6 className='fs-14 fw-medium text-gray'>
                          {format(
                            new Date(com.createdAt),
                            'hh:mm a - dd MMMM yyyy'
                          )}
                        </h6>
                      </div>
                      <p className='fs-16 fw-medium text-gray mb-0'>
                        {com.text.split('\n').map((value) => (
                          <span className='d-block'>{value}</span>
                        ))}
                      </p>
                    </div>
                  </div>
                ))
              : ''}
            {status == 'Approved' ? null : (
              <div className='commentSection d-flex pb-3 mb-3'>
                <div className='commentImg flex-shrink-0 me-3'>
                  <img
                    src={userImage ? `${userImage}` : OnlineAvatar}
                    alt=''
                    className='img-fluid'
                  />
                </div>
                <div className='commentContect flex-grow-1'>
                  <div className='mb-3'>
                    <h6 className='fs-16 fw-bold text-purple'>
                      {user.first_name + ' ' + user.last_name}
                    </h6>
                  </div>
                  <div className='mb-3'>
                    {status == 'Approved' ? null : (
                      <textarea
                        className='form-control'
                        rows='5'
                        placeholder='Add a Comment'
                        disabled={status == 'Approved' && true}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                    )}
                  </div>
                  {isAdmin == true ? null : (!isAdmin &&
                      status == 'Approved') ||
                    status == 'Rejected with Comments' ? null : (
                    <button className='btn btn-primary' onClick={HandleComment}>
                      {isAdmin ? 'Send' : 'Reject With Comments'}
                    </button>
                  )}
                  {isAdmin == false ? null : isAdmin &&
                    status == 'Approved' ? null : (
                    <button className='btn btn-primary' onClick={HandleComment}>
                      {isAdmin ? 'Send' : 'Reject With Comments'}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default AddEditPost
