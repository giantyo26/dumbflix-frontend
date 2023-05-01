import { UserContext } from "../context/UserContext.jsx";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";

// Import API Config
import { API } from "../config/api";

import EditProfileModal from "../components/EditProfile.jsx";

export default function UserProfile() {
  const [state] = useContext(UserContext);

  // State Profile
  const [profile, setProfile] = useState({});

  useEffect(() => {
    getProfileData();
  }, [profile.thumbnail]);

  // Fetching profile by id from state
  const getProfileData = async () => {
    try {
      const response = await API.get(`/users/${state.user.id}`);
      setProfile(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="pt-7 pb-10 w-full h-full bg-black ">
      <div className="wrapper mt-10 bg-darkBlack mx-auto h-[500px] w-[800px] flex rounded-md shadow-md">
        <div className="flex flex-col ml-10 gap-3">
          <h1 className="text-xl pt-7 ml-1">Personal Info</h1>
          <div className="name flex items-center gap-3">
            <img src="../public/image/icon-profile.png" />
            <div className="flex flex-col">
              <p>{profile.fullname}</p>
              <span className="opacity-70 text-sm">Full Name</span>
            </div>
          </div>
          <div className="email flex items-center gap-3">
            <img src="../public/image/icon-email.png" />
            <div className="flex flex-col">
              <p>{profile.email}</p>
              <p className="opacity-70 text-sm">Email</p>
            </div>
          </div>
          <div className="status flex items-center gap-2">
            <img src="../public/image/icon-status.png" />
            <div>
              <p>Active</p>
              <p className="opacity-70 text-sm">Status</p>
            </div>
          </div>
          <div className="gender flex items-center gap-3">
            <img src="../public/image/icon-gender.png" />
            <div>
              <p>{profile.gender}</p>
              <p className="opacity-70 text-sm">Gender</p>
            </div>
          </div>
          <div className="phone flex items-center gap-3">
            <img src="../public/image/icon-phone.png" />
            <div>
              <p>{profile.phone}</p>
              <p className="opacity-70 text-sm">Phone</p>
            </div>
          </div>
          <div className="address flex items-center gap-4">
            <img src="../public/image/icon-address.png" />
            <div>
              <p>{profile.address}</p>
              <p className="opacity-70 text-sm">Address</p>
            </div>
          </div>
        </div>

        
          
            <div className="Update ml-[250px]">
              <img
                name="thumbnail"
                className="w-[250px] h-80 px-5 pt-7 object-cover"
                src={profile.thumbnail}
              />
              <div className="flex justify-center pt-5">
                <label
                  htmlFor="my-modal-edit"
                  className="bg-red-600 text-white flex place-content-center py-3 mb-16 rounded text-sm w-3/4 cursor-pointer"
                >
                  Edit Profile
                </label>
                <EditProfileModal />
              </div>
            </div>
      </div>
    </div>
  );
}
