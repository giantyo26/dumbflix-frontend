import Login from "./Login";
import Register from "./Register";
import { Link } from "react-router-dom";
import UserAvatar from "./UserAvatar";
import AdminAvatar from "./AdminAvatar"
import { useContext } from "react";
import { UserContext } from "../context/UserContext";



export default function Navbar() {
    const [state] = useContext(UserContext);

    return (
        <>
            <div className="navbar flex justify-between items-center bg-darkBlack">

                <ul className="nav-item-1 md:flex space-x-7 py-1 ml-3 list-none">
                    <Link to={"/"}><li>Home</li></Link>
                    <Link to={"/series"}><li>TV Shows</li></Link>
                    <Link to={"/movies"}><li>Movies</li></Link>
                </ul>


                <div className="mr-30 flex ">
                    <Link to={"/"} className="mx-auto"><a className="nav-logo " href=""><img className="logo mx-auto " src="/image/logo.png" alt="logo" /></a></Link>
                </div>
                <div className="nav-item-2 md:flex space-x-7">
                    { state.isLogin ? 
                    ( state.user.roles == "admin" ? <AdminAvatar  /> : <UserAvatar />)
                    : (<> <Register /> <Login  /> </>)
                    }
                </div>
            </div>

        </>
    )
}