import React, { useState, useContext } from "react";
import { API, setAuthToken } from '../config/api'
import { UserContext } from "../context/UserContext";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'


export default function Login() {
    const [showLogin, setShowLogin] = useState(false);
    const [_, dispatch] = useContext(UserContext)

    const navigate = useNavigate();
    const handleLoginModal = (event) => {
        if (event.target.id === "login-overlay") {
            setShowLogin(false);
        }
    };

    // Login logic
    const [loginValue, setLoginValue] = useState({
        email: "",
        password: "",
    });

    const { email, password } = loginValue;

    const handleOnChange = (e) => {
        setLoginValue({
            ...loginValue,
            [e.target.name]: e.target.value,
        });
    };

    const handleLoginSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();
            // Insert data for login process, you can also make this without any config, because axios would be automatically handling it.
            const response = await API.post('/login', loginValue);

            // Send data to useContext
            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: response.data.data,
            });

            setAuthToken(localStorage.token);

            // Status check
            if (response.data.data.roles === 'admin') {
                navigate('/admin-list-film');
            } else {
                navigate('/');
            }

            setLoginValue({
                email: "",
                password: "",
            })

            Swal.fire(
                'Success!',
                'You have successfully logged in!',
                'success'
            )
        } catch(error) {
            Swal.fire(
                'Error!',
                'Login failed, please try again!',
                'error'
            )
            console.log("login failed : ", error)
        }
    });

    return (
        <>
            <button
                className="login bg-darkRed hover:text-white font-bold py-1.5 px-5 rounded"
                type="button"
                onClick={() => setShowLogin(true)}
            >
                Login
            </button>
            {showLogin && (
                <div
                    className="fixed z-50 inset-0 bg-opacity-90 flex justify-center items-center"
                    onClick={handleLoginModal}
                    id="login-overlay"
                >
                    <div className="relative z-50 h-100 w-90 bg-darkBlack p-5 rounded-md">
                        <h1 className="font-semibold text-white mt-2 mb-3 text-2xl">
                            Login
                        </h1>
                        <form className="flex flex-col" onSubmit={e => handleLoginSubmit.mutate(e)}>
                            <input
                                className="bg-darkGrey border-2 rounded-md p-2 mb-4"
                                name="email"
                                type="email"
                                id="email"
                                placeholder="Email"
                                value={email}
                                onChange={handleOnChange}
                            />
                            <input
                                className="bg-darkGrey border-2 rounded-md p-2 mb-7"
                                name="password"
                                type="password"
                                id="password"
                                placeholder="Password"
                                value={password}
                                onChange={handleOnChange}
                            />
                            <button
                                className="bg-darkRed font-semibold p-3 rounded-md text-white mb-3"
                                type="submit"
                            >
                                Login
                            </button>
                            <p className="text-white">
                                Don't have an account ? <span>Click</span>
                                <a className="font-semibold" href="#">
                                    {" "}
                                    Here
                                </a>
                            </p>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
