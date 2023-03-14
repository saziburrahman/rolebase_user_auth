import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { reset } from "../features/auth/authSlice";
import { useCookies } from "react-cookie";
import { useJwt } from "react-jwt";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cookies, setCookie] = useCookies("myCookie");
  const { decodedToken, isExpired } = useJwt(cookies.myCookie);
  console.log(decodedToken, isExpired);
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
  return <div>Dashboard </div>;
};

export default Dashboard;
