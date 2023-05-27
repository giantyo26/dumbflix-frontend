import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

import Navbar from "./components/Navbar";
import { UserContext } from "./context/UserContext";
import { setAuthToken } from "./config/api";
import { API } from "./config/api";
import Home from "./pages/Home";
import Series from "./pages/Series";
import Movies from "./pages/Movies";
import UserPayment from "./pages/UserPayment";
import UserProfile from "./pages/UserProfile";
import Transaction from "./pages/AdminTransaction";
import AdminListFilm from "./pages/AdminListFilm";
import AdminAddFilm from "./pages/AdminAddFilm";
import AdminEditFilm from "./pages/AdminEditFilm";
// import AdminDetailFilm from "./pages/AdminDetailFilm";
import FilmsDetail from "./pages/FilmsDetail";
import PageNotFound from "./pages/PageNotFound";

import {
  PrivateRouteLogin,
  PrivateRouteUser,
  PrivateRouteAdmin,
} from "./components/PrivateRoute";

function App() {
  let navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Redirect Auth but just when isLoading is false
    if (!isLoading) {
      if (state.isLogin === false) {
        navigate("/");
      }
    }
  }, [isLoading]);

  useEffect(() => {
    const checkAuth = async () => {
      if (localStorage.token) {
        setAuthToken(localStorage.token);
        try {
          // get auth response
          const response = await API.get("/check-auth");
          console.log("check user success : ", response);
          // Get user data
          const payload = response?.data?.data || {};
          // Get token from local storage
          payload.token = localStorage.token;
          // Send data to useContext
          dispatch({
            type: "USER_SUCCESS",
            payload,
          });
          setIsLoading(false);
        } catch (error) {
          console.log("check user failed : ", error);
          dispatch({
            type: "AUTH_ERROR",
          });
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, [state.isLogin]);

  return (
    <>
      {isLoading ? null : (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="/series" element={<Series />} />
            <Route path="/movies" element={<Movies />} />
            <Route element={<PrivateRouteLogin />}>
              <Route path="/films-detail/:id" element={<FilmsDetail />} />

              
                <Route path="/user-profile" element={<UserProfile />} />
                <Route path="/user-payment" element={<UserPayment />} />
              
              <Route element={<PrivateRouteAdmin />}>
                <Route path="/admin-list-film" element={<AdminListFilm />} />
                <Route path="/admin-transaction" element={<Transaction />} />
                <Route path="/admin-add-film" element={<AdminAddFilm />} />
                <Route
                  exact
                  path="/admin-edit-film/:id"
                  element={<AdminEditFilm />}
                />
              </Route>
            </Route>
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
