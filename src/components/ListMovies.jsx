import { useQuery, gql, useLazyQuery } from '@apollo/client';
import { useState } from 'react';
const ListMovies = () => {
    const GET_MOVIES = gql`
    query Movies {
        movies {
          id
          isInTheaters
          name
          yearOfPublication
        }
    }
    `;

    const GET_MOVIE_BY_NAME = gql`
    query Query($name: String!) {
        movie(name: $name) {
          id
          isInTheaters
          name
          yearOfPublication
        }
      }
    `;
    const [movieName, setMovieName] = useState("");
    const { loading, error, data } = useQuery(GET_MOVIES);
    const [fetchMovie, { data: movieData, error: movieError }] = useLazyQuery(GET_MOVIE_BY_NAME);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;
    if (movieError) {
        console.log(movieError);
    }
    return (
        <div>
            <div>
                <input type="text" placeholder='Search Movie' onChange={(e) => setMovieName(e.target.value)} />
                <button onClick={() => fetchMovie({
                    variables: {
                        name: movieName
                    }
                })}>Search</button>
            </div>
            <div>
                <h3>
                    Searched Movies
                </h3>
                {movieError && <h5>Some Issue In Search</h5>}
                {
                    movieData && movieData.movie &&
                    <>
                        <h3>Name: {movieData.movie.name}</h3>
                        <p>Released On: {movieData.movie.yearOfPublication}</p>
                        <p>In Theatres :{movieData.movie.isInTheaters}</p>
                    </>
                }
            </div>

            <h1>All Movies</h1>
            {data.movies.map((movie) => (
                <div key={movie.id}>
                    <h3>Name: {movie.name}</h3>
                    <p>Released On: {movie.yearOfPublication}</p>
                    <p>In Theatres :{movie.isInTheaters}</p>
                    <br />
                </div>
            ))}
        </div>
    )
}

export default ListMovies
