import { useEffect, useState } from 'react'
import SongBar from './SongBar'
import { useGetSongRelatedQuery } from '../redux/services/shazamCore'
import { useParams } from 'react-router-dom'

const RelatedSongs = ({isPlaying, dataRelated, artistId, activeSong, handlePlayClick, handlePauseClick}) => {
    const {songid} = useParams()

    const {data, isFetching, error} = useGetSongRelatedQuery({songid})
        
    return (
        <div className='flex flex-col '>
            <h1 className='font-bold text-3xl text-white'>Related Songs</h1>

            <div className='mt-6 w-full flex flex-col'>
                {!dataRelated ?
                    data?.data?.[0]?.views?.['top-songs']?.data.map((song, i) => {
                        return (
                            <SongBar
                            activeSong={activeSong}
                            isPlaying={isPlaying} 
                            key={`${song.id}-${artistId}`}
                            song={song}
                            data={data}
                            i={i}
                            handlePlayClick={() => handlePlayClick(song, i)}
                            handlePauseClick={handlePauseClick}/>
                        )   
                        
                    }) : dataRelated?.data?.[0]?.views?.['top-songs']?.data.map((song, i) => {
                        return (
                            <SongBar
                            activeSong={activeSong}
                            isPlaying={isPlaying} 
                            key={`${song.id}-${artistId}`}
                            song={song}
                            data={dataRelated}
                            i={i}
                            handlePlayClick={() => handlePlayClick(song, i)}
                            handlePauseClick={handlePauseClick}/>
                        )   
                    })  
                }

            </div>
        </div>
    )
}

export default RelatedSongs;
