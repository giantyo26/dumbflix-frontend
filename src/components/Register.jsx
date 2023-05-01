import {React,  useState}  from "react";
import { useMutation } from "react-query";
import { API } from "../config/api";

export default function Register() {
    // UseState for showing register Modal
    const [showRegister, setShowRegister] = useState(false);
    const handleRegisterModal = (event) => {
        if (event.target.id === "register-background") {
            setShowRegister(false);
        }
    };

    // UseState for register input
    const [registerValue, setRegisterValue] = useState({
        email: "",
        password: "",
        fullname: "",
        gender: "",
        role: "",
        phone: "",
        address: ""
    })

    const { email, password, fullname, gender, phone, address } = registerValue

    const handleOnChange = (e) => {
        setRegisterValue({
            ...registerValue,
            [e.target.name]: e.target.value
        }
        )
    }

    const handleOnSubmit = useMutation(async (e) => {
        try {
          e.preventDefault()
      
          const response = await API.post('/register', registerValue)
            
          console.log("register success : ", response)

          alert("Succesfully Registered!")
          setShowRegister(false);    
    
          setRegisterValue({
            email: "",
            password: "",
            fullname: "",
            gender: "",
            phone: "",
            address: "",
          })
    
        } catch (error) {
          alert("Register Failed!")
          console.log(error.response)
        }
      })
    
    return (
        <>
            <button
                className="register bg-white text-darkRed font-bold py-1.5 px-5 rounded"
                onClick={() => setShowRegister(true)}
                type="button"
            >
                Register
            </button>
            {showRegister && (
                <div
                    className="fixed z-50 inset-0 bg-opacity-90 flex justify-center items-center"
                    onClick={handleRegisterModal}
                    id="register-background"
                >
                    <div className="relative z-50 h-85 w-90 bg-darkBlack p-5 rounded-md">
                        <h1 className="font-semibold text-white mb-5 text-2xl">
                            Register
                        </h1>
                        <form className="flex flex-col" onSubmit={(e) => handleOnSubmit.mutate(e)}>
                            <input
                                className="email bg-darkGrey border-2 rounded-md p-2 mb-4"
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={email}
                                onChange={handleOnChange}
                            />
                            <input
                                className="password bg-darkGrey border-2 rounded-md p-2 mb-4"
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={password}
                                onChange={handleOnChange}
                            />
                            <input
                                className="name bg-darkGrey border-2 rounded-md p-2 mb-4"
                                type="text"
                                name="fullname"
                                placeholder="Full Name"
                                value={fullname}
                                onChange={handleOnChange}
                            />
                            <select
                                className="gender bg-darkGrey border-2 rounded-md p-2 mb-4 "
                                name="gender"
                                placeholder="Gender"
                                value={gender}
                                onChange={handleOnChange}
                            >
                                <option className="text-gray-300" defaultValue={gender}>
                                    Gender
                                </option>
                                <option className="text-darkBlack" value="male">
                                    Male
                                </option>
                                <option className="text-darkBlack" value="female">
                                    Female
                                </option>

                            </select>
                            <input
                                className="bg-darkGrey border-2 rounded-md p-2 mb-4"
                                type="text"
                                name="phone"
                                placeholder="Phone"
                                value={phone}
                                onChange={handleOnChange}
                            />
                            <input
                                className="bg-darkGrey border-2 rounded-md p-2 mb-7"
                                type="text"
                                name="address"
                                placeholder="Address"
                                value={address}
                                onChange={handleOnChange}
                            />
                            <div>
                                <button
                                    className="bg-white font-semibold p-3 w-full rounded-md text-darkRed mb-3"
                                    type="submit"
                                >
                                    Register
                                </button>
                            </div>
                            <p className="mx-auto">
                                Already have an account ?<span>Click</span>{" "}
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
