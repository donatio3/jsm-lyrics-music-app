import { Error, Loader, SongCard, TopPlay } from "../components";
import { genres, links } from "../assets/constants";
import { useDispatch, useSelector } from "react-redux";
import { selectGenreListId } from "../redux/features/playerSlice";
import ReactDOM from "react-dom";
import { createPortal } from "react-dom";
import {useGetSongsByGenreQuery } from "../redux/services/shazamCore";
import { useEffect, useRef, useState } from "react";
  

const Discover = () => {
    const dispatch = useDispatch();
    const { activeSong, isPlaying, genreListId} = useSelector((state) => state.player);
    const { data, isFetching, error } = useGetSongsByGenreQuery(genreListId || 'POP')
    const [cachedData, setCachedData] = useState(null);
    const topRef = useRef(null);

    

    useEffect(() => {
        if (data && !isFetching) {
            setCachedData(data);
            if (topRef.current) {
                topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }, [data, genreListId, isFetching]);

    if (isFetching) return <Loader title="Loading songs..." />;
    if (error) return <Error />;


    return (
        <>
    
            <div className="flex flex-col" ref={topRef}>
                <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
                    <h2 className="font-bold text-3xl text-white text-left">Discover {genreListId || 'POP'}</h2>
                    <select
                        name=""
                        id=""
                        onChange={(e) => dispatch(selectGenreListId(e.target.value))}
                        value={genreListId || 'pop'}
                        className="bg-black text-gray-300 p-3 text-sm  rounded-lg outline-none sm:mt-0 mt-5"
                    >
                        {genres.map((elem) => (
                            <option key={elem.value} value={elem.value}>{elem.title}</option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-wrap sm:justify-start justify-center gap-8">
                    {cachedData?.map((song, i) => (
                        <SongCard
                            activeSong={activeSong}
                            isPlaying={isPlaying}
                            key={song.attributes.id}
                            song={song}
                            data={cachedData}
                            i={i}
                        />
                    ))}
                </div>
            </div>

            {ReactDOM.createPortal(<TopPlay/>, document.querySelector('#main'))}
        </>
    );
};

export default Discover;