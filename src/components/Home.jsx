export default function Home(props) {

    function RandomMovie() {
        const dataMovie = props.movies[Math.floor(Math.random() * 20)]
        return (
            <div className="images">
                <img src={dataMovie && "https://image.tmdb.org/t/p/w300" + dataMovie.poster_path}
                     alt={dataMovie && dataMovie.title}/>
            </div>
        )
    }

    return (
        <div>
            <h1 className='title'><span>Movie</span>Browser</h1>
            {RandomMovie()}
            <h2 className='title'>Trending</h2>
            <div>carousel</div>
        </div>
    )
}