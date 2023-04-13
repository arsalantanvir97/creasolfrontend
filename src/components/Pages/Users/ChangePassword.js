import { useState } from "react";
import { FaRegEnvelope, FaKey, FaEyeSlash, FaEye } from "react-icons/fa";
import { Link,useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "features/auth/authSlice";
import { toast } from "react-toastify";
import { setLoginDetails, userSelector } from "features/auth/authSlice";
import { API_PATH } from "constants";
import axios from "axios";

const ChangePassword = ({history}) => {
  const navigate = useNavigate();

  const [existingpassword, setexistingpassword] = useState("");
  const [newpassword, setnewpassword] = useState("");
  const [confirm_password, setconfirm_password] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);
  const [email, setEmail] = useState("");

  const auth = useSelector(userSelector);
  const user = { ...auth.user };


  const dispatch = useDispatch();
  const onLoginSubmit = async (e) => {
    e.preventDefault();
    if(confirm_password !==newpassword){
      toast("Password does not match", { type: 'error' });

    }
    else if (newpassword && confirm_password &&existingpassword) {
      // dispatch(loginUser({ email, password }));
      const response = await axios(`${API_PATH}/api/updatepassword`, {
        method: "POST",
        data: {
          newpassword,
          confirm_password,
          existingpassword,
          email:user.email
        },
      });
      if (response.status === 200) {
        
        toast("Password Updated Successfully", { type: 'success' });
        navigate(-1)      }

    } else {
      toast("Please fill required fields", { type: 'error' });
    }
  };
  return (
    <div className="login-card bg-img p-0">
      <div className="right">
        <h1 className="ff-helve mb-5">Password Update</h1>
        <form onSubmit={onLoginSubmit}>
        <div className="form-group mb-1">
            <div className="position-relative">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control pass-input"
                placeholder="Current  Password"
                value={existingpassword}
                onChange={(e) => setexistingpassword((prevState) => e.target.value)}
              />
              <div className="inputIcon">
                <FaKey />
              </div>
              <button
                className="btn view-btn position-absolute"
                onClick={(e) => {
                  e.preventDefault();
                  setShowPassword((prevState) => !prevState);
                }}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>
          <div className="form-group mb-1">
            <div className="position-relative">
              <input
                type={showPassword2 ? "text" : "password"}
                className="form-control pass-input"
                placeholder="New Password"
                value={newpassword}
                onChange={(e) => setnewpassword((prevState) => e.target.value)}
              />
              <div className="inputIcon">
                <FaKey />
              </div>
              <button
                className="btn view-btn position-absolute"
                onClick={(e) => {
                  e.preventDefault();
                  setShowPassword2((prevState) => !prevState);
                }}
              >
                {showPassword2 ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>
          <div className="form-group mb-1">
            <div className="position-relative">
              <input
                type={showPassword3 ? "text" : "password"}
                className="form-control pass-input"
                placeholder="Confirm Password"
                value={confirm_password}
                onChange={(e) => setconfirm_password((prevState) => e.target.value)}
              />
              <div className="inputIcon">
                <FaKey />
              </div>
              <button
                className="btn view-btn position-absolute"
                onClick={(e) => {
                  e.preventDefault();
                  setShowPassword3((prevState) => !prevState);
                }}
              >
                {showPassword3 ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>
          <div className="form-group mt-3 mb-0">
            <div className="d-flex align-items-center justify-content-between">
              <div className="form-group text-center mb-0">
                <button
                  type="sumit"
                  className="btn btn-primary btn-login fw-bold"
                >
                  Update
                </button>
              </div>
              {/* <div className="forgot-pass">
                <h6 className="ff-helve fs-14 fw-medium text-dark mb-0 d-flex justify-content-end">
                  <Link
                    className="ff-helve fs-14 fw-medium text-purple"
                    to="/register"
                  >
                    Register Here
                  </Link>
                </h6>
                <h6 className="ff-helve fs-14 fw-medium text-dark mb-0">
                  forgot your password?{" "}
                  <Link
                    to="/password-recovery"
                    className="ff-helve fs-14 fw-medium text-purple"
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
  );
};

export default ChangePassword;
