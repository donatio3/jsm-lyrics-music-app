import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import { Link } from "react-router-dom";

import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";

import 'swiper/css'
import 'swiper/css/free-mode'
import Loader from "./Loader";
import Error from "./Error";

const TopChartCard = ({song, i, activeSong, isPlaying, handlePlay, handlePause}) => (
    <div className="w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2">
        <h3 className="fot-bold text-base text-white mr-3">{i + 1}</h3>

        <div className="flex-1 flex flex-row justify-between items-center relative">
            <img className="w-20 h-20 rounded-lg" src={song?.attributes?.artwork?.url} alt={song?.name} />
            
            <div className="flex-1 flex flex-col justify-center mx-3" 
            >
                <Link to={`/songs/${song?.attributes?.playParams?.id}`}>
                    <p className="text-xl font-bold text-white">
                        {song?.attributes?.name}
                    </p>
                </Link>

                <Link to={`/artists/${song?.relationships?.artists?.data[0].id}`}>
                    <p className="text-ase font-bold text-gray-300 mt-1">
                        {song?.attributes?.artistName}
                    </p>
                </Link>
            </div>

            <div className="right-0">
                <PlayPause
                    size={30}
                    activeSong={activeSong}
                    isPlaying={isPlaying}
                    song={song}
                    handlePause={handlePause}
                    handlePlay={() => handlePlay(song, i)}
                    i={i}/>
            </div>

        </div>
    </div>
)


const TopPlay = () => {
    const dispatch = useDispatch();
    const { activeSong, currentSongs, isPlaying } = useSelector((state) => state.player);
    const { data, isFetching, error} = useGetTopChartsQuery();
    const topRef = useRef(null);
    const [cachedData, setCachedData] = useState(null);

    useEffect(() => {
        if (data && !isFetching) {
            setCachedData(data);
            if (topRef.current) {
                topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }, [data, isFetching]);


    const handlePauseClick = () => {
        dispatch(playPause(false));
    };

    const handlePlayClick = (song, i) => {
        dispatch(setActiveSong({ song, data: cachedData, i }));
        dispatch(playPause(true));
    };

    if (isFetching && !cachedData) return <Loader title="Loading songs..." />;
    if (error) return <Error />;

    return (
            <div className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col" ref={topRef}>            
            <div className="w-full flex flex-col">
                <div className="flex flex-row justify-between items-center xl:pt-[4.5rem]">
                    <h2 className="text-white font-bold text-2xl">Top Charts</h2>
                    <Link to='/top-charts'>
                        <p className="text-gray-300 text-base cursor-pointer">See more</p>
                    </Link>
                </div>

                <div className="mt-4 flex flex-col gap-1">
                    {cachedData?.slice(0, 5).map((song, i) => (
                        <TopChartCard
                            song={song}
                            key={song.attributes.id}
                            i={i}
                            isPlaying={isPlaying}
                            activeSong={activeSong}
                            handlePlay={handlePlayClick}
                            handlePause={handlePauseClick}
                        />
                    ))}
                </div>
            </div>

            <div className="w-full flex flex-col mt-8">
                <div className="flex flex-row justify-between items-center">
                    <h2 className="text-white font-bold text-2xl">Top Artists</h2>
                    <Link to='/top-artists'>
                        <p className="text-gray-300 text-base cursor-pointer">See more</p>
                    </Link>
                </div>

                <Swiper
                    slidesPerView='auto'
                    spaceBetween={15}
                    freeMode
                    centeredSlides
                    centeredSlidesBounds
                    modules={[FreeMode]}
                    className="mt-4"
                >
                    {cachedData?.slice(0, 5).map((song, i) => (
                        <SwiperSlide
                            key={song?.attributes?.playParams?.id}
                            style={{ width: '25%', height: 'auto' }}
                            className="shadow-lg rounded-full animate-slideright"
                        >
                            <Link to={`/artists/${song?.relationships?.artists?.data[0].id}`}>
                                <img src={song?.attributes?.artwork?.url} alt="name" className="rounded-full w-full object-cover" />
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default TopPlay;