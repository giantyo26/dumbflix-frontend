import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Define UserAvatar component that takes props
export default function UserAvatar() {
  // Using state to keep track dropdown menu 
  const [showDropdownUser, setShowDropdownUser] = useState(false);

  const navigate = useNavigate()
  
  const logout = () => {
    localStorage.removeItem("token");

    //Reload Page
    window.location.reload();

    navigate("/");
  };
  // JSX for the UserAvatar component
  return (
    <div
      // Keep track of mouse hover on avatar
      className="relative z-50"
      onMouseEnter={() => setShowDropdownUser(true)}
    >
      {/* Avatar Icon */}
      <div className="relative mr-10 mt-50 rounded-full shadow-md cursor-pointer">
        <img
          src="../public/thumbnail/joker.png"
          className="rounded-full object-cover h-[50px] w-[50px] border-white border-2"
          alt="avatar icon"
        />
      </div>

      {/* Dropdown conditional rendering */}
      {showDropdownUser && (
        <div
          className="absolute right-0 mt-2 w-[200px] bg-darkBlack rounded-md shadow-md"
          style={{ top: "calc(100% + 10px)", zIndex: 10 }}
          onMouseLeave={() => setShowDropdownUser(false)}
        >
          <Link to={"/user-profile"}>
            <div className="flex ml-4 my-3 items-center">
              <img src="../public/image/profile.png" />
              <h1>Profile</h1>
            </div>
          </Link>
          <Link to={"/user-payment"}>
            <div className="flex ml-4 my-3 items-center">
              <img src="../public/image/pay.png" />
              <h1>Pay</h1>
            </div>
          </Link>

          <div className="flex my-3 items-center">
            <img src="../public/image/line.png" className="w-160" />
          </div>

          <button className="flex ml-4 my-3 mt-4" onClick={()=>logout()}>
            <img src="../public/image/logout.png" />
            <h1 >Logout</h1>
          </button>
        </div>
      )}
    </div>
  );
}
