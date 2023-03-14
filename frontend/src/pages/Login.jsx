import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser, reset } from "../features/auth/authSlice";
import { useCookies } from "react-cookie";
const Login = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email, password } = userInfo;
  const { isLoading, isError, isSuccess, message, user } = useSelector(
    (state) => state.auth
  );
  const [cookies, setCookie] = useCookies(["auth"]);
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (message) {
      toast(message);
    }
    if (isSuccess || user) {
      navigate("/");
    }
    console.log(isError, isSuccess, message, user);
    dispatch(reset());
  }, [isError, isSuccess, message, user, dispatch, navigate]);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(userInfo));
    dispatch(reset());
  };
  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter your password"
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
