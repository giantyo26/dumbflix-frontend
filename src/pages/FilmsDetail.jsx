import { useParams } from "react-router-dom";
import ReactPlayer from "react-player/youtube";
import { useState, useEffect } from "react";
import { useQuery, useMutation } from "react-query";
import { API } from "../config/api";
import { useContext } from "react";
import AddEpisode from "../components/AddEpisode";
import EditEpisode from "../components/EditEpisode";
import { UserContext } from "../context/UserContext";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

export default function FilmsDetail() {
  const { id } = useParams();
  const [state] = useContext(UserContext);
  const [selectedEpisode, setSelectedEpisode] = useState(0);
  const [idDelete, setIdDelete] = useState(null);

  function handleDeleteEp(idEpisode) {
    setIdDelete(idEpisode);
  }
  // execute the deleteById function whenever the value of idDelete changes
  useEffect(() => {
    async function deleteById(idEpisode) {
      try {
        await API.delete(`/episodes/${idEpisode}`);
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }

    if (idDelete) {
      deleteById(idDelete);
    }
  }, [idDelete]);

  const handleNextEp = () => {
    if (selectedEpisode < episodes.length - 1) {
      setSelectedEpisode(selectedEpisode + 1);
    }
  };

  const handlePreviousEp = () => {
    if (selectedEpisode > 0) {
      setSelectedEpisode(selectedEpisode - 1);
    }
  };

  let { data: films } = useQuery("filmsDetailCache", async () => {
    const response = await API.get(`films/${id}`, id);
    return response.data.data;
  });

  let { data: episodes } = useQuery("episodesDetailCache", async () => {
    const response = await API.get(`films/${id}/episodes`, id);
    return response.data.data;
  });

  return (
    <div>
      <>
        <div className="wrapper">
          <div className="">
            {episodes?.map((item, index) => {
              if (index === selectedEpisode) {
                return (
                  <ReactPlayer
                    key={index}
                    className="w-full mx-auto"
                    url={item?.episode_link}
                    width={"50%"}
                    style={{ aspectRatio: "3/4" }}
                    light={
                      <div className="">
                        <img
                          className="w-[600px] h-[360px] object-cover mx-auto"
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

          {/* LEFT CARD */}
          <div className="detail-page bg-black flex ">
            <div className="w-full">
              <div className="flex justify-end">
                { state.user.role === "admin" && (
                <div className="">
                  <label
                    htmlFor="my-modal-3"
                    className="btn bg-red-600 px-8 py-1 text-center text-white rounded mt-5 mr-20 mb-0"
                  >
                    Add Episode
                  </label>
                </div>)}
                <AddEpisode idFilm={films?.id} />
              </div>
              <div className="flex justify-between">
                <div className="card card-side py-16 pt-0 pl-16" key="">
                  <div className="w-[250px]">
                    <img src={films?.thumbnail} className="w-[300px]" />
                  </div>
                  <div className="w-[500px] px-10">
                    <h1 className="text-3xl text-white font-bold mb-1">
                      {films?.title}
                    </h1>
                    <div className="flex gap-6">
                      <p className="content-center text-xl pt-1">
                        {films?.year}
                      </p>
                      <p className="content-center rounded border-2 text-lg border-white mb-5 px-2">
                        {films?.category.name}
                      </p>
                    </div>
                    <p className="text-lg font-normal text-justify pr-10">
                      {films?.description}
                    </p>
                  </div>
                </div>

                <div className="carousel ">
                  {episodes?.map((item, index) => {
                    if (index === selectedEpisode) {
                      return (
                        <div
                          className="carousel-item card bg-black mt-10 h-[50vh]"
                          key={index}
                        >
                          <div className="flex justify-center items-center">
                            <div
                              key={index}
                              id={`slide${index}`}
                              className={`carousel-item w-[550px] relative`}
                            >
                              <img
                                src={item.thumbnail}
                                className="w-[500px] h-[16em] rounded-md"
                              />
                              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-14 top-1/2">
                                {index > 0 && (
                                  <a
                                    onClick={() => handlePreviousEp()}
                                    href={`#slide${index - 1}`}
                                    className="btn btn-circle text-darkRed"
                                  >
                                    ❮
                                  </a>
                                )}
                                {index < episodes?.length - 1 && (
                                  <a
                                    onClick={() => handleNextEp()}
                                    href={`#slide${index + 1}`}
                                    className="btn btn-circle text-darkRed"
                                  >
                                    ❯
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>
                          <div>
                            <p className="pt-1 pr-8">
                              {films?.title} : {item.title}
                            </p>
                          </div>
                          {state.user.role === "admin" && (
                            <div className="Update Delete">
                              <label
                                htmlFor="my-modal-1"
                                className="btn bg-green-600 px-5 py-1 text-center text-white mt-5 mr-5 mb-0"
                              >
                                <MdEdit className="text-xl" />
                              </label>
                              <label
                                className="btn bg-gray-600 px-5 py-1 text-center text-white mt-5 mb-0"
                                onClick={() => handleDeleteEp(item.id)}
                              >
                                <MdDelete className="text-xl" />
                              </label>
                            </div>
                          )}
                          <EditEpisode idFilm={films?.id} idEpisode={item.id} />
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
    </div>
  );
}
