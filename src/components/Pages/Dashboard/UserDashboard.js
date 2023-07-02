import ChartImageTwo from 'assets/images/chart-2.png'
import DotOne from 'assets/images/dot-1.png'
import DotTwo from 'assets/images/dot-2.png'
import DotThree from 'assets/images/dot-3.png'
import PopularPackageChage from 'components/common/PopularPackageChart'
import { async } from 'q'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { client, timer } from 'utils/utils'
import { Parser } from 'html-to-react'

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

const UserDashboard = () => {
  const htmlToReactParser = new Parser()

  const [packagesSubscribed, setPackagesSubscribed] = useState()
  const [approvedPosts, setApprovedPosts] = useState()
  const [pendingPost, setPendingPost] = useState()
  const [recentPosts, setRecentPosts] = useState([])
  const TimerElem = useRef()
  const TimerInterval = useRef()
  const [time, settime] = useState()
  const [hour, sethour] = useState()
  const [minnute, setminute] = useState()
  const [statuss, setstatuss] = useState()
  const [userpackage, setuserpackage] = useState()

  const ChartDataFunction = (labels, data) => {
    return {
      labels: labels,
      datasets: [
        {
          label: 'Post Status',
          data: data,
          backgroundColor: ['#b600ff', '#602080', '#c785e9'],
          borderColor: ['#b600ff', '#602080', '#c785e9'],
          borderWidth: 1,
        },
      ],
    }
  }
  const [chartData, setChartData] = useState(ChartDataFunction([], []))
  useEffect(() => {
    console.log('TimerElem', TimerElem)
  }, [TimerElem])

  useEffect(() => {
    getUserDashboard()
    return () => {
      clearInterval(TimerInterval.current)
    }
  }, [])
  const getUserDashboard = async () => {
    const { status, data } = await client('/api/user-dashboard')
    console.log('data', data)
    if (status === 200) {
      setPackagesSubscribed(data.subscribedPackages.toString())
      setApprovedPosts(data.approvedPosts.toString())
      setPendingPost(data.pendingPosts.toString())
      setRecentPosts(data.recentPosts)
      console.log('data.chartData.subscribedPackages', data.subscribedPackages)
      setuserpackage(data.subscribedPackages)
      const LabelsForPieChart = Object.keys(data.chartData)
      const DataForPieChart = Object.values(data.chartData)
      setChartData(ChartDataFunction(LabelsForPieChart, DataForPieChart))
      TimerInterval.current = setInterval(() => {
        //  new Date(2023, 2, 9, 10, 10, 10)
        let ttime = new Date(data.timer)
        const month = ttime.getMonth()
        // ttime=`${months[month]} ${ttime.getDate()}, ${ttime.getFullYear()} ${ttime.getHours()}:${ttime.getMinutes()}:${ttime.getSeconds()}`
        ttime = String(ttime)
        console.log('ttime', ttime)
        const timerObject = timer(new Date(), new Date(data.timer))
        console.log('timerObject', timerObject)
        settime(timerObject.seconds)
        sethour(timerObject.hours)
        setminute(timerObject.minutes)
        setstatuss(timerObject.status)
        TimerElem.current.innerHTML = timerObject.status
          ? timerObject.hours +
            ' : ' +
            timerObject.minutes +
            ' : ' +
            timerObject.seconds
          : timerObject.message
      }, 1000)
    } else {
      setPackagesSubscribed('0')
      setApprovedPosts('0')
      setPendingPost('0')
      toast('An error occured!')
    }
    console.log('TimerElem', TimerElem)
  }
  useEffect(() => {
    console.log('statuss', statuss)
  }, [statuss])

  return (
    <section id='configuration' className='dashboard'>
      <div className='row'>
        <div className='col-12'>
          <div className='content-body'>
            <div className='page-title mb-0'>
              <div className='row align-items-center mb-4'>
                <div className='col-lg-8'>
                  <h2 className='mb-4'>Dashboard</h2>
                  <div className='row mb-3'>
                    <div className='col-lg-6 mb-3'>
                      <div className='dashboardPackageBox text-center'>
                        <div className='dashboardPackageHeader bg-purple'>
                          <h6 className='fs-16 fw-bold text-white ff-helve mb-0'>
                            Packages Subscribed
                          </h6>
                        </div>
                        <div className='dashboardPackageBody'>
                          <h3 className='fs-35 text-dark fw-bold mb-0 ff-helve'>
                            {packagesSubscribed
                              ? packagesSubscribed
                              : 'Loading...'}
                          </h3>
                        </div>
                      </div>
                    </div>
                    <div className='col-lg-6 mb-3'>
                      <div className='dashboardPackageBox text-center'>
                        <div className='dashboardPackageHeader bg-purple1'>
                          <h6 className='fs-16 fw-bold text-white ff-helve mb-0'>
                            Approved Posts
                          </h6>
                        </div>
                        <div className='dashboardPackageBody'>
                          <h3 className='fs-35 text-dark fw-bold mb-0 ff-helve'>
                            {approvedPosts ? approvedPosts : 'Loading...'}
                          </h3>
                        </div>
                      </div>
                    </div>
                    <div className='col-lg-6 mb-3'>
                      <div className='dashboardPackageBox text-center'>
                        <div className='dashboardPackageHeader bg-purple2'>
                          <h6 className='fs-16 fw-bold text-white ff-helve mb-0'>
                            Posts Pending Approval
                          </h6>
                        </div>
                        <div className='dashboardPackageBody'>
                          <h3 className='fs-35 text-dark fw-bold mb-0 ff-helve'>
                            {pendingPost ? (
                              <>
                                {pendingPost + ' '}{' '}
                                <Link
                                  to='/forms'
                                  className='fs-16 text-purple ff-helve-normal'
                                >
                                  View
                                </Link>
                              </>
                            ) : (
                              'Loading...'
                            )}
                          </h3>
                        </div>
                      </div>
                    </div>
                    <div className='col-lg-6'>
                      <Link to='/forms'>
                        <div className='dashboardPackageBox text-center'>
                          <div className='dashboardPackageHeader bg-purple3'>
                            <h6 className='fs-16 fw-bold text-white ff-helve mb-0'>
                              Complete Form in
                            </h6>
                          </div>
                          <div className='dashboardPackageBody'>
                            {/* {userpackage == 0 ? (
                              <h3
                                className='fs-35 text-dark fw-bold mb-0 ff-helve'
                                id='demo'
                              >
                                N/A
                              </h3>
                            ) : ( */}
                            <h3
                              className='fs-35 text-dark fw-bold mb-0 ff-helve'
                              ref={TimerElem?.current}
                              id='demo'
                            >
                              {typeof minnute === 'number' &&
                              !Number.isNaN(minnute)
                                ? hour + ' : ' + minnute + ' : ' + time
                                : 'Expired'}
                            </h3>
                            {/* )} */}
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                  <Link
                    to='/forms'
                    className='fs-20 fw-bold text-purple text-decoration-underline'
                  >
                    Click to Complete Form Now!
                  </Link>
                </div>
                <div className='col-lg-4'>
                  <h6 className='fs-16 fw-medium ff-helve text-dark text-center mb-3'>
                    Post Ratio
                  </h6>
                  <PopularPackageChage chartData={chartData} />
                  {/* <img
                    src={ChartImageTwo}
                    alt=""
                    className="img-fluid w-100 mb-4"
                  /> */}
                  {/* <div>
                    <h6 href="#" className="fs-16 text-dark ff-helve fw-bold">
                      Legends:
                    </h6>
                    <div className="d-flex align-items-center">
                      <div className="me-3">
                        <img
                          src={DotOne}
                          alt=""
                          className="img-fluid d-inline-block me-2"
                        />
                        <h6 className="fs-16 fw-medium text-dark ff-helve d-inline-block">
                          Approved
                        </h6>
                      </div>
                      <div className="me-3">
                        <img
                          src={DotTwo}
                          alt=""
                          className="img-fluid d-inline-block me-2"
                        />
                        <h6 className="fs-16 fw-medium text-dark ff-helve d-inline-block">
                          Pending
                        </h6>
                      </div>
                      <div className="me-3">
                        <img
                          src={DotThree}
                          alt=""
                          className="img-fluid d-inline-block me-2"
                        />
                        <h6 className="fs-16 fw-medium text-dark ff-helve d-inline-block">
                          Rejected
                        </h6>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
            <div className='card shadow-none bg-transparent p-0 d-block card-chart border-none align-items-center'>
              <div className='card-header d-block d-sm-flex justify-content-between bg-transparent border-0 p-0 '>
                <h3 className='fw-bold mb-0 align-self-center'>Recent Posts</h3>
              </div>
              <div className='card-body p-0'>
                <div className='chartbox position-relative text-center'>
                  <div className='main-tabble table-responsive'>
                    <table className='table table-borderless dataTable'>
                      <thead>
                        <tr>
                          <th className='sorting'>Post ID</th>
                          <th className='sorting'>Title</th>
                          <th className='sorting'>Description</th>
                          <th className='sorting'>Post Medium</th>
                          <th className='sorting'>Status</th>
                          <th className='sorting'>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentPosts.length ? (
                          recentPosts.map((post) => (
                            <tr key={post._id}>
                              <td>{post._id}</td>
                              <td>{post.title}</td>
                              <td>
                                {htmlToReactParser.parse(post.description)}
                              </td>
                              <td>{post.post_medium}</td>
                              <td>{post.status}</td>
                              <td>
                                <Link
                                  to={`/post/edit/${post.order}/${post._id}`}
                                >
                                  <span className='status active'>View</span>
                                </Link>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan='10'>No post found.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default UserDashboard
