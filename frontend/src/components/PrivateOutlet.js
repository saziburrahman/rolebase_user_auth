import { useCookies } from "react-cookie";
import { Navigate, Outlet } from "react-router-dom";
import { useJwt } from "react-jwt";
export default function PrivateOutlet() {
  const [cookies, setCookie] = useCookies();

  return cookies.auth ? <Outlet /> : <Navigate to="/" />;
}
