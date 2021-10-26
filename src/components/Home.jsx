import Nav from "./NavBar"
import {AiFillPlayCircle} from "react-icons/ai"
import {IconContext} from "react-icons"
import Carousel from 'react-elastic-carousel'
import {Link} from "react-router-dom";


export default function Home(props) {
    let randomNumber = Math.floor(Math.random() * 20)
    function RandomMovie() {
        const movie = props.movies[randomNumber]
        return (
            <div className="images">
                <Link to={movie && "/detail/" + movie.id}>
                    <img src={movie && "https://image.tmdb.org/t/p/w500" + movie.backdrop_path}
                         alt={movie && movie.id}/>
                </Link>
                <Link className="link" to={movie && "/detail/" + movie.id}>
                    <div className="spotlight">
                        <IconContext.Provider value={{size: '7vw'}}>
                            <AiFillPlayCircle />
                        </IconContext.Provider>
                        <div>
                            <p>Movie Spotlight</p>
                            <h3>{movie && movie.title}</h3>
                        </div>
                    </div>
                </Link>
            </div>
        )
    }
    console.log(randomNumber)
    function Slider() {
        const dataMovies = props.movies
        return  dataMovies.filter( movie => movie.id !== dataMovies[randomNumber].id).map(movie => {
            return (
                <Link key={movie.id} to={movie && "/detail/" + movie.id}>
                    <img src={"https://image.tmdb.org/t/p/w400" + movie.poster_path} alt={movie.title}/>
                </Link>
            )
        })
    }

    return (
        <div>
            <Nav/>
            <h1 className='title'><span>Movie</span>Browser</h1>
            <RandomMovie />
            <h2 className='title'>Trending</h2>
            <div className="slider">
                <Carousel
                    preventDefaultTouchmoveEvent={true}
                    children={Slider()}
                    pagination={false}
                    showArrows={false}
                    enableAutoPlay={true}
                    autoPlaySpeed={3000}
                />
            </div>
        </div>
    )
}