import { useState, useEffect } from "react";
import { useMutation } from "react-query";

import { API } from "../config/api";

const EditEpisode = ({ idFilm, idEpisode }) => {
  const [formEpisode, setFormEpisode] = useState({
    title: "",
    thumbnail: "",
    video: "",
    film_id: "",
  });

  const handleChange = (e) => {
    setFormEpisode({
      ...formEpisode,
      [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
    });

    // Create thumbnail url for preview
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
    }
  };

  useEffect(() => {
    const getEpisodeData = async () => {
        try {
            const responseEp = await API.get(`films/${idFilm}/episodes/` + idEpisode);
            setFormEpisode({
                title: responseEp.data.data.title,
                thumbnail: '',
                video: responseEp.data.data.video,
            });
        } catch (err) {
            console.log(err);
        }
    }

    getEpisodeData();
}, [idEpisode]);

  const handleEditEpisode = useMutation(async (e) => {
    try {
      e.preventDefault();

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

      // Updates Episode Data
      const response = await API.patch("/episodes/" + idEpisode, formData, config);
      console.log("Update Episode Success : ", response);

      window.location.reload()
    } catch (err) {
      console.log("Update Episode Failed : ", err);
    }
  });
  return (
    <>
      <input type="checkbox" id="my-modal-1" className="modal-toggle" />
      <label htmlFor="my-modal-1" className="modal cursor-pointer">
        <label className="modal-box relative bg-light-black" htmlFor="">
          <h3 className="text-xl text-white font-bold">Update Episode</h3>
          <form
            onSubmit={(e) => handleEditEpisode.mutate(e)}
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
                className="bg-green-600 flex justify-center font-bold text-white rounded px-20 py-1 cursor-pointer"
              >
                Update
              </button>
            </div>
          </form>
        </label>
      </label>
    </>
  );
};

export default EditEpisode;