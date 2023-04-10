import SidebarContent from "../components/SidebarContent";
import { useCookies } from "react-cookie";
import { useJwt } from "react-jwt";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
const AdminDashboard = () => {
  const [cookies, setCookie] = useCookies();
  const { decodedToken, isExpired } = useJwt(cookies.auth);
  const [profilePic, setProfilePic] = useState(
    "avater.jpg"
  );
  const [name, setName] = useState("Admin");
  useEffect(() => {
    if (decodedToken && decodedToken.profilePic) {
      setProfilePic(decodedToken.profilePic);
    }
    if (decodedToken && decodedToken.name) {
      setName(decodedToken.name);
    }
    console.log("Admin Dashboard");
  }, [decodedToken]);

  return (
    <div>
      <SidebarContent
        name={name}
        profilePic={`http://localhost:8080/public/images/${profilePic}`}
      >
        <h1>Welcome to my app!</h1>
        <p>This is the main content area.</p>
      </SidebarContent>
    </div>
  );
};

export default AdminDashboard;
