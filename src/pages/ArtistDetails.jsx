import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import debounce from 'lodash.debounce';
import Testi from "./Testi";
import { setActiveSong, playPause } from "../redux/features/playerSlice";
import { useGetArtistDetailsQuery } from "../redux/services/shazamCore";
import { useEffect, useState, useRef } from "react";

const ArtistDetails = () => {
    const {id: artistId} = useParams()
    const dispatch = useDispatch()
    const {activeSong, isPlaying} = useSelector(state => state.player)
    const {data: artistData, isFetching: isFetchingArtistDetails, isSuccess, error} = useGetArtistDetailsQuery(artistId)
    const topRef = useRef(null)

    useEffect(() => {
        if (artistData && !isFetchingArtistDetails) {
            if (topRef.current) {
                topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }, [artistData, isFetchingArtistDetails]);

    if (isFetchingArtistDetails) {
        return <Loader title='Loading artist details...' />;
    }

    if (error) {
        if (error.status === 429) {
            return <Error message="Too many requests. Please try again later." />;
        }
        return <Error message="An error occurred. Please try again." />;
    }

    const handlePauseClick = () => {
        dispatch(playPause(false))
    }

    const handlePlayClick = (song, i) => {
        dispatch(setActiveSong({song, data: artistData, i}))
        dispatch(playPause(true))
    }

    return (
         <div className="flex flex-col" ref={topRef}>
            
            <DetailsHeader artistId={artistId} artistData={(Object.values(artistData))[0][0]}/>

            <RelatedSongs 
            dataRelated={artistData}
            artistId={artistId}
            isPlaying={isPlaying}
            activeSong={activeSong}
            handlePauseClick={handlePauseClick}
            handlePlayClick={(song, i) => handlePlayClick(song, i)}/>
        </div> 
    )


}

export default ArtistDetails;
