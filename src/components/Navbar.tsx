
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";
import { useContext } from "react";
import authService from "../service/authService";
const Navbar = () => {
    
    const authContext = useContext(AuthContext);
   
    const {  logout } = authContext;
    const currentUser = authService.getCurrentUser();
    
    const handleLogout = () => {
        logout();
   
      };

      console.log(currentUser);
  return (
    
    <div className="py-6 mb-[100px] text-white navbar">
    <div className="container flex items-center justify-between mx-auto">
      <div className="logo">
        <Link to="/" className="text-xl font-bold">
          <p>logo</p>
        </Link>
      </div>
      <div className="flex space-x-6 links">
        <Link className="text-white link hover:text-gray-400" to="https://rafaelesin.netlify.app/">
          <h6 className="text-lg">Portfolio</h6>
        </Link>
        
       
        <span className="text-lg text-2xl text-[#6CCFF6]">{currentUser?.user.user.name}</span>
        {currentUser ? (
          <span onClick={handleLogout} className="text-lg text-[#FB6376] cursor-pointer hover:text-red-700 ">Logout</span>
        ) : (
          <Link className="text-lg text-[#6CCFF6] link hover:text-gray-400" to="/login">
            Login
          </Link>
        )}
        {currentUser?.decodedToken.isAdmin && currentUser?.decodedToken && (
          <span className="write">
            <Link className="text-lg text-white link hover:text-gray-400" to="/write">
              Write
            </Link>
          </span>
        )}
      </div>
    </div>
  </div>
  
  );
};


export default Navbar