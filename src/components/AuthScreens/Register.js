import { useState } from "react";
import {
  FaRegEnvelope,
  FaKey,
  FaEyeSlash,
  FaEye,
  FaUser,
  FaPhone,
} from "react-icons/fa";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "features/auth/authSlice";
import { ToastContainer, toast } from "react-toastify";
import { toastConstant } from "constants";
import { client } from "utils/utils";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState("");
  const dispatch = useDispatch();
  //   const state = useSelector(userSelector);
  const user = useSelector((state) => state.user);

  const Navigate = useNavigate();

  window.client = client;

  const onRegisterSubmit = (e) => {
    e.preventDefault();
    if(password !==confirmPassword){
      toast("👤 Password don't match", {
        ...toastConstant,
       
      });
    }else{
    const data = {
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      password,
    };
    dispatch(registerUser(data)).then((request) => {
      toast("👤 Registration success!", {
        ...toastConstant,
        onClose: () => {
          Navigate("/");
        },
      });
    });}
  };

  return (
    <div className="login-card bg-img p-0">
      <div className="right">
        <h1 className="ff-helve mb-5">Register</h1>
        <form onSubmit={onRegisterSubmit}>
          <div className="form-group position-relative">
            <input
              type="text"
              className="form-control"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName((prevState) => e.target.value)}
            />
            <div className="inputIcon">
              <FaUser />
            </div>
          </div>
          <div className="form-group position-relative">
            <input
              type="text"
              className="form-control"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName((prevState) => e.target.value)}
            />
            <div className="inputIcon">
              <FaUser />
            </div>
          </div>
          <div className="form-group position-relative">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail((prevState) => e.target.value)}
            />
            <div className="inputIcon">
              <FaRegEnvelope />
            </div>
          </div>
          <div className="form-group position-relative">
            <input
              type="number"
              className="form-control"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone((prevState) => e.target.value)}
            />
            <div className="inputIcon">
              <FaPhone />
            </div>
          </div>
          <div className="form-group position-relative">
            <div className="position-relative">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control pass-input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword((prevState) => e.target.value)}
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
                type={showConfirmPassword ? "text" : "password"}
                className="form-control pass-input"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword((prevState) => e.target.value)
                }
              />
              <div className="inputIcon">
                <FaKey />
              </div>
              <button
                className="btn view-btn position-absolute"
                onClick={(e) => {
                  e.preventDefault();
                  setShowConfirmPassword((prevState) => !prevState);
                }}
              >
                {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
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
                  Register
                </button>
                <ToastContainer />
              </div>
              <div className="forgot-pass">
                <h6 className="ff-helve fs-14 fw-medium text-dark mb-0 d-flex justify-content-end">
                  <Link className="ff-helve fs-14 fw-medium text-purple" to="/">
                    Login Here
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
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
