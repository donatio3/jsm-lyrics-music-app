import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";

const SongCard = ({ song, activeSong, isPlaying, i, data, search }) => {
    const dispatch = useDispatch();

    const handlePauseClick = () => {
        dispatch(playPause(false));
    };

    const handlePlayClick = () => {
        dispatch(setActiveSong({ song, data, i }));
        dispatch(playPause(true));
    };

    const getTrackId = (song) => {
        return song?.attributes?.id || song?.id || song?.key;
    };
    const isActive = getTrackId(activeSong) === getTrackId(song);
    // console.log(song, 'song')
    return (
        <div key={i} className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
            <div className="relative w-full h-56 group">
                <div className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${isActive ? 'flex bg-black bg-opacity-70' : 'hidden'}`}>
                    <PlayPause
                        activeSong={activeSong}
                        search={search ? true : false}
                        isPlaying={isPlaying}
                        song={song}
                        handlePause={handlePauseClick}
                        handlePlay={handlePlayClick}
                        i={i}
                    />
                </div>
                <img src={song?.attributes?.artwork?.url ? song.attributes.artwork.url : song?.images?.coverart} alt="song_img" />
            </div>

            <div className="mt-4 flex flex-col">
                <p className="font-semibold text-lf text-white truncate">
                    <Link to={`/songs/${song?.attributes?.playParams?.id ? song?.attributes?.playParams?.id : song?.hub?.actions[0].id}`}>
                        {song?.attributes?.name ? song.attributes.name : song?.title}
                    </Link>
                </p>
                <p className="text-sm text-gray-300 mt-1 truncate">
                    <Link to={song?.attributes?.artistName ? `/artists/${song?.
relationships?.artists?.
data[0].id}` : `/artists/${song?.artists[0].adamid}`}>
                        {song?.attributes?.artistName ? song?.attributes?.artistName : song?.subtitle}
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SongCard