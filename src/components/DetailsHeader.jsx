import { Link } from "react-router-dom";
import PlayPause from "./PlayPause";

const DetailsHeader = ({artistId, artistData, songData, activeSong, isPlaying, song, handlePlay, handlePause, i, player}) => {
    const artist = artistData?.attributes
    return (
        <div className="relative w-full flex flex-col">
            <div className="w-full bg-gradient-to-l from transparent to-black sm:h-48 h28 mb-10 mt-10"/>

                <div className="absolute inset-0 pl-2 flex items-center">

                    <div className="flex items-center">
                        <img src={songData ? songData?.artwork?.url.replace('{w}', '500').replace('{h}', '500') : artist?.artwork?.url} 
                        alt="art" className="sm:w-40 w-20 sm:h-40 h-20 rounded-full object-cover border-2 shadow-xl shadow-black"/>
                    
                        <div className="ml-5">
                            <p className="font-bold sm:text-3xl text-xl text-white">
                                {songData?.title ? songData?.title : artist?.name}
                            </p>
                            {artistId && (
                                <Link to={`/artists/${artistId}`}>
                                    <p className="text-base text-gray-400 mt-2">
                                        {songData?.artist ? songData?.artist : artist.origin }
                                    </p>
                                </Link>
                            )}
                            
                            <p className="text-base text-gray-400 mt-2">
                                {songData?.genres?.primary}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
    )
    
}

export default DetailsHeader;
