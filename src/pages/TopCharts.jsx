import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import ReactDOM from 'react-dom'
import { createPortal } from 'react-dom';
import { Error, Loader, SongCard, TopPlay } from '../components';

import {useGetTopChartsQuery } from '../redux/services/shazamCore';

const TopCharts = () => {
    const {activeSong, isPlaying} = useSelector(state => state.player)
    const { data, isFetching, error } = useGetTopChartsQuery();
    const topRef = useRef(null);

    useEffect(() => {
        if (data && !isFetching) {
            if (topRef.current) {
                topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }, [data, isFetching]);

    if (isFetching) return <Loader title='Loading top charts'/>

    if (error) return <Error />

   

    return (
        <>
            <div className='flex flex-col' ref={topRef}>
                <h2 className='font-bold text-3xl text-white text-left mt-4 mb-10'>Discover Top charts</h2>

                <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
                    {data?.map((song, i) => (
                        <SongCard
                        activeSong={activeSong}
                        isPlaying={isPlaying}
                        key={song.attributes.id}
                        song={song}
                        data={data}
                        i={i}/>
                    ))}
                </div>
            </div>            
                   
            {ReactDOM.createPortal(<TopPlay/>, document.querySelector('#main'))}

        </>
        
    )
}

export default TopCharts;
