import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FilmIcon from "../assets/image/film-icon.png";
import PayIcon from "../assets/image/pay.png";
import Line from "../assets/image/Line.png"
import Logout from "../assets/image/logout.png"
import AvatarIcon from "../assets/image/chernobyl.png"

export default function AdminAvatar() {
    // Using state to keep track dropdown menu
    const [showDropdownAdmin, setShowDropdownAdmin] = useState(false);

    const navigate = useNavigate()

    const logout = () => {
      localStorage.removeItem("token");
  
      //Reload Page
      window.location.reload();
  
      navigate("/");
    };
  

    // JSX for the AdminAvatar component
    return (
      <div
        className="relative z-50"
        onMouseEnter={() => setShowDropdownAdmin(true)}
      >
        {/* Avatar Icon */}
        <div className="relative mr-10 mt-50 rounded-full shadow-md cursor-pointer">
          <img
            src={AvatarIcon}
            className="rounded-full object-cover h-[50px] w-[50px] border-white border-2"
            alt="avatar icon"
          />
        </div>
  
        {/* Dropdown conditional rendering */}
        {showDropdownAdmin && (
          <div
            className="absolute right-0 mt-2 w-[200px] bg-darkBlack rounded-md shadow-md"
            style={{ top: "calc(100% + 10px)", zIndex: 10 }}
            onMouseLeave={() => setShowDropdownAdmin(false)}
          >
            <Link to={"/admin-list-film"}>
              <div className="flex ml-4 my-3 items-center">
                <img src={FilmIcon} />
                <h1>Film</h1>
              </div>
            </Link>
            <Link to={"/admin-transaction"}>
              <div className="flex ml-4 my-3 items-center">
                <img src={PayIcon} />
                <h1>Transaction</h1>
              </div>
            </Link>
  
            <div className="flex my-3 items-center">
              <img src={Line} className="w-160" />
            </div>
  
            <button className="flex ml-4 my-3 mt-4" onClick={logout}>
              <img src={Logout} />
                <h1 >Logout</h1>
            </button>
          </div>
        )}
      </div>
    );
  }
  