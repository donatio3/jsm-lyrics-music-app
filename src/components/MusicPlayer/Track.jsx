import React from 'react';

const Track = ({ isPlaying, isActive, activeSong }) => {
    return (
        <div className="flex-1 flex items-center justify-start">
            <div className={`${isPlaying && isActive ? 'animate-[spin_3s_linear_infinite]' : ''} hidden sm:block h-16 w-16 mr-4`}>
                <img src={activeSong?.attributes?.artwork?.url || activeSong?.images?.coverart} alt="cover art" className="rounded-full" />
            </div>
            <div className="w-[50%]">
                <p className="truncate text-white font-bold text-lg">
                    {activeSong?.attributes?.name ? activeSong.attributes.name : activeSong?.title}
                </p>
            <p className="truncate text-gray-300">
                {activeSong?.attributes?.artistName ? activeSong.attributes.artistName : activeSong?.subtitle}
            </p>
            </div>
        </div>
    )
}


export default Track;
