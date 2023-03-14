import { useCookies } from "react-cookie";
import { Navigate, Outlet } from "react-router-dom";
export default function PrivateOutlet() {
  const [cookies, setCookie] = useCookies();
  return cookies.auth ? <Outlet /> : <Navigate to="/login" />;
}
