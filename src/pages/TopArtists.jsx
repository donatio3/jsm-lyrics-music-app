import React, { useRef, useEffect } from 'react';
import { Error, ArtistCard, Loader, TopPlay } from '../components';
import {useGetTopChartsQuery } from '../redux/services/shazamCore';
import ReactDOM from "react-dom";
import { createPortal } from "react-dom";



const TopArtists = () => {
    const { data, isFetching, error } = useGetTopChartsQuery();
    const topRef = useRef(null);

    useEffect(() => {
        if (!isFetching && data) {
            if (topRef.current) {
                topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }, [data, isFetching]);

    if (isFetching) return <Loader title='Loading top artists' />;
    if (error) return <Error />;

    return (
        <>
            <div className='flex flex-col' ref={topRef}>
                <h2 className='font-bold text-3xl text-white text-left mt-4 mb-10'>Top artists</h2>
                <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
                    {data?.map((track, i) => (
                        <ArtistCard
                            key={track.id}
                            track={track}
                            data={data}
                            i={i}
                        />
                    ))}
                </div>
            </div>
            {ReactDOM.createPortal(<TopPlay />, document.querySelector('#main'))}
        </>
    );
};

export default TopArtists;
