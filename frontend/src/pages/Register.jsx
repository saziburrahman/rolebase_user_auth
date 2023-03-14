import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { registerUser, reset } from "../features/auth/authSlice";
const Register = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { name, email, password, password2 } = userInfo;
  const { isLoading, isError, isSuccess, message, user } = useSelector(
    (state) => state.auth
  );
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
    dispatch(reset());
  }, [isError, isSuccess, message, user, dispatch, navigate]);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(userInfo));
    dispatch(reset())
    navigate("/")
  };
  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" id="name" onChange={handleChange} />
        <input type="email" name="email" id="email" onChange={handleChange} />
        <input
          type="password"
          name="password"
          id="password"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password2"
          id="password2"
          onChange={handleChange}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
