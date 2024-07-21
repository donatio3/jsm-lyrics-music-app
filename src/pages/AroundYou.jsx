import React from 'react';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import ReactDOM from "react-dom";
import { createPortal } from "react-dom";
import { Error, Loader, SongCard, TopPlay } from '../components';
import { useGetSongsByCountryQuery } from '../redux/services/shazamCore';

const AroundYou = () => {
    const [country, setCountry] = useState('')
    const [loading, setLoading] = useState(true)
    const {activeSong, isPlaying} = useSelector(state => state.player)
    const { data, isFetching, error } = useGetSongsByCountryQuery(country, { skip: !country });
    const topRef = useRef(null);

    useEffect(() => {
        var config = {
            method: 'get',
            url: 'https://api.geoapify.com/v1/geocode/search?text=RUSSIA%2C%20MOSCOW&format=json&apiKey=db0d85a9097048558cbb7aaf4c27a38a',
            headers: {}
        };
        
        axios(config)
        .then(function (response) {
            console.log(response?.data?.results[0]['country_code'], 'ip');
            setCountry(response?.data?.results[0]['country_code'])
        })
        .catch(function (error) {
            console.log(error);
        })
        .finally(() => setLoading(false))

        if (isFetching && data) {
            if (topRef.current) {
                topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }, [country])   



    if (isFetching && loading) return <Loader title='Loading song around you'/>

    if (error && country) return <Error />

   

    return (
        <>
        <div className='flex flex-col' ref={topRef}>
            <h2 className='font-bold text-3xl text-white text-left mt-4 mb-10'>Around you <span className='font-black'>({country})</span></h2>

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

export default AroundYou;
