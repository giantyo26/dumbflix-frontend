import { useState } from "react";
import { useMutation } from "react-query";

import { API } from "../config/api";
import Swal from "sweetalert2";

const AddEpisode = ({ idFilm }) => {
  const [formEpisode, setFormEpisode] = useState({
    title: "",
    thumbnail: "",
    video: "",
    film_id: "",
  });

  const handleChange = (e) => {
    setFormEpisode({
      ...formEpisode,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
    
  };

  const handleAddEpisode = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configurasi
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      // Store data with FormData as Object
      const formData = new FormData();
      formData.set("title", formEpisode.title);
      formData.set(
        "thumbnail",
        formEpisode.thumbnail[0],
        formEpisode.thumbnail[0].name
      );
      formData.set("video", formEpisode.video);
      formData.set("film_id", idFilm);

      // Insert Episode Data
      const response = await API.post("/episodes", formData, config);
      console.log("Add Episode Success : ", response);
      Swal.fire(
        "Success!",
        "You have successfully Added the film!",
        "success"
      ).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    } catch (err) {
      console.log("Add Episode Failed : ", err);
    }
  });
  return (
    <>
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <label htmlFor="my-modal-3" className="modal cursor-pointer">
        <label className="modal-box relative bg-light-black" htmlFor="">
          <h3 className="text-xl text-white font-bold">Add Episode</h3>
          <form
            onSubmit={(e) => handleAddEpisode.mutate(e)}
            className="flex flex-col gap-5 mt-5"
          >
            <div className="flex gap-3">
              <input
                onChange={handleChange}
                name="title"
                form="title"
                type="text"
                placeholder="Episode Title"
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
                name="video"
                form="video"
                type="text"
                placeholder="Link Film"
                className="input input-border ring-1 ring-white hover:ring-cyan-500 focus:ring-cyan-500 focus:placeholder-white bg-neutral-600 text-white w-full"
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

export default AddEpisode;