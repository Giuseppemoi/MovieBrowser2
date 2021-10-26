import Nav from "./NavBar"
import {BiSearch} from "react-icons/bi"
import {IconContext} from "react-icons"
import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

export default function Discover(props) {
    const genresArrays = props.genres

    const API_KEY = 'api_key=61330235259d30ec7f0c37b884800e04'
    const BASE_URL = 'https://api.themoviedb.org/3/'
    const URL_Discover = 'discover/movie?'

    const [genreId, setGenreId] = useState(28)
    const [page, setPage] = useState(1)
    const [isFetching, setIsFetching] = useState(false)

    const PARAMS = `&language=en-US&sort_by=popularity.desc&page=${page}&with_genres=`

    async function moviesDataByGenrePromise(id) {
        return await axios.get(BASE_URL + URL_Discover + API_KEY + PARAMS + id)
    }

    const [listMoviesGenre, setListMoviesGenre] = useState([])

    async function fetchMovie() {
        const moviesData = await moviesDataByGenrePromise(genreId)
        // setListMoviesGenre(prevState => [...prevState, ...moviesData.data.results])
        setPage(page + 1)
        setIsFetching(false)
        return moviesData.data.results
    }

    const onScroll = () => {
        if(window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight){
            return;
        }
        setIsFetching(true)
        // setPage(page + 1)
    }

    useEffect(() => {
        setListMoviesGenre([])
        setPage(1)
        console.log(page)
        fetchMovie().then((result) => setListMoviesGenre(result))
        // setIsFetching(true)
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, [genreId])

    useEffect(() => {
        if (isFetching) {
            fetchMovie().then((result) => setListMoviesGenre(prevState => [...prevState, ...result]))
        }
    }, [isFetching]);

    function MoviesGenres() {
        return (
            listMoviesGenre.map(movie => {
                return (
                    <div className="movieGenre" key={movie.id}>
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

    function NavGenres() {
        function changeGenre(e) {
            // e.preventDefault()
            setGenreId(e.target.id)
            setPage(1)
            e.target.classList.add('color')
        }

        return (
            genresArrays.map(genre => {
                return (
                    // <input onClick={(e) => changeGenre(e)} id={genre.id} type="button" value={genre.name}/>
                    // <a onClick={(e) => changeGenre(e)} id={genre.id} >{genre.name}</a>
                    <p onClick={(e) => changeGenre(e)} id={genre.id} key={genre.id} >{genre.name}</p>
                )
            })
        )
    }

    return (
        <div>
            <Nav/>
            <h1 className='title'><span>Movie</span>Browser</h1>
            <div className='input'>
                <input placeholder={'Sherlock Holms'} />
                <IconContext.Provider value={{size: '3vh'}}>
                    <BiSearch />
                </IconContext.Provider>
            </div>
            <nav className='navGenres'>
                <NavGenres/>
            </nav>
            <div className='moviesGenre'>
                <MoviesGenres/>
            </div>
        </div>
    )
}