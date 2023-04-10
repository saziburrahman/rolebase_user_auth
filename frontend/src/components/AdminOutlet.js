import { useCookies } from "react-cookie";
import { useJwt } from "react-jwt";
import { Navigate, Outlet } from "react-router-dom";

export default function AdminOutlet() {
  const [cookies, setCookie, removeCookie] = useCookies();
  const { decodedToken, isExpired, error } = useJwt(cookies.auth);
  console.log(decodedToken);
  return decodedToken ?<Outlet/>:<Navigate to="/login"/>
}
