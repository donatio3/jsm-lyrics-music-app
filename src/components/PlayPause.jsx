import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa';

const PlayPause = ({ isPlaying, activeSong, song, handlePause, handlePlay, size, search, right }) => {
    const getTrackId = (track) => {
        return track?.attributes?.id || track?.id || track?.key;
    };

    const isActive = getTrackId(activeSong) === getTrackId(song);

    if (search) {
        if (isPlaying && isActive) {
            return <FaPauseCircle size={size || 35} className={`text-gray-300 ${right ? 'right-[70px] absolute' : ''}`} onClick={handlePause} />;
        } else {
            return <FaPlayCircle size={size || 35} className={`text-gray-300 ${right ? 'right-[70px] absolute' : ''}`} onClick={handlePlay} />;
        }
    } else {
        if (isPlaying && isActive) {
            return <FaPauseCircle size={size || 35} className={`text-gray-300 ${right ? 'right-[70px] absolute' : ''}`} onClick={handlePause} />;
        } else {
            return <FaPlayCircle size={size || 35} className={`text-gray-300 ${right ? 'right-[70px] absolute' : ''}`} onClick={handlePlay} />;
        }
    }
};

export default PlayPause;