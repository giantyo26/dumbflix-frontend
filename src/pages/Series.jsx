import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { API } from "../config/api";

export default function Series() {
  const { data: films } = useQuery("filmsCache", async () => {
    const response = await API.get("/films");
    return response.data.data;
  });

  const categoryFilmsSeries = films?.filter((film) => film.category_id === 1);
  return (
    <>
      <div className="relative">
        <img
          src="public/image/hero-lacasa.webp"
          className="object-cover w-full h-[600px] bg-darkBlack"
          alt="La Casa De Papel Cover"
        />
        <div className="hero-image bg-black">
          <div className="hero-text absolute top-40 left-[100px]">
            <img
              src="image/title-lacasa-de-papel.png"
              alt="La Casa De Papel title"
            />
            <p className="text-xl mt-4 ml-3 ">
              Money Heist is a crime drama on Netflix - originally called La
              Casa de Papel.
              <br />
              Money Heist season 3 has just been released by the streaming
              service. The plot
              <br />
              reads: "Eight thieves take hostages and lock themselves in the
              Royal Mint of Spain <br />
              as a criminal mastermind manipulates the police to carry out his
              plan."
            </p>
            <div className="hero-text-info flex gap-2 mb-7 mt-4 ml-3">
              <p className="text-lg ">2017</p>
              <p className="border border-1 px-2 rounded-md">TV Series</p>
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
        <h5 className="mb-5 text-xl">Series</h5>
        <div className="movies-section flex flex-wrap">
          {categoryFilmsSeries?.length !== 0 ? (
            <>
              {categoryFilmsSeries?.map((item) => (
                <Link
                  to={`/films-detail/${item.id}`}
                  key={item.id}
                  className="p-2 w-[15%]"
                >
                  <div className="series-card">
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
              No Series Added yet
            </h1>
          )}
        </div>
      </div>
    </>
  );
}
