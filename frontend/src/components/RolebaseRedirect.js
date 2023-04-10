import { useCookies } from "react-cookie";
import { useJwt } from "react-jwt";
import { Navigate, Outlet } from "react-router-dom";


export default function RolebaseREdirect() {
  const [cookies, setCookie] = useCookies();
  const { decodedToken, isExpired } = useJwt(cookies.auth);
  if (decodedToken && decodedToken.isAdmin) {
    return <Navigate to="/admin/dashboard" />;
  } else if (decodedToken && decodedToken.isAdmin === false) {
    return <Navigate to="/dashboard" />;
  }
}
