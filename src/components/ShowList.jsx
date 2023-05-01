import { useQuery } from "react-query"
import { Link } from "react-router-dom"
import { API } from "../config/api"

export default function ShowList() {
    const { data: films } = useQuery("filmsCache", async () => {
        const response = await API.get("/films");
        return response.data.data;
    })

    const categoryFilmsSeries = films?.filter((film) => film.category_id === 1);
    const categoryFilmsMovies = films?.filter((film) => film.category_id === 2);

    return (
        <div className="shows bg-black opacity-100 backdrop-filter backdrop-blur-lg z-50 px-10">
            <div className="series">
                <h5 className="text-xl">TV Series</h5>
                <div className="series-section flex flex-wrap">
                    {categoryFilmsSeries?.length !== 0 ? (
                        <>
                            {categoryFilmsSeries?.map((item) => (
                                <Link to={`films-detail/${item.id}`} key={item.id} className="p-3 w-[15%]">
                                    <div className="series-card">
                                        <img src={item.thumbnail} className="w-full h-auto" alt="series thumbnail" />
                                        <p className="text-lg mt-2">{item.title}</p>
                                        <p className="opacity-70">{item.year}</p>
                                    </div>
                                </Link>
                            ))}
                        </>
                    ) : (<h1 className="text-lg px-2 rounded mx-auto mt-10">No Series Added yet</h1>)}
                </div>
            </div>
            <div className="movies">
                <h5 className="mt-5 text-xl">Movies</h5>
                <div className="movies-section flex flex-wrap">
                    {categoryFilmsMovies?.length !== 0 ? (
                        <>
                            {categoryFilmsMovies?.map((item) => (
                                <Link to={`films-detail/${item.id}`} key={item.id} className="p-3 w-[15%]">
                                    <div className="movies-card">
                                        <img src={item.thumbnail} className="w-full h-auto" alt="movie thumbnail" />
                                        <p className="text-lg mt-2">{item.title}</p>
                                        <p className="opacity-70">{item.year}</p>
                                    </div>
                                </Link>
                            ))}
                        </>
                    ) : (<h1 className="text-lg px-2 rounded mx-auto mt-10">No Movies Added yet</h1>)}
                </div>
            </div>
        </div>

    )
}