import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const shazamCoreApi = createApi({
    reducerPath: 'shazamCoreApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://shazam-core.p.rapidapi.com',
        prepareHeaders: (headers) => {
            headers.set('x-rapidapi-key', '4ec4dae7eemsh251ee318212f156p1bd855jsn4de2cdb1f9a5')
            return headers
        },
    }),
    endpoints: (builder) => ({
        getTopCharts: builder.query({query: () => '/v1/charts/world?country_code=DZ'}),
        getSongsByGenre: builder.query({query: (genre) => `/v1/charts/genre-world?genre_code=${genre}&country_code=US`}),
        getSongDetails: builder.query({query: ({songid}) => `/v2/tracks/details?track_id=${songid}`}),
        getSongRelated: builder.query({query: ({songid}) => `/v1/tracks/related?offset=0&track_id=${songid}`}),
        getArtistDetails: builder.query({query: (artistid) => `/v2/artists/details?artist_id=${artistid}`}),
        getSongsByCountry: builder.query({query: (countryCode) => `/v1/charts/country?country_code=RU`}),
        getSongsBySearch: builder.query({query: (searchTerm) => `/v1/search/multi?query=${searchTerm}&search_type=SONGS_ARTISTS&offset=0`})
    })
})


export const {
    useGetTopChartsQuery,
    useGetSongDetailsQuery,
    useGetSongRelatedQuery,
    useGetArtistDetailsQuery,
    useGetSongsByCountryQuery,
    useGetSongsByGenreQuery,
    useGetSongsBySearchQuery
} = shazamCoreApi