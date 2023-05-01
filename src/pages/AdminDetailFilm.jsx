import {useState, useEffect} from "react";
import useParams from "react-router-dom"
import ReactPlayer from "react-player";

import AddEpisode from "../components/AddEpisode";

import { useQuery, useMutation } from "react-query";
import { API } from "../config/api";

export default function AdminDetailFilm(){
    const { id } = useParams()

    // Carousel & React-player handler
    const [episodeIndex, setEpisodesIndex] = useState(0);

    const handleNextEp = () => {
        setEpisodesIndex(episodeIndex + 1);
    };

    const handlePreviousEp = () => {
        setEpisodesIndex(episodeIndex - 1);
    };

    return (
        <>
        <Navbar />
        <div className="relative">
          <div className="mx-36 pt-12">
            {episodes?.map((item, index) => {
              if (index === selectedEpisode) {
                return (
                  <ReactPlayer
                    key={index}
                    className="w-full h-[500px] mx-auto"
                    url={item.episode_link}
                    width={"100%"}
                    height="550px"
                    light={
                      <div className="">
                        <img
                          className="w-full h-[550px] mx-auto"
                          src={item.thumbnail}
                        />
                      </div>
                    }
                  />
                );
              } else {
                return null;
              }
            })}
          </div>
  
          <div className="bg-black flex flex-col w-full">
            {/* BUTTON ADD EPISODE */}
            <div className="flex justify-end">
              <div className="mt-5 mr-24">
                <label
                  htmlFor="my-modal-4"
                  className="btn bg-red-600 px-8 py-1 text-center text-white rounded"
                >
                  Add Episode
                </label>
              </div>
            </div>
            <AddEpisode idFilm={films?.id} />
  
            <div className="flex justify-between">
              {/* LEFT CARD */}
              <div className="">
                <div className="card card-side py-16 pl-16" key="">
                  <div className="w-[250px]">
                    <img src={films?.thumbnail} />
                  </div>
                  <div className="w-[500px] px-10">
                    <h1 className="text-2xl text-white font-bold mb-2">
                      {films?.title}
                    </h1>
                    <div className="flex gap-6">
                      <p className="content-center pt-1">{films?.year}</p>
                      <p className="content-center rounded border-2 border-white mb-7 px-1">
                        {films?.category.name}
                      </p>
                    </div>
                    <p className="text-sm font-normal text-justify pr-10">
                      {films?.description}
                    </p>
                  </div>
                </div>
              </div>
  
              {/* RIGHT CARD */}
              <div className="">
                <div className="carousel mr-10">
                  {episodes?.map((item, index) => {
                    if (index === episodeIndex) {
                      return (
                        <div key={index} className="carousel-item card bg-black mt-10 h-[50vh]">
                          <div className="flex justify-center items-center">
                            <div>
                              <button className="w-3" onClick={handlePrevEpisode}>
                                <img className="rotate-180" src={ArrowButton} />
                              </button>
                            </div>  
                            <div className="">
                              <img
                                src={item.thumbnail}
                                className="h-[250px] w-[35vw] object-contain px-5"
                                alt="Tailwind CSS Carousel component"
                              />
                            </div>
                            <div>
                              <button className="w-3" onClick={handleNextEpisode}>
                                <img src={ArrowButton} />
                              </button>
                            </div>
                          </div>
                          <div>
                            <p className="pt-1 pl-9">
                              {films.title} : {item.name}
                            </p>
                          </div>
                        </div>
                      );
                    } else {
                      return null;
                    }
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
}
