import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { API } from "../config/api";
import HeroJoker from "../assets/image/hero-joker.webp"
import TitleJoker from "../assets/image/title-joker.png"


export default function Movies() {
  const { data: films } = useQuery("filmsCache", async () => {
    const response = await API.get("/films");
    return response.data.data;
  });

  const categoryFilmsMovies = films?.filter((film) => film.category_id === 2);
  return (
    // Hero section
    <>
      <div className="relative">
        <img
          src={HeroJoker}
          className="object-cover w-full h-[600px]"
          alt="The Joker Cover"
        />
        <div className="hero-image bg-black">
          <div className="hero-text absolute top-40 left-[100px]">
            <img src={TitleJoker} alt="The Joker title" />
            <p className="text-xl mt-4 ml-3 ">
              In Gotham City, mentally troubled comedian Arthur Fleck is
              disregarded <br /> and mistreated by society. He then embarks on a
              downward spiral of revolution and
              <br /> bloody crime. This path brings him face-to-face with his
              alter-ego: the Joker.
            </p>
            <div className="hero-text-info flex gap-2 mb-7 mt-4 ml-3">
              <p className="text-lg ">2019</p>
              <p className="border border-1 px-2 rounded-md">Movies</p>
            </div>
            <a
              className="mt-5 bg-darkRed hover:bg-blue-700 text-white font-bold py-4 px-10 ml-3 rounded"
              href=""
            >
              WATCH NOW!
            </a>
          </div>
        </div>
      </div>
      <div className="movies bg-black opacity-100 backdrop-filter backdrop-blur-lg z-50 px-10">
        <h5 className="mb-5 text-xl">Movies</h5>
        <div className="movies-section flex flex-wrap">
          {categoryFilmsMovies?.length !== 0 ? (
            <>
              {categoryFilmsMovies?.map((item) => (
                <Link
                  to={`/films-detail/${item.id}`}
                  key={item.id}
                  className="p-2 w-[15%]"
                >
                  <div className="movies-card">
                    <img
                      src={item.thumbnail}
                      className="w-full h-auto"
                      alt="series thumbnail"
                    />
                    <p className="text-lg mt-2">{item.title}</p>
                    <p className="opacity-70">{item.year}</p>
                  </div>
                </Link>
              ))}
            </>
          ) : (
            <h1 className="text-lg px-2 rounded mx-auto mt-10">
              No Movies Added yet
            </h1>
          )}
        </div>
      </div>
    </>
  );
}
