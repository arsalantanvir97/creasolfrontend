import { Outlet } from "react-router-dom";
import LogoAdmin from "assets/images/logo-admin.png";
const AuthLayout = () => {
  return (
    <section className="login-wrap">
      <div className="container">
        <div className="row">
          <div className="col-12 col-xl-8 mx-auto">
            <div className="logo text-center mb-5">
              <img src={LogoAdmin} alt="" />
            </div>
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthLayout;
