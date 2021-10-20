import {FcPrevious} from "react-icons/fc";
import {HiPlay} from "react-icons/hi";
import {IconContext} from "react-icons";
import {useEffect, useState} from "react";
import axios from "axios";
import {AiFillStar} from "react-icons/ai";
import {Link, useParams} from "react-router-dom";

export default function Detail() {
    const { id } = useParams()
    const API_KEY = 'api_key=61330235259d30ec7f0c37b884800e04'
    const BASE_URL = 'https://api.themoviedb.org/3/'
    const PARAMS = '&language=en-US&page=1'

    const [movieId, setMovieId] = useState(id)
    const [movie, setMovie] = useState([])
    const [movieRelated, setMovieRelated] = useState([])

    const URL_Movie = `movie/${movieId}?`
    const URL_Related = `movie/${movieId}/similar?`

    async function moviesDataPromise(url) {
        return await axios.get(BASE_URL + url + API_KEY + PARAMS)
    }

    async function fetchMovie() {
        const moviesData = await moviesDataPromise(URL_Movie)
        await setMovie(moviesData.data)
        const moviesRelatedData = await moviesDataPromise(URL_Related)
        await setMovieRelated(moviesRelatedData.data.results)
    }

    useEffect(async () => {
        await fetchMovie().then()
    }, [])

    function DisplayGenres() {
        const genres = movie.genres
        if (movie.length !== 0) {
            return(
                genres.map(genre => {
                    return <p key={genre.id}>{genre.name}</p>
                })
            )
        } else return <div>Loading</div>
    }

    function DisplayRelated() {
        return (
            movieRelated.map(movie => {
                return (
                    <div className="movieRelated" key={movie.id}>
                        <Link className="link" to={movie && "/detail/" + movie.id}>
                            <div className="divSize">
                                <img src={"https://image.tmdb.org/t/p/w400" + movie.poster_path} alt={movie.title}/>
                            </div>
                            <p>{movie.title} <span>({movie.release_date && movie.release_date.split('-')[0]})</span></p>
                        </Link>
                    </div>
                )
            })
        )
    }

    return (
        <div className="detailContainer">
            <div className="top">
                <img src={"https://image.tmdb.org/t/p/w400" + movie.poster_path} alt={movie.title}/>
                <IconContext.Provider value={{size: "10vw"}}>
                    <FcPrevious/>
                </IconContext.Provider>
                <IconContext.Provider value={{size: "10vw"}}>
                    <HiPlay/>
                </IconContext.Provider>
            </div>
            <div className="title">
                <p>{movie.title}</p>
                <p>{movie.runtime} minutes</p>
                <p>
                    <IconContext.Provider value={{size: "5vw"}}>
                        <AiFillStar/>
                    </IconContext.Provider>
                    {movie.vote_average} (IMDb)
                </p>
            </div>
            <hr/>
            <div>
                <div>
                    <p>Release date</p>
                    <p>{movie.release_date}</p>
                </div>
                <div>
                    <p>genre</p>
                    <DisplayGenres/>
                </div>
            </div>
            <div>
                <p>Synopsis</p>
                <p>{movie.overview}</p>
            </div>
            <div>
                <p>Related Movies</p>
                <DisplayRelated/>
            </div>
        </div>
    )
}
