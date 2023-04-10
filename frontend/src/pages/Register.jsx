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
    isAdmin: false,
    profilePic: null,
    shopName:'',
    address:"",
    mobileNumber:''
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    if (isSuccess) {
      navigate("/admin/dashboard");
    }

    dispatch(reset());
  }, [isError, isSuccess, message, user, dispatch, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      userInfo.name === "" ||
      userInfo.email === "" ||
      userInfo.password === "" ||
      userInfo.password2 === ""
    ) {
      toast.error("Fill up all the field");
    } else {
      const formdata = new FormData();
      formdata.append(
        "profilePic",
        userInfo.profilePic,
        userInfo.profilePic.name
      );
      formdata.append("name", userInfo.name);
      formdata.append("email", userInfo.email);
      formdata.append("password", userInfo.password);
      formdata.append("password2", userInfo.password2);
      formdata.append("isAdmin", userInfo.isAdmin);
      dispatch(registerUser(formdata));
      dispatch(reset());
    }
  };

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Register Dealer</h1>
        <input
          type="text"
          name="name"
          id="name"
          onChange={handleChange}
          placeholder="Enter dealers name"
        />
        <input
          type="text"
          name="shopName"
          id="name"
          onChange={handleChange}
          placeholder="Enter dealers name"
        />
        <input
          type="text"
          name="address"
          id="name"
          onChange={handleChange}
          placeholder="Enter dealers name"
        />
        <input
          type="number"
          name="mobileNumber"
          id="name"
          onChange={handleChange}
          placeholder="Enter dealers name"
        />
        <input
          type="email"
          name="email"
          id="email"
          onChange={handleChange}
          placeholder="Enter dealer email"
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter password"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password2"
          id="password2"
          placeholder="Enter confirm-password"
          onChange={handleChange}
        />
        <input
          type="file"
          name="profilePic"
          id="profilePic"
          onChange={(e) => {
            setUserInfo({ ...userInfo, [e.target.name]: e.target.files[0] });
          }}
        />
        <input
          type="radio"
          name="isAdmin"
          value={true}
          onChange={handleChange}
        />
        Admin
        <input
          type="radio"
          name="isAdmin"
          value={false}
          onChange={handleChange}
        />
        Seller
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
