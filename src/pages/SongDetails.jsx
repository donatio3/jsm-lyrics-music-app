import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { setActiveSong, playPause } from "../redux/features/playerSlice";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";

import { useGetSongDetailsQuery} from "../redux/services/shazamCore";
import { useEffect, useRef, useState } from "react";

const SongDetails = () => {
    const {songid} = useParams()
    const dispatch = useDispatch()
    const {activeSong, isPlaying} = useSelector(state => state.player)
    const {data: songData, isFetching: isFetchingSongDetails, isSuccess, error} = useGetSongDetailsQuery({songid})

    const [lyrics, setLyrics] = useState(null);
    const [infoSong, setInfoSond] = useState(null)
    const [artistId, setArtistId] = useState(null)
    const topRef = useRef(null);
    
    useEffect(() => {
        if (isSuccess && songData?.resources?.lyrics) {
            const lyricsKey = Object.keys(songData.resources.lyrics)[0]; // Извлечение динамического ключа
            const lyricsData = songData.resources.lyrics[lyricsKey]?.attributes?.text; // Доступ к массиву по динамическому ключу
            setLyrics(lyricsData);

            if (topRef.current) {
                topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        } 

        if (isSuccess && songData?.resources?.['shazam-songs']) {
            const songKey = Object.keys(songData.resources['shazam-songs'])[0]; // Извлечение динамического ключа
            const infoSongData = songData.resources['shazam-songs'][songKey]?.attributes; // Доступ к массиву по динамическому ключу
            setInfoSond(infoSongData);


            const artistIdKey = Object.keys(songData.resources['artist-highlights'])[0]
            setArtistId(artistIdKey)
        }
    }, [isSuccess, songData]);



    const handlePauseClick = () => {
        dispatch(playPause(false))
    }

    const handlePlayClick = (song, i) => {
        console.log(song, i, songData, 'ALL')
        // dispatch(setActiveSong({song, data: songData, i}))
        // dispatch(playPause(true))
    }


    if (isFetchingSongDetails) {
        return <Loader title='searching song details...' />;
    }

    if (error) {
        if (error.status === 429) {
            return <Error message="Too many requests. Please try again later." />;
        }
        return <Error message="An error occurred. Please try again." />;
    }


    return (
        <div className="flex flex-col" ref={topRef}>
            <DetailsHeader isPlaying={isPlaying}
                activeSong={activeSong}
                handlePause={handlePauseClick}
                handlePlay={handlePlayClick} 
                artistId={artistId} 
                songData={infoSong}
                song={infoSong}
                player={true}
                />

            <div className="pt-[40px] mb-10">
                <h2 className="text-white text-3xl font-bold">Lyrics:</h2>

                <div className="mt-5 ">
                    {lyrics ? (
                        lyrics.map((line, i) => (
                            <p key={i} className="text-gray-400 text-base my-1">{line}</p>
                        ))
                    ) : (
                        <p className="text-gray-400 text-base">Sorry, no lyrics found!</p>
                    )}
                </div>
            </div>

            {/* <RelatedSongs 
                isPlaying={isPlaying}
                activeSong={activeSong}
                artistId={artistId} 
                handlePauseClick={handlePauseClick}
                handlePlayClick={handlePlayClick}/> */}
        </div>
    )


}

export default SongDetails;
