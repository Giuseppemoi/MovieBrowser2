import Nav from "./NavBar"
import {BiSearch} from "react-icons/bi"
import {IconContext} from "react-icons"
import {useEffect, useState} from "react";
import axios from "axios";

export default function Discover(props) {
    const genresArrays = props.genres

    const API_KEY = 'api_key=61330235259d30ec7f0c37b884800e04'
    const BASE_URL = 'https://api.themoviedb.org/3/'
    const URL_Discover = 'discover/movie?'

    const [genreId, setGenreId] = useState(28)
    const [page, setPage] = useState(1)

    const PARAMS = `&language=en-US&sort_by=popularity.desc&page=${page}&with_genres=`

    async function moviesDataByGenrePromise(id) {
        return await axios.get(BASE_URL + URL_Discover + API_KEY + PARAMS + id)
    }

    const [listMoviesGenre, setListMoviesGenre] = useState([])

    async function fetchMovie() {
        const moviesData = await moviesDataByGenrePromise(genreId)
        setListMoviesGenre(moviesData.data.results)
    }

    useEffect(() => {
        fetchMovie()
    }, [genreId])

    useEffect(() => {
        document.addEventListener('scroll', (e) => {
            console.log(e.path)
            if ((e.path[1].innerHeight + e.path[1].scrollY) >= e.path[0].body.offsetHeight) {
                setPage(page + 1)
                moviesDataByGenrePromise(genreId).then((result) => {
                    // setListMoviesGenre([...listMoviesGenre, ...result.data.results])
                    const newData = result.data.results
                    setListMoviesGenre(listMoviesGenre.concat(newData))
                })
            }
        })
    }, [listMoviesGenre])

    function MoviesGenres() {
        return (
            listMoviesGenre.map(movie => {
                return (
                    <div className="movieGenre">
                        <div className="divSize">
                            <img src={"https://image.tmdb.org/t/p/w400" + movie.poster_path} alt={movie.title}/>
                        </div>
                        <p>{movie.title} <span>({movie.release_date.split('-')[0]})</span></p>
                    </div>
                )
            })
        )
    }

    // const [tagStyle, setTagStyle] = useState(null)

    function changeGenre(e) {
        e.preventDefault()
        setGenreId(e.target.id)
        e.target.style.color = '#FF8F71'
        e.target.style.textDecoration = 'underline'
        // setTagStyle((prev) => prev = document.getElementById(e.target.id).style)
        // setTagStyle((prev) => prev.color = '#FF8F71')
        // setTagStyle(tagStyle.textDecoration = 'underline')
        // console.log(tagStyle)
        // tagStyle.color = '#FF8F71'
        // tagStyle.textDecoration = 'underline'
    }

    function NavGenres() {
        return (
            genresArrays.map(genre => {
                return (
                    // <input onClick={(e) => changeGenre(e)} id={genre.id} type="button" value={genre.name}/>
                    // <a onClick={(e) => changeGenre(e)} id={genre.id} >{genre.name}</a>
                    <p onClick={(e) => changeGenre(e)} id={genre.id} >{genre.name}</p>
                )
            })
        )
    }
    return (
        <div>
            <Nav/>
            <h1 className='title'><span>Movie</span>Browser</h1>
            <div className='input'>
                <input />
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