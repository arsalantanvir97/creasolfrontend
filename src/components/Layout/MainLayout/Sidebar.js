import DashboardIcon from 'assets/images/nav-icon-1.png'
import UsersIcon from 'assets/images/nav-icon-2.png'
import PackagesIcon from 'assets/images/nav-icon-3.png'
import OrderIcon from 'assets/images/nav-icon-4.png'
import PaymentLogIcon from 'assets/images/nav-icon-5.png'
import ContactAdminIcon from 'assets/images/nav-icon-6.png'
import { userSelector } from 'features/auth/authSlice'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'

const Sidebar = () => {
  const { user } = useSelector(userSelector)

  const isAdmin = user && user.is_admin

  //assigning location variable
  const location = useLocation()

  //destructuring pathname from location
  const { pathname } = location

  //Javascript split method to get the name of the path in array
  const pageName = pathname.split('/')[1]
  return (
    <div id='sidebar-wrapper'>
      <div
        className='main-menu menu-fixed menu-light menu-accordion'
        data-scroll-to-active='true'
      >
        <div className='main-menu-content'>
          <ul
            className='navigation navigation-main'
            id='main-menu-navigation'
            data-menu='menu-navigation'
          >
            <li className={`nav-item ${pageName === '' ? 'active' : ''}`}>
              <Link to='/' className='mm-next'>
                <img src={DashboardIcon} alt='' className='img-fluid me-2' />
                <span className='menu-title'>Dashboard</span>
              </Link>
            </li>
            {isAdmin && (
              <li
                className={`nav-item ${pageName === 'users' ? 'active' : ''}`}
              >
                <Link to='users'>
                  <img src={UsersIcon} alt='' className='img-fluid me-2' />
                  <span className='menu-title'>Users</span>
                </Link>
              </li>
            )}
            <li
              className={`nav-item ${pageName === 'packages' ? 'active' : ''}`}
            >
              <Link to='packages' className='mm-next'>
                <img src={PackagesIcon} alt='' className='img-fluid me-2' />
                <span className='menu-title'>Packages</span>
              </Link>
            </li>
            <li className={`nav-item ${pageName === 'orders' ? 'active' : ''}`}>
              <Link to='orders' className='mm-next'>
                <img src={OrderIcon} alt='' className='img-fluid me-2' />
                <span className='menu-title'>Order</span>
              </Link>
            </li>
            <li
              className={`nav-item ${
                pageName === 'payment-log' ? 'active' : ''
              }`}
            >
              <Link to='payment-log' className='mm-next'>
                <img src={PaymentLogIcon} alt='' className='img-fluid me-2' />
                <span className='menu-title'>Payment Log</span>
              </Link>
            </li>
            <li
              className={`nav-item ${
                pageName === 'customer-feedback' ? 'active' : ''
              }`}
            >
              <Link to='customer-feedback' className='mm-next'>
                <img src={ContactAdminIcon} alt='' className='img-fluid me-2' />
                <span className='menu-title'>
                  {isAdmin ? 'Feedback' : 'Contact Admin'}
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
