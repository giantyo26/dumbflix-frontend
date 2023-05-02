import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useMutation, useQuery } from "react-query";

import { API } from "../config/api";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function AdminEditFilm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [filmData, setFilmData] = useState({
    title: "",
    year: "",
    thumbnail: "",
    category_id: "",
    description: "",
  });

  const handleOnChange = (e) => {
    setFilmData({
      ...filmData,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
  };

  const { data: categories } = useQuery("categoriesCache", async () => {
    const response = await API.get("/categories");
    return response.data.data;
  });

  useEffect(() => {
    const getFilmData = async () => {
      try {
        const responseFilm = await API.get("/films/" + id);
        setFilmData({
          title: responseFilm.data.data.title,
          year: responseFilm.data.data.year,
          thumbnail: "",
          category_id: responseFilm.data.data.category_id,
          description: responseFilm.data.data.description,
        });
      } catch (err) {
        console.log(err);
      }
    };

    getFilmData();
  }, [id]);

  const handleOnUpdate = useMutation(async (e) => {
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

      formData.set("title", filmData.title);
      if (filmData.thumbnail) {
        formData.set(
          "thumbnail",
          filmData.thumbnail[0],
          filmData.thumbnail[0].name
        );
      }
      formData.set("year", filmData.year);
      formData.set("description", filmData.description);
      formData.set("category_id", Number(filmData.category_id));

      // Update film data
      const response = await API.patch("/films/" + id, formData, config);
      Swal.fire(
        "Success!",
        "You have successfully Updated the film!",
        "success"
      ).then((result) => {
        if (result.isConfirmed) {
          navigate("/admin-list-film");
        }
      });
    } catch (error) {
      console.log("update film failed : ", error);
    }
  });

  return (
    <div className="bg-black">
      <h1 className="w-[60%] py-5 font-semibold text-2xl mx-auto">Edit Film</h1>
      <form
        action=""
        className="flex flex-col w-70 justify-center mx-[16em]"
        onSubmit={(e) => handleOnUpdate.mutate(e)}
      >
        <div>
          <input
            onChange={handleOnChange}
            className="bg-darkGrey border-2 w-[70%] mr-3 rounded-md p-2 mb-4"
            type="text"
            name="title"
            placeholder="Title"
            value={filmData.title}
          />
          <input
            onChange={handleOnChange}
            className="bg-darkGrey border-2 rounded-md w-[28%] p-1.5 mb-4"
            type="file"
            name="thumbnail"
          />
        </div>
        <input
          onChange={handleOnChange}
          className="bg-darkGrey border-2 rounded-md p-2 mb-4"
          type="number"
          name="year"
          placeholder="Year"
          value={filmData.year}
        />
        <select
          className="bg-darkGrey border-2 rounded-md p-2 mb-4"
          name="category_id"
          onChange={handleOnChange}
          value={filmData.category_id}
        >
          <option>Category</option>
          {categories?.map((index, id) => (
            <option key={id} className="text-darkBlack" value={index.id}>
              {index.name}
            </option>
          ))}
        </select>
        <textarea
          onChange={handleOnChange}
          className="bg-darkGrey border-2 rounded-md p-2 mb-4 resize-none"
          name="description"
          cols="30"
          rows="10"
          placeholder="Description"
          value={filmData.description}
        />

        <div className="flex ml-auto mt-3 mb-10">
          <button type="submit" className="bg-darkRed py-1.5 px-[5em] rounded">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
