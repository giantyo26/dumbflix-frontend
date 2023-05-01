import { UserContext } from "../context/UserContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Import useMutation
import { useMutation } from "react-query";

// Import API config
import { API } from "../config/api";

const EditProfileModal = () => {
  let navigate = useNavigate();
  const [state] = useContext(UserContext);

  const [preview, setPreview] = useState(null); //For image preview
  const [form, setForm] = useState({
    fullname: "",
    thumbnail: "",
    email: "",
    gender: "",
    phone: "",
    address: "",
  });
 console.log(form)

  async function getDataUpdate() {
    const responseUser = await API.get(`/users/${state.user.id}`);
    setPreview(responseUser.data.data.thumbnail);

    setForm({
      ...form,
      fullname: responseUser.data.data.fullname,
      email: responseUser.data.data.email,
      gender: responseUser.data.data.gender,
      phone: responseUser.data.data.phone,
      address: responseUser.data.data.address,
    });
  }

  useEffect(() => {
    getDataUpdate();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    // Create image url for preview
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
      // Configuration
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      // Store data with FormData as object
      const formData = new FormData();
      formData.set("fullname", form.fullname);
      if (form.thumbnail) {
        formData.set("thumbnail", form?.thumbnail[0], form?.thumbnail[0].name);
      }
      formData.set("email", form.email);
      formData.set("gender", form.gender);
      formData.set("phone", form.phone);
      formData.set("address", form.address);

      //Update user data
      const response = await API.patch(
        `/users/${state.user.id}`,
        formData,
        config
      );
      console.log("Update user success : ", response);
      window.location.reload() 
    } catch (error) {
      console.log("Update user failed : ", error);
    }
  });
  return (
    <>
      <input type="checkbox" id="my-modal-edit" className="modal-toggle" />
      <label htmlFor="my-modal-edit" className="modal cursor-pointer">
        <label className="modal-box relative bg-light-black" htmlFor="">
          {/* {notif && notif} */}
          <h3 className="text-xl text-white font-bold">Edit Profile</h3>
          <form
            onSubmit={(e) => handleSubmit.mutate(e)}
            className="flex flex-col gap-5 mt-5"
          >
            <div className="flex gap-3">
              <input
                onChange={handleChange}
                name="fullname"
                form="fullname"
                type="text"
                placeholder="Full Name"
                className="input input-border ring-1 ring-white hover:ring-cyan-500 focus:ring-cyan-500 focus:placeholder-white bg-neutral-600 text-white w-3/4"
              />
              <input
                onChange={handleChange}
                name="thumbnail"
                form="thumbnail"
                type="file"
                className="file-input file-input-bordered max-w-xs bg-white file:-order-none w-1/4"
              />
            </div>
            <div>
              <input
                onChange={handleChange}
                name="email"
                form="email"
                type="text"
                placeholder="Email"
                className="input input-border ring-1 ring-white hover:ring-cyan-500 focus:ring-cyan-500 focus:placeholder-white bg-neutral-600 text-white w-full"
              />
            </div>
            <div>
              <select
                name="gender"
                form="gender"
                onChange={handleChange}
                className="input input-border ring-1 ring-white hover:ring-cyan-500 focus:ring-cyan-500 bg-neutral-600 w-full"
              >
                <option className="hidden" value="default">
                  Gender
                </option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>
            <div>
              <input
                onChange={handleChange}
                name="phone"
                form="phone"
                type="text"
                placeholder="Phone"
                className="input input-border ring-1 ring-white hover:ring-cyan-500 focus:ring-cyan-500 focus:placeholder-white bg-neutral-600 text-white w-full"
              />
            </div>
            <div>
              <textarea
                onChange={handleChange}
                name="address"
                form="address"
                style={{ resize: "none" }}
                type="text"
                placeholder="Address"
                className="input input-border ring-1 ring-white hover:ring-cyan-500 focus:ring-cyan-500 focus:placeholder-white bg-neutral-600 text-white w-full h-24"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-red-600 flex justify-center font-bold text-white rounded px-20 py-1 cursor-pointer"
              >
                Add
              </button>
            </div>
          </form>
        </label>
      </label>
    </>
  );
};

export default EditProfileModal