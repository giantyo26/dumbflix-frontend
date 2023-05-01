import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import { API } from "../config/api";
import Swal from "sweetalert2";

export default function AdminAddFilm() {
    const navigate = useNavigate()

    const [categories, setCategories] = useState([]) // store all category data

    const [filmData, setFilmData] = useState({
        title: '',
        year: '',
        thumbnail: '',
        category_id: '',
        description: '',
    });

    // Fetch category data
    const getCategories = async () => {
        try {
            const response = await API.get("/categories");
            setCategories(response.data.data);
        } catch (err) {
            console.log(err);
        }
    };

    // Handle change data on form
    const handleOnChange = (e) => {
        setFilmData({
            ...filmData,
            [e.target.name]: e.target.type === 'file' ? e.target.files : e.target.value,
        });
    };


    const handleOnSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();

            console.log(filmData);
            const config = {
                headers: {
                    'Content-type': 'multipart/form-data',
                },
            };

            // insert film data
            const formData = new FormData();
            
            formData.set('title', filmData.title);
            formData.set('thumbnail', filmData.thumbnail[0], filmData.thumbnail[0].name);
            formData.set('year', filmData.year);
            formData.set('description', filmData.description);
            formData.set('category_id', Number(filmData.category_id));

            const response = await API.post('/films', formData, config);
            Swal.fire(
                "Success!",
                "You have successfully Added the film!",
                "success"
              ).then((result) => {
                if (result.isConfirmed) {
                  navigate("/admin-list-film");
                }
              });
        } catch (err) {
            e.preventDefault();
            console.log('add film failed', err);
            console.log(filmData);
        }
    });

    useEffect(() => {
        getCategories();
      }, []);
    
    return (
        <div className="bg-black">
            <h1 className="w-[64%] py-5 font-semibold text-2xl mx-auto">Add Film</h1>
            <form
                action=""
                className="flex flex-col w-70 justify-center mx-[16em]"
                onSubmit={(e) => handleOnSubmit.mutate(e)}
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
                        <option key={id} className="text-darkBlack" value={index?.id}>
                            {index?.name}
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
                    <button
                        type="submit"
                        className="bg-darkRed py-1.5 px-[5em] rounded"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
}