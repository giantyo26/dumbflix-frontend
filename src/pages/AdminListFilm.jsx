import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminAddFilm from "./AdminAddFilm";
import { useMutation } from "react-query";
import { useQuery } from "react-query";
import { API } from "../config/api";

export default function AddListFilm() {
    const navigate = useNavigate()
    const [selectedCategories, setSelectedCategories] = useState("tv-shows");
    const [idDelete, setIdDelete] = useState(null)

    // For get id film & delete data
    const handleDeleteFilm = (id) => {
        setIdDelete(id);
    };

    // Handle Update Film
    const handleEditFilm = (id) => {
        navigate("/admin-edit-film/" + id);
    };
    //  execute delete data
    const deleteById = useMutation(async (id) => {
        try {
            await API.delete(`/films/${id}`);
            refetch();
        } catch (error) {
            console.log(error);
        }
    });

    console.log(idDelete);

    useEffect(() => {
        if (idDelete) {
            deleteById.mutate(idDelete);
            console.log(idDelete)
        }
    }, [idDelete]);

    // fetching films data using useQuery
    const { data: films, refetch } = useQuery("filmsCache", async () => {
        const response = await API.get("/films");
        return response.data.data;
    });

    const categoryFilmsSeries = films?.filter((film) => film.category_id === 1);
    const categoryFilmsMovies = films?.filter((film) => film.category_id === 2);

    return (
        <div className="movies items-center relative bg-black min-h-screen backdrop-blur-lg px-10">
            <div className="flex gap-3 items-center pt-5">
                <h1 className="text-2xl">List Film</h1>
                <select
                    className="bg-black p-2 border-2 rounded-md border-white text-white"
                    name=""
                    id=""
                    value={selectedCategories}
                    onChange={(e) => setSelectedCategories(e.target.value)}
                >
                    <option className="" value="tv-shows" selected>
                        TV Show
                    </option>
                    <option className="" value="movies">
                        Film
                    </option>
                </select>
                <Link to={"/admin-add-film"} className="ml-auto">
                    <button className="bg-darkRed px-6 py-2 flex items-center rounded-md text-white mr-3">
                        Add Film
                    </button>
                </Link>
            </div>
            {selectedCategories === "tv-shows"
                ?
                (
                    <>
                        {categoryFilmsSeries?.length !== 0 ? (
                            <>
                                <div className="flex flex-wrap">
                                    {categoryFilmsSeries?.map((item) => (
                                        <div key={item.id} className="series-card w-1/6 p-3">
                                            <Link to={`/films-detail/${item.id}`}><img src={item.thumbnail} /></Link>
                                            <Link className="text-lg mt-2" to={`/series-detail/${item.id}`}>{item.title}</Link>
                                            <p className="opacity-70">{item.year}</p>
                                            <div className="flex justify-between mt-2">
                                                <button onClick={() => { handleEditFilm(item.id) }} type="button" className="hover:bg-white hover:text-green-700 bg-green-700 w-[45%] rounded-sm cursor-pointer" name={item.id} value={item.id}>Edit</button>
                                                <button onClick={() => { handleDeleteFilm(item.id) }} type="button" className="hover:bg-white hover:text-darkRed bg-darkRed w-[45%] rounded-sm cursor-pointer" name={item.id} value={item.id}>Delete</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (<h1 className="text-3xl text-center mt-40">No TV Shows added yet</h1>)}
                    </>
                )
                : (
                    <>
                        {categoryFilmsMovies?.length !== 0 ? (
                            <>
                                <div className="flex flex-wrap">
                                    {categoryFilmsMovies?.map((item) => (
                                        <div key={item.id}  className="w-1/6 p-3">
                                            <Link to={`/films-detail/${item.id}`}><img src={item.thumbnail} /></Link>
                                            <Link className="text-lg mt-2" to={`/movies-detail/${item.id}`}>{item.title}</Link>
                                            <p className="opacity-70">{item.year}</p>
                                            <div className="flex justify-between mt-2">
                                                <button onClick={() => { handleEditFilm(item.id) }} type="button" className="hover:bg-white hover:text-green-700 bg-green-700 w-[45%] rounded-sm cursor-pointer" name={item.id} value={item.id}>Edit</button>
                                                <button onClick={() => { handleDeleteFilm(item.id) }} type="button" className="hover:bg-white hover:text-darkRed bg-darkRed w-[45%] rounded-sm cursor-pointer" name={item.id} value={item.id}>Delete</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (<h1 className="text-3xl text-center mt-40">No Movies added yet</h1>)}
                    </>
                )}
        </div>
    );
}
