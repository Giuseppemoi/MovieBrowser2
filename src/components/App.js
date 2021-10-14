import React, {useEffect, useState} from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route, Redirect
} from "react-router-dom";

import Nav from "./NavBar";
import Home from './Home'
import Detail from './Detail'
import Discover from './Discover'
import axios from "axios";


export default function App() {
    const API_KEY = 'api_key=61330235259d30ec7f0c37b884800e04'
    const BASE_URL = 'https://api.themoviedb.org/3/'
    const PARAMS = '&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=1&with_watch_monetization_types=flatrate'
    const URL_Trending = 'trending/movie/day?'
    const API_URL = BASE_URL + URL_Trending + API_KEY + PARAMS

    const [movies, setMovies] = useState([])

    async function moviesPromise() {
        return await axios.get(API_URL)
    }

    useEffect(() => {
        async function fetchMovie() {
            const data = await moviesPromise()
            setMovies(data.data.results)
        }
        fetchMovie()
    }, [])

    return (
        <Router>
            <div>
                <Nav/>
                <Switch>
                    <Route path="/detail">
                        <Detail />
                    </Route>
                    <Route path="/discover">
                        <Discover />
                    </Route>
                    <Route path="/home">
                        <Home movies={movies} />
                    </Route>
                    <Route path="/">
                        <Redirect to="/home" />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}