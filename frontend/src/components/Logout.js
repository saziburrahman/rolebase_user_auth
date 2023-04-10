import axios from "axios";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Logout() {
  useEffect(async () => {
    try {
      await axios.post("http://localhost:8080//api/user/logout", {
        withCredentials: true,
      });
      toast.success("Successfully Logout");
      <Navigate to="/"/>
    } catch (error) {
      toast.error(error);
    }
  });
  return <>Logout page</>;
}
